import { PlanFromDb } from "@/app/components/Types/PlanFromDb";
import CryptoJS from 'crypto-js';
import { OrderedeSIM } from "@/app/components/Types/TOrderedEsim";
import { NextResponse } from "next/server";

type MicroeSIMPackage = {
    channel_dataplan_id: string;
    channel_dataplan_name: string;
    price: string;
    currency: string;
    status: string;
    day: number;
    data: string;
    apn: string;
    code: string;
    networks: string;
}

type Result = {
    qrcode : string,
    activationCode : string,
    iosInstallLink: string
}


const testUrl: string = 'https://microesim.club'
const productionUrl: string = 'https://microesim.top'
const testAccount: string = 'test_account_9999'
//if statements to validate these env variables
let productionAccount: string;
let productionSecret: string;
let productionSalt: string;
if (process.env.MICROESIM_PRODUCTION_ACCOUNT === undefined || process.env.MICROESIM_PRODUCTION_ACCOUNT === undefined || process.env.MICROESIM_SECRET === undefined || process.env.MICROESIM_SALT === undefined) {
}
else {
    productionAccount = process.env.MICROESIM_PRODUCTION_ACCOUNT as string;
    productionSecret = process.env.MICROESIM_SECRET as string;
    productionSalt = process.env.MICROESIM_SALT as string;
}

const testSecret: string = '7119968f9ff07654ga485487822g'
const testSalt: string = 'c38ab89bd01537b3915848d689090e56'

export async function orderFromMicroesim(planData: PlanFromDb[]): Promise<OrderedeSIM[]> {
    try {
        const requestedPlans = await getDataPlans();
        const orderedPlansTopupIds = await purchasePlans(planData, requestedPlans);
        console.log('Ordered plan topup IDs:', orderedPlansTopupIds);

        const orderedEsims: OrderedeSIM[] = [];

        for (const topupId of orderedPlansTopupIds) {
            try {
                const topupDetails = await getTopupDetailsWithRetry(topupId);
                console.log('Topup details for ID', topupId, ':', topupDetails);
                
                // Extract relevant information from channel_dataplan_name
                const [country, planInfo] = topupDetails.result.channel_dataplan_name.split('-');
                const dataAmount = planInfo.includes('Daily1GB') ? 'unlimited' : planInfo.match(/\d+/)[0];
                const duration = topupDetails.result.channel_dataplan_name.split('-')[2];

                const correspondingPlan = planData.find(plan => 
                    plan.data === dataAmount &&
                    plan.duracion === duration
                );

                if (correspondingPlan) {
                    const orderedEsimArray = createOrderedEsim(topupDetails, correspondingPlan);
                    orderedEsims.push(...orderedEsimArray);
                } else {
                    console.error('Could not find corresponding plan for topup ID:', topupId);
                }
            } catch (error) {
                console.error('Error processing topup ID:', topupId, error);
            }
        }

        console.log('Final ordered eSIMs:', orderedEsims);
        return orderedEsims;
    } catch (error) {
        console.error('Error in orderFromMicroesim:', error);
        throw error;
    }
}

function generateNonce(headerType: string) {
    const nonce = CryptoJS.lib.WordArray.random(10).toString(CryptoJS.enc.Hex);
    const timestamp = new Date().getTime().toString();
    const salt = CryptoJS.enc.Hex.parse(productionSalt);
    const iterations = 1024;
    const keyLength = 256 / 32;

    let hashPassword = CryptoJS.PBKDF2(productionSecret, salt, { keySize: keyLength, iterations: iterations, hasher: CryptoJS.algo.SHA256 }).toString(CryptoJS.enc.Hex);
    const dataToHash = productionAccount + nonce + timestamp;
    const signature = CryptoJS.HmacSHA256(dataToHash, hashPassword).toString(CryptoJS.enc.Hex);
    const requestHeaders = {
        'Content-Type': headerType,
        'MICROESIM-ACCOUNT': productionAccount,
        'MICROESIM-NONCE': nonce,                     //random nonce string of 6-32 digits
        'MICROESIM-TIMESTAMP': timestamp,               //timestamp, seconds 13 digits long
        'MICROESIM-SIGN': signature                //A signature generated using HMAC-SHA256 with the hashed password derived from the original secret and salt. 
    }                                       //Signature content: microesim-account, microesim-nonce, micro-esim-timestamp

    return requestHeaders;
}

async function getDataPlans() {
    const nonce = generateNonce('application/json');
    const response = await fetch(productionUrl + '/microesim/v1/esimDataplanList', {
        method: 'GET',
        headers: nonce
    })
    if (!response) {
        console.log('Failed to fetch plans')
    }
    const allPlans = await response.json();
    return allPlans;
}

async function purchasePlans(planData: PlanFromDb[], allPlans: any) {
    const orderPromises = planData.map(async (plan) => {
        let planId = findDataplanIdForIndividualPlan(plan, allPlans.result);
        let planQuantity = plan.quantity.toString();
        if (planId && planQuantity) {
            const nonce = generateNonce('application/x-www-form-urlencoded');
            const orderedPlanDetails = await fetch(productionUrl + '/microesim/v1/esimSubscribe', {
                method: 'POST',
                headers: nonce,
                body: new URLSearchParams({
                    number: planQuantity,
                    channel_dataplan_id: planId
                }).toString()
            });
            if (!orderedPlanDetails.ok) {
                console.error('Failed to order plan');
                return null;
            } else {
                const planDetails = await orderedPlanDetails.json();
                console.log('Plan details:', planDetails);
                return planDetails.result.topup_id;
            }
        }
        return null;
    });

    const results = await Promise.all(orderPromises);
    return results.filter((id): id is string => id !== null);
}

