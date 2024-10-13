import { PlanFromDb } from "@/app/[locale]/components/Types/PlanFromDb";
import { NextResponse } from "next/server";
import { OrderedeSIM } from "@/app/[locale]/components/Types/TOrderedEsim";
import QRCode from 'qrcode';
import { setTimeout } from "timers/promises";

const baseUrl: string = 'https://esimcard.com/api/developer/reseller'

type eSIMCardPlan = {
    id: string,
    name: string,
    price: string,
    unlimited: boolean,
}

type PlanOrder = {
    planFromDb: PlanFromDb,
    eSIMCardPlan: eSIMCardPlan,
    quantity: number
}

const orderedEsims: OrderedeSIM[] = [];

export async function orderFromeSIMCard(plans: PlanFromDb[]): Promise<OrderedeSIM[]> {
    try {
        if (!process.env.ESIM_CARD_EMAIL || !process.env.ESIM_CARD_PASSWORD) {
            throw new Error('ESIM_CARD_EMAIL or ESIM_CARD_PASSWORD is not set');
        }

        const accessToken = await login(process.env.ESIM_CARD_EMAIL, process.env.ESIM_CARD_PASSWORD);
        if (!accessToken || accessToken instanceof NextResponse) {
            throw new Error('Failed to login');
        }

        const planOrders = await getPlanOrders(accessToken, plans);
        if (!planOrders) {
            throw new Error('Failed to get plan orders');
        }

        // await orderPlans(accessToken, planOrders);
        console.log(`Total eSIMs ordered: ${orderedEsims.length}`);
        return orderedEsims;
    } catch (error) {
        console.error('Error in orderFromeSIMCard:', error instanceof Error ? error.message : String(error));
        return [];
    }
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


async function getPlanOrders(token: string, plans: PlanFromDb[]): Promise<PlanOrder[] | undefined> {
    const planOrdersPromises = plans.map(async (plan) => {
        const endpoint = `${baseUrl}/packages/country/${plan.isocode}`;
        const response = await fetch(endpoint, {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}` }
        });

        if (!response.ok) {
            console.error(`Failed to get plans for ${plan.isocode}`);
            return null;
        }

        const allPlansForIsocode = await response.json();
        const matchingPlan = findMatchingPlan(allPlansForIsocode.data, plan);

        if (!matchingPlan) {
            console.error(`No matching plan found for ${plan.isocode}`);
            return null;
        }
        return {
            planFromDb: plan,
            eSIMCardPlan: matchingPlan,
            // quantity: plan.quantity
        };
    });

    const planOrders = await Promise.all(planOrdersPromises);

    //this is for testing
    const endpoint = baseUrl + '/my-esims';
    const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response){
        console.error('something went wrong')
    }
    const data = await response.json()
    console.log(data)
    return planOrders.filter((order): order is PlanOrder => order !== null);



}

function findMatchingPlan(allPlans: eSIMCardPlan[], plan: PlanFromDb): eSIMCardPlan | undefined {
    const gbString = plan.data === 'unlimited' ? 'Unlimited' : `${plan.data}GB`;
    const daysRegex = new RegExp(`\\b${plan.duracion} Days\\b`);
    return allPlans.find(p => p.name.includes(gbString) && daysRegex.test(p.name));
}

// async function orderPlans(token: string, planOrders: PlanOrder[]): Promise<void> {
//     const endpoint = `${baseUrl}/package/purchase`;
//     const maxRetries = 90; // Maximum number of retry attempts
//     const retryDelay = 30000; // 30 seconds delay between retries

//     for (const order of planOrders) {
//         for (let i = 0; i < order.quantity; i++) {
//             const params = new URLSearchParams();
//             params.append('package_type_id', order.eSIMCardPlan.id);
            
//             let attempts = 0;
//             let success = false;

//             while (attempts < maxRetries && !success) {
//                 try {
//                     console.log(`Attempting to purchase plan: ${order.eSIMCardPlan.name} (Attempt ${attempts + 1})`);
//                     const response = await fetch(endpoint, {
//                         method: 'POST',
//                         headers: {
//                             'Authorization': `Bearer ${token}`,
//                             'Content-Type': 'application/x-www-form-urlencoded'
//                         },
//                         body: params
//                     });

//                     if (!response.ok) {
//                         const errorBody = await response.text();
//                         throw new Error(`HTTP error! status: ${response.status}, body: ${errorBody}`);
//                     }

//                     const planDetails = await response.json();
//                     console.log('Purchase response:', planDetails);

//                     if (planDetails.status && planDetails.data.sim_applied) {
//                         console.log('Successfully purchased and applied eSIM');
//                         const orderedEsim = await createOrderedEsim(order.planFromDb, planDetails.data);
//                         if (orderedEsim && !(orderedEsim instanceof NextResponse)) {
//                             orderedEsims.push(orderedEsim);
//                             console.log('Successfully created and added OrderedEsim', orderedEsim);
//                             success = true;
//                         } else {
//                             throw new Error('Failed to create OrderedEsim object');
//                         }
//                     } else if (planDetails.status && !planDetails.data.sim_applied) {
//                         console.log('eSIM purchased but not ready. Retrying after delay...');
//                         await setTimeout(retryDelay);
//                     } else {
//                         throw new Error('Unexpected response structure');
//                     }
//                 } catch (error) {
//                     console.error('Error occurred while purchasing plan:', {
//                         error: error instanceof Error ? error.message : String(error),
//                         stack: error instanceof Error ? error.stack : undefined,
//                         planId: order.eSIMCardPlan.id,
//                         planName: order.eSIMCardPlan.name,
//                         attempt: attempts + 1
//                     });

//                     if (attempts === maxRetries - 1) {
//                         console.error(`Max retries reached for plan: ${order.eSIMCardPlan.name}`);
//                     } else {
//                         await setTimeout(retryDelay);
//                     }
//                 }

//                 attempts++;
//             }

//             if (!success) {
//                 console.error(`Failed to purchase plan after ${maxRetries} attempts: ${order.eSIMCardPlan.name}`);
//             }
//         }
//     }
// }

async function createOrderedEsim(planFromDb: PlanFromDb, esimData: any): Promise<OrderedeSIM | NextResponse | undefined> {
    const qrCodeBuffer = await QRCode.toBuffer(esimData.qr_code_text);
    const qrCodeBase64 = qrCodeBuffer.toString('base64');

    const accessCodeIos = esimData.qr_code_text.split('$')[2];
    const accessCodeAndroid = esimData.qr_code_text;

    return {
        orderNo: BigInt(Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)).toString(),
        regionName: planFromDb.region_nombre,
        data: planFromDb.data === 'unlimited' ? 'Datos Ilimitados' : planFromDb.data,
        salePrice: planFromDb.precio,
        qrCodeUrl: `data:image/png;base64,${qrCodeBase64}`,
        totalDuration: parseInt(planFromDb.duracion),
        smdpAddress: esimData.smdp_address,
        accessCodeIos: accessCodeIos,
        accessCodeAndroid: accessCodeAndroid,
        iccid: '0',
        pedidos_planes_id: 0
    };
}