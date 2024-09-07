import { PlanFromDb } from "@/app/components/Types/PlanFromDb";
import { NextResponse } from "next/server";
import { OrderedeSIM } from "@/app/components/Types/TOrderedEsim";
import QRCode from 'qrcode';

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

export async function orderFromeSIMCard(plans: PlanFromDb[]): Promise<OrderedeSIM[] | undefined> {
    if (!process.env.ESIM_CARD_EMAIL || !process.env.ESIM_CARD_PASSWORD) {
        console.error('ESIM_CARD_EMAIL or ESIM_CARD_PASSWORD is not set')
        return []
    }

    const accessToken = await login(process.env.ESIM_CARD_EMAIL, process.env.ESIM_CARD_PASSWORD);
    if (!accessToken || accessToken instanceof NextResponse) {
        console.error('Failed to login');
        return []
    }

    const planOrders = await getPlanOrders(accessToken, plans);
    if (!planOrders) {
        console.error('Failed to get plan orders')
        return []
    }

    await orderPlans(accessToken, planOrders);
    return orderedEsims;
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
            quantity: plan.quantity
        };
    });

    const planOrders = await Promise.all(planOrdersPromises);
    return planOrders.filter((order): order is PlanOrder => order !== null);
}

function findMatchingPlan(allPlans: eSIMCardPlan[], plan: PlanFromDb): eSIMCardPlan | undefined {
    const gbString = plan.data === 'unlimited' ? 'Unlimited' : `${plan.data}GB`;
    const daysRegex = new RegExp(`\\b${plan.duracion} Days\\b`);
    return allPlans.find(p => p.name.includes(gbString) && daysRegex.test(p.name));
}

async function orderPlans(token: string, planOrders: PlanOrder[]): Promise<void> {
    const endpoint = `${baseUrl}/package/purchase`;
    for (const order of planOrders) {
        for (let i = 0; i < order.quantity; i++) {
            const params = new URLSearchParams();
            params.append('package_type_id', order.eSIMCardPlan.id);
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: params
            });

            if (!response.ok) {
                console.error('Failed to purchase plan');
                continue;
            }

            const planDetails = await response.json();
            const orderedEsim = await createOrderedEsim(order.planFromDb, planDetails.data);
            if(!orderedEsim || orderedEsim instanceof NextResponse) {
                return;
            }
            orderedEsims.push(orderedEsim);
        }
    }
}

async function createOrderedEsim(planFromDb: PlanFromDb, esimData: any): Promise<OrderedeSIM | NextResponse | undefined> {

    const accessCodeIos = esimData.qr_code_text.split('$')[2];
    const accessCodeAndroid = esimData.qr_code_text;

    return {
        orderNo: BigInt(Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)).toString(),
        regionName: planFromDb.region_nombre,
        data: planFromDb.data === 'unlimited' ? 'Datos Ilimitados' : planFromDb.data,
        salePrice: planFromDb.precio,
        qrCodeUrl: accessCodeAndroid,
        totalDuration: parseInt(planFromDb.duracion),
        smdpAddress: esimData.smdp_address,
        accessCodeIos: accessCodeIos,
        accessCodeAndroid: accessCodeAndroid,
    };
}