function findDataplanIdForIndividualPlan(planData: PlanFromDb, allPlans: any[]) {

    let allPlansForRegion: MicroeSIMPackage[] = [];

    if (planData.isocode.toUpperCase() === 'NA'){
        console.log('Filtering for NA plans');
        allPlansForRegion = allPlans.filter((plan: MicroeSIMPackage) => 
            (plan.code.includes('MX') && plan.code.includes('CA'))
        );
    }
    else if (planData.isocode.toUpperCase() === 'AS'){
        console.log('Filtering for AS plans');
        allPlansForRegion = allPlans.filter((plan: MicroeSIMPackage) => 
            (plan.channel_dataplan_name.includes('Asia12'))
        );
    }
    else if (planData.isocode.toUpperCase() === 'EU') {
        console.log('Filtering for EU plans');
        allPlansForRegion = allPlans.filter((plan: MicroeSIMPackage) => 
            plan.channel_dataplan_name.includes('EU36')
        );
    }
    else if (planData.region_nombre === 'Sudeste Asiatico'){
        console.log('Filtering for SEA plans');
        allPlansForRegion = allPlans.filter((plan: MicroeSIMPackage) => 
            (plan.channel_dataplan_name.includes('Southeast Asia'))
        );
    }
    else {
        console.log('Filtering for specific country:', planData.isocode.toUpperCase());
        allPlansForRegion = allPlans.filter((plan: MicroeSIMPackage) => 
            plan.code === planData.isocode.toUpperCase()
        );
    }

    let orderedPlanDataplanId: string = ''
    let orderedPlansByName: MicroeSIMPackage[] = [];

    //this iterates through all the plans returned for the isocode and finds the plan that matches the planData
    allPlansForRegion.forEach((dataPlan: MicroeSIMPackage) => {
        if(dataPlan.channel_dataplan_name.includes('U1520')){
            //only include U1520 plans for JP and KR
            if(planData.isocode.toUpperCase() === 'JP' || planData.isocode.toUpperCase() === 'KR'){
                if(planData.data === 'unlimited'){
                    console.log(dataPlan.channel_dataplan_name)
                }
            }
            else{
                return;
            }
        }
        if (planData.data === 'unlimited') {
            if (dataPlan.data === 'Daily 1GB') {
                console.log('this is a unlimited 1gb per day plan')
                console.log(dataPlan)
                if (dataPlan.day === parseInt(planData.duracion)) {
                    orderedPlansByName.push(dataPlan);
                }
            }
        }
        else {
            if (dataPlan.data === planData.data + 'GB') {
                if (dataPlan.day === parseInt(planData.duracion)) {
                    orderedPlansByName.push(dataPlan);
                }
            }
        }
    });

    if (orderedPlansByName.length === 0) {
        console.log('No plan found for region ' + planData.isocode);
        return;
    }
    //find the cheapest plan in case of multiple plans for the same duration and data
    else {
        orderedPlansByName.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        orderedPlanDataplanId = orderedPlansByName[0].channel_dataplan_id;
    }

    console.log('Selected plan ID:', orderedPlanDataplanId);
    return orderedPlanDataplanId;
}

async function getTopupDetailsWithRetry(topupId: string, maxRetries = 5, delay = 2000): Promise<any> {
    for (let i = 0; i < maxRetries; i++) {
        try {
            const nonce = generateNonce('application/x-www-form-urlencoded');
            const response = await fetch(productionUrl + '/microesim/v1/topupDetail', {
                method: 'POST',
                headers: nonce,
                body: new URLSearchParams({
                    topup_id: topupId
                }).toString()
            });

            if (!response.ok) {
                throw new Error('Failed to fetch topup details');
            }

            const topupDetails = await response.json();
            
            // Check if the eSIM details are ready
            if (topupDetails.result.lpa_str && topupDetails.result.lpa_str.length > 0) {
                console.log('Topup details retrieved successfully');
                return topupDetails;
            } else {
                console.log(`eSIM details not ready yet. Retry ${i + 1} of ${maxRetries}`);
                if (i < maxRetries - 1) {
                    await new Promise(resolve => setTimeout(resolve, delay));
                }
            }
        } catch (error) {
            console.error(`Error fetching topup details (attempt ${i + 1}):`, error);
            if (i === maxRetries - 1) throw error;
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
    throw new Error(`Failed to fetch topup details after ${maxRetries} attempts`);
}

function createOrderedEsim(topupDetails: any, plan: PlanFromDb): OrderedeSIM[] {
    const orderedEsims: OrderedeSIM[] = [];
    //need to iterate through a for loop equivalent to topupDetails.result.number
    for(let i = 0; i < topupDetails.result.success_number; i++){
        const lpa_str = topupDetails.result.lpa_str[i];
        const parts = lpa_str.split('$');
        const activationCode = parts[2];
        const orderedEsimInfo : OrderedeSIM = {
            orderNo: topupDetails.result.topup_id,
            regionName: plan.region_nombre,
            data: plan.data === 'unlimited' ? 'Datos Ilimitados' : `${plan.data}GB`,
            salePrice: plan.precio,
            qrCodeUrl: topupDetails.result.qrcode[i],
            totalDuration: parseInt(plan.duracion),
            smdpAddress: parts[1], // Assuming the SMDP address is the second part of the LPA string
            accessCodeIos: activationCode,
            accessCodeAndroid: lpa_str,
        }
        orderedEsims.push(orderedEsimInfo);
    }
    return orderedEsims
}