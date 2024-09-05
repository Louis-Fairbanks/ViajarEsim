import { PlanFromDb } from "@/app/components/Types/PlanFromDb";
import CryptoJS from 'crypto-js';



const testUrl :  string = 'https://microesim.club'
const productionUrl : string = 'https://microesim.top'
const testAccount : string = 'test_account_9999'
//if statements to validate these env variables
let productionAccount : string;
let productionSecret : string;
let productionSalt : string;
// if(process.env.MICROESIM_PRODUCTION_ACCOUNT === undefined || process.env.MICROESIM_PRODUCTION_ACCOUNT === undefined || process.env.MICROESIM_SECRET === undefined || process.env.MICROESIM_SALT === undefined){
// }
// else{
     productionAccount = '628208cd767db5e7a309b856dbd5aa99'
     productionSecret = '276c40a4f8ce21e963g232382f09'
     productionSalt = '36ca86d091ca7cbe7cbf15ed5ee8ef05'
//}

const testSecret : string = '7119968f9ff07654ga485487822g'
const testSalt : string = 'c38ab89bd01537b3915848d689090e56'

export async function orderFromMicroesim(planData : PlanFromDb[]){
    const getDataPlans = await getDataPlanList();
    console.log(getDataPlans)
}

async function getDataPlanList(){
    const nonce = CryptoJS.lib.WordArray.random(10).toString(CryptoJS.enc.Hex);
    const timestamp = new Date().getTime().toString();
    const salt = CryptoJS.enc.Hex.parse(productionSalt);
    const iterations = 1024;
    const keyLength = 256 / 32; 

    let hashPassword = CryptoJS.PBKDF2(productionSalt, salt, {keySize: keyLength,iterations: iterations,hasher: CryptoJS.algo.SHA256}).toString(CryptoJS.enc.Hex);
    const dataToHash = productionAccount + nonce + timestamp;
    const signature = CryptoJS.HmacSHA256(dataToHash,hashPassword).toString(CryptoJS.enc.Hex);

    const response = await fetch(productionUrl + '/microesim/v1/esimDataplanList', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'MICROESIM-ACCOUNT': productionAccount,
            'MICROESIM-NONCE': nonce,                     //random nonce string of 6-32 digits
            'MICROESIM-TIMESTAMP': timestamp,               //timestamp, seconds 13 digits long
            'MICROESIM-SIGN': signature                //A signature generated using HMAC-SHA256 with the hashed password derived from the original secret and salt. 
        }                                       //Signature content: microesim-account, microesim-nonce, micro-esim-timestamp
    })
    if(!response){
        console.log('Failed to fetch plans')
    }
    const data = await response.json();
    return data;
}