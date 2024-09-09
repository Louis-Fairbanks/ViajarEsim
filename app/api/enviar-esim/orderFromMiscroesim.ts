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
        const requestedPlans = await getDataPlans(planData);
        const orderedPlansTopupIds = await purchasePlans(planData, requestedPlans);
        console.log('Ordered plan topup IDs:', orderedPlansTopupIds);

        const orderedEsims: OrderedeSIM[] = [];

        for (const topupId of orderedPlansTopupIds) {
            try {
                const topupDetails = await getTopupDetails(topupId);
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
                    const orderedEsim = createOrderedEsim(topupDetails, correspondingPlan);
                    orderedEsims.push(orderedEsim);
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


async function generateNonce(headerType: string) {
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

async function getDataPlans(planData: PlanFromDb[]) {
    const nonce = await generateNonce('application/json');
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
    const secondNonce = await generateNonce('application/x-www-form-urlencoded');
    const orderPromises = planData.map(async (plan) => {
        let planId = findDataplanIdForIndividualPlan(plan, allPlans.result);
        let planQuantity = plan.quantity.toString();
        if (planId && planQuantity) {
            const orderedPlanDetails = await fetch(productionUrl + '/microesim/v1/esimSubscribe', {
                method: 'POST',
                headers: secondNonce,
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
    console.log('Function called with planData:', planData);
    console.log('Number of allPlans:', allPlans.length);

    let allPlansForRegion: MicroeSIMPackage[] = [];
    
    console.log('Checking isocode:', planData.isocode.toUpperCase());

    if (planData.isocode.toUpperCase() === 'NA'){
        console.log('Filtering for NA plans');
        allPlansForRegion = allPlans.filter((plan: MicroeSIMPackage) => 
            (plan.code.includes('AS') && plan.code.includes('CA'))
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
    else if (planData.isocode.toUpperCase() === 'ID'){
        console.log('Filtering for ID plans');
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

    console.log('Filtered plans for region:', allPlansForRegion);

    let orderedPlanDataplanId: string = ''
    let orderedPlansByName: MicroeSIMPackage[] = [];

    allPlansForRegion.forEach((dataPlan: MicroeSIMPackage) => {
        if(dataPlan.channel_dataplan_name.includes('U1520')){
            return;
        }
        if (planData.data === 'unlimited') {
            if (dataPlan.data === 'Daily 1GB') {
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

    console.log('Ordered plans by name:', orderedPlansByName);

    if (orderedPlansByName.length === 0) {
        console.log('No plan found for region ' + planData.isocode);
        return;
    }
    else {
        orderedPlansByName.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        orderedPlanDataplanId = orderedPlansByName[0].channel_dataplan_id;
    }

    console.log('Selected plan ID:', orderedPlanDataplanId);
    return orderedPlanDataplanId;
}

async function getTopupDetails(topupId: string): Promise<any> {
    const nonce = await generateNonce('application/x-www-form-urlencoded');
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
    console.log(topupDetails)
    return topupDetails;
}

function createOrderedEsim(topupDetails: any, plan: PlanFromDb): OrderedeSIM {
    const lpa_str = topupDetails.result.lpa_str[0];
    const parts = lpa_str.split('$');
    const activationCode = parts[2];

    return {
        orderNo: topupDetails.result.topup_id,
        regionName: plan.region_nombre,
        data: plan.data === 'unlimited' ? 'Datos Ilimitados' : `${plan.data}GB`,
        salePrice: plan.precio,
        qrCodeUrl: topupDetails.result.qrcode[0],
        totalDuration: parseInt(plan.duracion),
        smdpAddress: parts[1], // Assuming the SMDP address is the second part of the LPA string
        accessCodeIos: activationCode,
        accessCodeAndroid: lpa_str,
    };
}