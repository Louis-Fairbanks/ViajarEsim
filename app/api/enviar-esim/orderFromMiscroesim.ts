import { PlanFromDb } from "@/app/components/Types/PlanFromDb";
import CryptoJS from 'crypto-js';



const testUrl :  string = 'https://microesim.club'
const productionUrl : string = 'https://microesim.top'
const testAccount : string = 'test_account_9999'
const testSecret : string = '7119968f9ff07654ga485487822g'
const testSalt : string = 'c38ab89bd01537b3915848d689090e56'

export async function orderFromMicroesim(planData : PlanFromDb[]){
    const getDataPlans = await getDataPlanList();
    console.log(getDataPlans)
}

async function getDataPlanList(){
    const nonce = CryptoJS.lib.WordArray.random(10).toString(CryptoJS.enc.Hex);
    const timestamp = new Date().getTime().toString();
    const salt = CryptoJS.enc.Hex.parse(testSalt);
    const iterations = 1024;
    const keyLength = 256 / 32; 

    let hashPassword = CryptoJS.PBKDF2(testSecret, salt, {keySize: keyLength,iterations: iterations,hasher: CryptoJS.algo.SHA256}).toString(CryptoJS.enc.Hex);
    const dataToHash = testAccount + nonce + timestamp;
    const signature = CryptoJS.HmacSHA256(dataToHash,hashPassword).toString(CryptoJS.enc.Hex);

    const response = await fetch(testUrl + '/microesim/v1/esimDataplanList', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'MICROESIM-ACCOUNT': testAccount,
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