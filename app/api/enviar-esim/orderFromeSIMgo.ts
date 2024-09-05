import { PlanFromDb } from "@/app/components/Types/PlanFromDb";
import { get } from "http";
import { NextResponse } from "next/server";
import { validate } from "uuid";



const baseUrl: string = 'https://api.esim-go.com/'

export async function orderFromeSIMgo(planData: PlanFromDb[]) {
    const associatedPlans = await getAssociatedPlans(planData);

    if(!associatedPlans){
        console.error('Failed to get associated plans');
        return
    }
    //commenting this out for now to avoid making actual orders
    // const validatedOrders = await validateAndOrderPlans(associatedPlans);
    // if(typeof validatedOrders !== 'string'){
    //     console.error('Failed to validate and order plans');
    //     return;
    // }
    // getOrderReference(validatedOrders)
    getAssignmentDetails('9c4ebe4c-752f-40ef-bfd4-16f5fdb8e3e7')
}

async function getAssociatedPlans(planData: PlanFromDb[]) {

    let planNames: string[] = [];

    planData.forEach(plan => {
        let planName = `esim_${plan.data !== 'unlimited' ? `${plan.data}GB` : 'UL'}_${plan.duracion}D_${plan.region_isocode.toUpperCase()}_V2`;
        planNames.push(planName);
    });

    const eSIMgoKey = process.env.ESIM_GO_API_KEY;
    if (!eSIMgoKey) {
        console.error('ESIM_GO_API_KEY is not set');
        return;
    }

    try {
        const promises = planData.map((plan, index) => {
            const endpoint = baseUrl + 'v2.3/catalogue/bundle/' + planNames[index];
            return fetch(endpoint, {
                method: 'GET',
                headers: {
                    'X-API-Key': eSIMgoKey,
                    'Content-Type': 'application/json'
                }
            }).then(response => response.json())
              .then(data => ({...data, quantity: plan.quantity}));
        });

        const results = await Promise.all(promises);
        return results
    } catch (err) {
        console.error('Failed to fetch plans', err);
    }
}

async function validateAndOrderPlans(orderedEsims: any[]): Promise<string | NextResponse | undefined> {
    const eSIMgoKey = process.env.ESIM_GO_API_KEY;
    if (!eSIMgoKey) {
        console.error('ESIM_GO_API_KEY is not set');
        return;
    }
       // const inventoryEndpoint = baseUrl + 'v2.4/inventory';
    //THIS JUST CHECKS THE INVENTORY STATUS OF BUNDLES
    // await fetch(inventoryEndpoint, {
    //     method: 'GET',
    //     headers: {
    //         'X-API-Key': eSIMgoKey,
    //         'Content-Type': 'application/json'
    //     }
    // }).then(response => response.json()).then(data => {
    //     console.log('Inventory status is: ')
    //     console.log(data)});


    const endpoint = baseUrl + 'v2.4/orders'

    //add all the bundles
    const orders = orderedEsims.map(orderedEsims => {
        return {
            type: "bundle",
            quantity: orderedEsims.quantity,
            item: orderedEsims.name
        }
    })

    //get the order info for the body request
    const orderInfo = {
        type : "validate",
        assign: true,
        Order: orders
    }
    //validate order
    const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
            'X-API-Key': eSIMgoKey,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderInfo)
    })
    const data = await response.json();
    if(!data){
        console.error('Failed to validate orders')
        return;
    }
    
    //call the same request but with type transaction
    if(data.valid === true){
        const orderInfo = {
            type : "transaction",
            assign: true,
            Order: orders
        }
        const purchasedResponse = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'X-API-Key': eSIMgoKey,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderInfo)
        })
        const purchasedData = await purchasedResponse.json();
        if(!purchasedData){
            console.error('Failed to purchase orders')
            return;
        }
        else {
            //if all goes well return the order reference
            return purchasedData.orderReference
        }
    }
}

async function getAssignmentDetails(orderReference : string){
    const endpoint = baseUrl + 'v2.4/esims/assignments?reference=' + orderReference

    const eSIMgoKey = process.env.ESIM_GO_API_KEY;
    if(!eSIMgoKey){
        console.error('ESIM_GO_API_KEY is not set');
        return;
    }

    await fetch(endpoint, {
        method: 'GET',
        headers: {
            'X-API-Key': eSIMgoKey,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }).then(response => response.json()).then(data => {
        console.log('logging the result of the order reference query')
        console.log(data)})

        //need to get the data in zip format and unzip the qrcode images and send them back to the user
}