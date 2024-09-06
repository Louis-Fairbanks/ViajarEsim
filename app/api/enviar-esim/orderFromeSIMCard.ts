import { PlanFromDb } from "@/app/components/Types/PlanFromDb";
import { NextResponse } from "next/server";

const baseUrl: string = 'https://esimcard.com/api/developer/dealer'

type eSIMCardPlanWithQuantity = {
    id : string,
    name : string,
    price : string,
    unlimited : boolean,
    quantity? : number,
}

export async function orderFromeSIMCard(plans: PlanFromDb[]) {
    if (process.env.ESIM_CARD_EMAIL === undefined || process.env.ESIM_CARD_PASSWORD === undefined) {
        console.log('ESIM_CARD_EMAIL or ESIM_CARD_PASSWORD is not set')
        return;
    }
    const emailLogin: string = process.env.ESIM_CARD_EMAIL;
    const passwordLogin: string = process.env.ESIM_CARD_PASSWORD

    let accessToken = await login(emailLogin, passwordLogin);
    if (!accessToken || accessToken instanceof NextResponse) {
        return NextResponse.json({ message: 'Failed to login' })
    }
    const allValidPlansData : eSIMCardPlanWithQuantity[] = await getPackagesByIsocode(accessToken, plans)
    if (!allValidPlansData) {
        return NextResponse.json({ message: 'Failed to get plans' })
    }
    //remove plans without an id
    const validPlansWithId = allValidPlansData.filter(plan => plan.id !== undefined);
    console.log(validPlansWithId)
    orderPlan(accessToken, validPlansWithId)
}

async function login(email: string, password: string): Promise<string | NextResponse | undefined> {
    const endpoint: string = baseUrl + '/login'

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
    if (!response) {
        console.error('Failed to login')
        return;
    }
    else {
        const data = await response.json()
        return data.access_token;
    }
}

async function getPackagesByIsocode(token: string, plans: PlanFromDb[]) {
    // Map each plan to a promise that resolves to the plan data
    const allPackagesPromises = plans.map(async (plan) => {
        const isocode = plan.region_isocode
        const endpoint: string = baseUrl + '/packages/country/' + isocode
        const data = await fetch(endpoint, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        if (!data) {
            console.error('Failed to get plans')
            return null;
        }
        else {
            const allPlansForIsocode = await data.json()
            const returnedPlan : eSIMCardPlanWithQuantity | undefined = await getIndividualPlanFromAllPlansForIsocode(allPlansForIsocode.data, plan)
            if (returnedPlan === undefined) {
                console.log('Something went really wrong here')
                return null;
            }
            return {
                ...returnedPlan,
                quantity: plan.quantity
            }
        }
    })

    // Wait for all promises to resolve
    const allPackages = await Promise.all(allPackagesPromises)

    // Filter out null values (in case of failed fetches)
    const validPackages = allPackages.filter(failedPackage => failedPackage !== null)
    return validPackages;
}

async function getIndividualPlanFromAllPlansForIsocode(allPlansFromIsocode : eSIMCardPlanWithQuantity[], plan : PlanFromDb):
Promise<eSIMCardPlanWithQuantity | undefined> {
    let orderedPlan : eSIMCardPlanWithQuantity | null = null;
    let gbString : string = plan.data === 'unlimited' ? 'Unlimited' : plan.data + 'GB';
    let daysString : string = plan.duracion + ' Days';
    allPlansFromIsocode.forEach((individualPlan : eSIMCardPlanWithQuantity) => {
        if(individualPlan.name.includes(gbString) && individualPlan.name.includes(daysString)){
            orderedPlan = individualPlan;
            return;
        }
    })
    if(orderedPlan === null){
        console.log('Failed to find plan')
        return 
    }
    return orderedPlan;
}

async function orderPlan(token : string, plans : eSIMCardPlanWithQuantity[]){
    const endpoint : string = baseUrl + '/package/purchase?test-true'
    const allOrdersPlansDetails : any [] = [];
    const allOrdersPromises = plans.flatMap((plan) => {
        // Create an array of size plan.quantity and map over it to create fetch promises
        return Array(plan.quantity).fill(0).map(async () => {
            console.log(plan.id)
            const params = new URLSearchParams();
            params.append('package_type_id', plan.id);
            const data = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Authorization' : 'Bearer ' + token,
                    'Content-Type' : 'application/x-www-form-urlencoded'
                },
                body: params
            })
            if(!data){
                console.log('Failed to purchase plan')
                return;
            }
            else {
                const planDetails = await data.json();
                allOrdersPlansDetails.push(planDetails)
            }
        })
    })

    // Wait for all promises to resolve
    const allOrders = await Promise.all(allOrdersPromises)
    console.log(allOrdersPlansDetails)
}