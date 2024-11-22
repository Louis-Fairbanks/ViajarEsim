import { PlanFromDb } from "@/app/[locale]/components/Types/PlanFromDb";
import CryptoJS from 'crypto-js';
import { OrderedeSIM } from "@/app/[locale]/components/Types/TOrderedEsim";

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
    data_cap?: number;
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
        const requestedPlans = await getDataPlans(planData.filter(plan => plan.isocode === 'un').length > 0);
        const orderedPlansWithTopupIds = await purchasePlans(planData, requestedPlans);
        console.log('Ordered plans with topup IDs:', orderedPlansWithTopupIds);

        const orderedEsims: OrderedeSIM[] = [];

        //for each of those objects of the plan and topupid, get its details
        for (const { plan, topupId } of orderedPlansWithTopupIds) {
            try {
                //the getTopupDetailsWithRetry function returns relevant information like the LPA string about the ordered eSIM
                const endpoint = plan.isocode === 'un' ? '/allesim/v1/topupDetail' : '/microesim/v1/topupDetail';
                const topupDetails = await getTopupDetailsWithRetry(topupId, endpoint);
                console.log('Topup details for ID', topupId, ':', topupDetails);
                
                const orderedEsimArray = createOrderedEsim(topupDetails, plan);
                orderedEsims.push(...orderedEsimArray);
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

async function getDataPlans( includeAllPlans : boolean) {
    const nonce = generateNonce('application/json');
    const response = await fetch(productionUrl + '/microesim/v1/esimDataplanList', {
        method: 'GET',
        headers: nonce
    })
    if (!response) {
        console.log('Failed to fetch plans')
    }
    const allPlans = await response.json();
    if (includeAllPlans){
        const nonce2 = generateNonce('application/json');
        const response2 = await fetch(productionUrl + '/allesim/v1/esimDataplanList', {
            method: 'GET',
            headers: nonce2
        })
        if(!response){
            console.log('Failed to fetch all plans')
        }
        const allPlans2 = await response2.json();
        allPlans.result.push(...allPlans2.result);
    }
    return allPlans;
}

async function purchasePlans(planData: PlanFromDb[], allPlans: any) {
    const orderPromises = planData.map(async (plan) => {
        //match up each plan information from the planfromdb array with the results from the entire catalogue query
        //use the findDataplanIdForIndividualPlan function to find the correct plan id for the plan
        let planId = findDataplanIdForIndividualPlan(plan, allPlans.result);
        if (planId) {
            const nonce = generateNonce('application/x-www-form-urlencoded');
            const endpoint = plan.isocode === 'un' ? '/allesim/v1/esimSubscribe' : '/microesim/v1/esimSubscribe';
            const orderedPlanDetails = await fetch(productionUrl + endpoint, {
                method: 'POST',
                headers: nonce,
                body: new URLSearchParams({
                    number: "1",
                    channel_dataplan_id: planId
                }).toString()
            });
            if (!orderedPlanDetails.ok) {
                console.error('Failed to order plan');
                const orderError = await orderedPlanDetails.json();
                console.log('Order error:', orderError);
                return null;
            } else {
                //if everything goes well here we'll get the planDetails back
                const planDetails = await orderedPlanDetails.json();
                console.log('Plan details:', planDetails);
                //then we'll return an object with the planFromDb object, plus the topup_id which we use later to get the eSIM details
                return { plan, topupId: planDetails.result.topup_id };
            }
        }
        return null;
    });

    const results = await Promise.all(orderPromises);
    //this will return an array of objcts with the planFromDb object and the topup_id for each plan that was successfully ordered
    return results.filter((result): result is { plan: PlanFromDb; topupId: string } => result !== null);
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
    else if (planData.isocode.toUpperCase() === 'UN'){
        console.log('Filtering for Earth plans');
        allPlansForRegion = allPlans.filter((plan: MicroeSIMPackage) => 
            (plan.channel_dataplan_name.includes('Global Not Include Mainland China'))
        );
    }
    else {
        console.log('Filtering for specific country:', planData.isocode.toUpperCase());
        allPlansForRegion = allPlans.filter((plan: MicroeSIMPackage) => plan.code === planData.isocode.toUpperCase());
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
            //search for brazil plan from new api interface
            if (dataPlan.data_cap){
                if (dataPlan.data_cap === 1) {
                    if (dataPlan.day === parseInt(planData.duracion)) {
                        orderedPlansByName.push(dataPlan);
                    }
                }
            }
            if (dataPlan.data === 'Daily 1GB' || dataPlan.data === 'Daily1GB') {
                if (dataPlan.day === parseInt(planData.duracion)) {
                    orderedPlansByName.push(dataPlan);
                }
            }
        }
        else {
            if (dataPlan.data === 'Total ' + planData.data + 'GB') {
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
    if (planData.isocode.toUpperCase() === 'JP' && planData.data != 'unlimited') {
        orderedPlanDataplanId = '20240813CE8EE6EeE608e8C012802774A'
    }
    //find the cheapest plan in case of multiple plans for the same duration and data
    else {
        orderedPlansByName.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        orderedPlanDataplanId = orderedPlansByName[0].channel_dataplan_id;
    }

    console.log('Selected plan ID:', orderedPlanDataplanId);
    return orderedPlanDataplanId;
}

async function getTopupDetailsWithRetry(topupId: string, endpoint : string, maxRetries = 6, delay = 3000): Promise<any> {
    for (let i = 0; i < maxRetries; i++) {
        try {
            const nonce = generateNonce('application/x-www-form-urlencoded');
            const response = await fetch(productionUrl + endpoint, {
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
                console.log(topupDetails);
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
    //this was really for when we were ordering two or more of a plan at a time but will still work because success_number will just return 1
    //this creates the orderedEsim with all the information to email to the client in addition to the planes_pedidos_id which we will need
    //to associate the iccid with the esim in our database
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
            iccid: topupDetails.result.device_ids[0],
            smdpAddress: parts[1],
            accessCodeIos: activationCode,
            accessCodeAndroid: lpa_str,
            pedidos_planes_id: plan.planes_pedidos_id
        }
        orderedEsims.push(orderedEsimInfo);
    }
    return orderedEsims;
}