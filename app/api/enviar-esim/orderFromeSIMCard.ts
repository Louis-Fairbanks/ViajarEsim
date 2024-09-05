import { PlanFromDb } from "@/app/components/Types/PlanFromDb";
import { NextResponse } from "next/server";

const baseUrl: string = 'https://esimcard.com/api/developer/dealer'

export async function orderFromeSIMCard(){
    console.log('orderFromeSIMCard')
    if(process.env.ESIM_CARD_EMAIL === undefined || process.env.ESIM_CARD_PASSWORD === undefined){
        console.log('ESIM_CARD_EMAIL or ESIM_CARD_PASSWORD is not set')
        return;
    }
    const emailLogin : string = process.env.ESIM_CARD_EMAIL;
    const passwordLogin : string = process.env.ESIM_CARD_PASSWORD 
    let accessToken = await login(emailLogin, passwordLogin);
    console.log(accessToken)
    if(!accessToken || accessToken instanceof NextResponse){
        return NextResponse.json({ message : 'Failed to login'})
    }
    else{
        getAllPackages(accessToken)
    }

}

async function login(email : string, password : string): Promise<string | NextResponse | undefined>{
    const endpoint : string = baseUrl + '/login'

    console.log('logging in with email ' + email + ' and password ' + password  + 'at ' + endpoint)

    const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    })
    if(!response){
        console.error('Failed to login')
        return;
    }
    else {
        const data = await response.json()
        return data.access_token;
    }
}

async function getAllPackages(token : string){
    console.log('getting all packages with token ' + token + ' at ' + baseUrl + '/packages')
    await fetch(baseUrl + '/packages?package_type=DATA-ONLY', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }).then(response => response.json()).then(data => console.log(data))
}