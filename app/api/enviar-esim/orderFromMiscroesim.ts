import { PlanFromDb } from "@/app/components/Types/PlanFromDb";
import CryptoJS from 'crypto-js';

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

export async function orderFromMicroesim(planData: PlanFromDb[]) {
    const requestedPlans = await getDataPlans(planData);
    const orderedPlansTopupIds = await purchasePlans(planData, requestedPlans);

    let resultsOfEsimOrders : Result[] = [];

    orderedPlansTopupIds.forEach(async (topupId) => {
       const emailInfo : Result = await getTopupDetails(topupId)
         resultsOfEsimOrders.push(emailInfo)
    })
    return resultsOfEsimOrders;
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

async function purchasePlans (planData : PlanFromDb[], allPlans : any){
    const secondNonce = await generateNonce('application/x-www-form-urlencoded');
    const orderSuccessIds : string[] = [];
    //for each plan passed in, find the plan id
    planData.forEach(async (plan) => {
        //get the package ids of all the plans we want to order
        let planId = findDataplanIdForIndividualPlan(plan, allPlans.result);
        let planQuantity = plan.quantity.toString()
        if (planId && planQuantity) {
            const orderedPlanDetails = await fetch(productionUrl + '/microesim/v1/esimSubscribe', {
                method: 'POST',
                headers: secondNonce,
                body: new URLSearchParams({
                    number: planQuantity,
                    channel_dataplan_id: planId
                }).toString()
            })
            if (!orderedPlanDetails) {
                console.log('Failed to order plan')
            }
            else {
                const planDetails = await orderedPlanDetails.json();
                orderSuccessIds.push(planDetails.result.topup_id);
            }
        }
    })
    return orderSuccessIds;
}

function findDataplanIdForIndividualPlan(planData: PlanFromDb, allPlans: any[]) {
    let allPlansForRegion: MicroeSIMPackage[] = [];

    allPlans.forEach((plan: MicroeSIMPackage) => {
        if (plan.code === planData.region_isocode.toUpperCase()) {
            allPlansForRegion.push(plan);
        }
    })
    let orderedPlanDataplanId: string = ''
    let orderedPlansByName: MicroeSIMPackage[] = [];

    allPlansForRegion.find((dataPlan: MicroeSIMPackage) => {
        if(dataPlan.channel_dataplan_name.includes('U1520')){
            return
        }
        //if an unlimited plan was ordered, search for packages with data = 'Daily 128kb'
        if (planData.data === 'unlimited') {
            if (dataPlan.data === 'Daily 1GB') {
                if (dataPlan.day === parseInt(planData.duracion)) {
                    orderedPlansByName.push(dataPlan);
                    return;
                }
            }
        }
        else {
            if (dataPlan.data === planData.data + 'GB') {
                if (dataPlan.day === parseInt(planData.duracion)) {
                    orderedPlansByName.push(dataPlan);
                    return;
                }
            }
        }
    })
    if (orderedPlansByName.length === 0) {
        console.log('No plan found for region ' + planData.region_isocode)
        return;
    }
    else {
        orderedPlansByName.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        orderedPlanDataplanId = orderedPlansByName[0].channel_dataplan_id;
    }
    return orderedPlanDataplanId;
}

async function getTopupDetails (topupId : string){
    const nonce = await generateNonce('application/x-www-form-urlencoded');
    const response = await fetch(productionUrl + '/microesim/v1/topupDetail', {
        method: 'POST',
        headers: nonce,
        body:  new URLSearchParams({
            topup_id: topupId
        }).toString()
    })
    if (!response) {
        console.log('Failed to fetch topup details')
    }
    const topupDetails = await response.json();
    const lpa_str = topupDetails.lpa_str[0]
    const parts = lpa_str.split('$')
    const activationCode = parts[2]
    //needs to support batch orders too
    const topupInformation : Result = {
        qrcode : topupDetails.result.qrcode[0],
        activationCode: activationCode,
        iosInstallLink: topupDetails.result.ios_esim_install_link[0]
    }
    return topupInformation;
}


