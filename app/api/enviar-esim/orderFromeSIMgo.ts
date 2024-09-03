import { PlanFromDb } from "@/app/components/Types/PlanFromDb";
import { get } from "http";
import { validate } from "uuid";


const baseUrl: string = 'https://api.esim-go.com/'

export async function orderFromeSIMgo(planData: PlanFromDb[]) {
    const associatedPlans = await getAssociatedPlans(planData);

    if(!associatedPlans){
        console.error('Failed to get associated plans');
        return
    }
    // const validatedOrders : any = await validateOrders(associatedPlans);
    getOrderReference('24504e13-cd05-4e81-908a-5fbd9ef2916e')
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
        const promises = planNames.map(planName => {
            const endpoint = baseUrl + 'v2.3/catalogue/bundle/' + planName;
            return fetch(endpoint, {
                method: 'GET',
                headers: {
                    'X-API-Key': eSIMgoKey,
                    'Content-Type': 'application/json'
                }
            }).then(response => response.json());
        });

        const results = await Promise.all(promises);
        console.log(results);
        return results
    } catch (err) {
        console.error('Failed to fetch plans', err);
    }
}

// async function validateOrders(orderedEsims: any[]) {
//     const inventoryEndpoint = baseUrl + 'v2.4/inventory';
//     const eSIMgoKey = process.env.ESIM_GO_API_KEY;
//     if (!eSIMgoKey) {
//         console.error('ESIM_GO_API_KEY is not set');
//         return;
//     }

//     await fetch(inventoryEndpoint, {
//         method: 'GET',
//         headers: {
//             'X-API-Key': eSIMgoKey,
//             'Content-Type': 'application/json'
//         }
//     }).then(response => response.json()).then(data => {
//         console.log('Inventory status is: ')
//         console.log(data)});


//     const endpoint = baseUrl + 'v2.4/orders'

//     const orderInfo = {
//         type : "transaction",
//         assign: true,
//         Order: [
//             {
//                 type: "bundle",
//                 quantity: 1,   //needs to be iterated through and set to the quantity of each plan
//                 item: orderedEsims[0].name
//             }
//         ]
//     }


//     let bundles = { bundles: [] as { name: any }[] };

//     orderedEsims.forEach(orderedEsims => {
//         bundles.bundles.push({
//             name: orderedEsims.name,
//         })
//     })

//     console.log(bundles.bundles)
//     const response = await fetch(endpoint, {
//         method: 'POST',
//         headers: {
//             'X-API-Key': eSIMgoKey,
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(orderInfo)
//     })
//     const data = await response.json();
//     if(!data){
//         console.error('Failed to validate orders')
//         return;
//     }
//     console.log(data);

//     //if order.valid === true then we can proceed to the next step
// }

async function getOrderReference(orderReference : string){
    const endpoint = baseUrl + 'v2.4/orders/' + orderReference

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
            'Accept': 'application/zip'
        }
    }).then(response => response.json()).then(data => {
        console.log('logging the result of the order reference query')
        console.log(data)})
}