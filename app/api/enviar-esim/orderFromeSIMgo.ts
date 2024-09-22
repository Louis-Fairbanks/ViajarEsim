import { PlanFromDb } from "@/app/components/Types/PlanFromDb";
import { OrderedeSIM } from "@/app/components/Types/TOrderedEsim";
import QRCode from 'qrcode';
import { setTimeout } from 'timers/promises';

const baseUrl: string = 'https://api.esim-go.com/';

type AssociatedPlan = PlanFromDb & {
    name: string;
    quantity: number;
};

type OrderedPlan = {
    associatedPlan: AssociatedPlan;
    iccid: string;
    matchingId: string;
    smdpAddress: string;
};

export async function orderFromeSIMgo(planData: PlanFromDb[]): Promise<OrderedeSIM[]> {
    try {
        const associatedPlans = await getAssociatedPlans(planData);
        if (!associatedPlans || associatedPlans.length === 0) {
            console.error('Failed to get associated plans');
            return [];
        }
        console.log('Associated plans:', JSON.stringify(associatedPlans, null, 2));

        const orderedPlans = await validateAndOrderPlans(associatedPlans);
        if (!orderedPlans || orderedPlans.length === 0) {
            console.error('Failed to validate and order plans');
            return [];
        }
        console.log('Ordered plans:', JSON.stringify(orderedPlans, null, 2));

        const orderedESIMs = await createOrderedESIMs(orderedPlans);
        console.log('Ordered eSIMs:', JSON.stringify(orderedESIMs, null, 2));

        return orderedESIMs;
    } catch (error) {
        console.error('Error in orderFromeSIMgo:', error);
        return [];
    }
}

async function getAssociatedPlans(planData: PlanFromDb[]): Promise<AssociatedPlan[]> {
    const eSIMgoKey = process.env.ESIM_GO_API_KEY;
    if (!eSIMgoKey) {
        console.error('ESIM_GO_API_KEY is not set');
        return [];
    }

    const associatedPlans: AssociatedPlan[] = [];

    for (const plan of planData) {
        let isocodeToUse = plan.isocode.toUpperCase();

        if (plan.isocode.toUpperCase() === 'HI'){
            isocodeToUse = 'US-HI';
        }
        if (plan.isocode.toUpperCase() === 'CB'){
            isocodeToUse = 'RCA'
        }
        const planName = `esim_${plan.data !== 'unlimited' ? `${plan.data}GB` : 'UL'}_${plan.duracion}D_${isocodeToUse}_V2`;
        const endpoint = `${baseUrl}v2.3/catalogue/bundle/${planName}`;

        try {
            const response = await fetch(endpoint, {
                method: 'GET',
                headers: {
                    'X-API-Key': eSIMgoKey,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch plan: ${planName}`);
            }

            const data = await response.json();
            associatedPlans.push({
                ...plan,
                name: planName,
                quantity: plan.quantity
            });
        } catch (error) {
            console.error(`Error fetching plan ${planName}:`, error);
        }
    }

    return associatedPlans;
}

async function validateAndOrderPlans(associatedPlans: AssociatedPlan[]): Promise<OrderedPlan[]> {
    const eSIMgoKey = process.env.ESIM_GO_API_KEY;
    if (!eSIMgoKey) {
        console.error('ESIM_GO_API_KEY is not set');
        return [];
    }

    const orders = associatedPlans.map(plan => ({
        type: "bundle",
        item: plan.name,
        quantity: plan.quantity
    }));

    const orderInfo = {
        type: "transaction",
        assign: true,
        Order: orders
    };

    try {
        const orderData = await placeOrderWithRetry(orderInfo, eSIMgoKey);
        if (!orderData || !orderData.order || !Array.isArray(orderData.order)) {
            throw new Error('Unexpected order response structure');
        }

        const orderedPlans: OrderedPlan[] = [];

        for (const orderItem of orderData.order) {
            const associatedPlan = associatedPlans.find(ap => ap.name === orderItem.item);
            if (!associatedPlan) {
                console.warn(`No matching associated plan found for ${orderItem.item}`);
                continue;
            }

            const esimDetails = await fetchESIMDetailsWithRetry(orderData.orderReference, orderItem.quantity);
            
            for (const esim of esimDetails) {
                orderedPlans.push({
                    associatedPlan,
                    iccid: esim.iccid,
                    matchingId: esim.matchingId,
                    smdpAddress: esim.rspUrl
                });
            }
        }

        return orderedPlans;
    } catch (error) {
        console.error('Error ordering plans:', error);
        return [];
    }
}

async function placeOrderWithRetry(orderInfo: any, apiKey: string): Promise<any> {
    const endpoint = baseUrl + 'v2.4/orders';
    const MAX_ORDER_RETRIES = 5;
    const ORDER_RETRY_DELAY = 5000;

    for (let attempt = 1; attempt <= MAX_ORDER_RETRIES; attempt++) {
        try {
            console.log(`Attempt ${attempt}: Placing order...`);
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'X-API-Key': apiKey,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(orderInfo)
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
            }

            const data = await response.json();
            console.log(`Attempt ${attempt}: Order response:`, JSON.stringify(data, null, 2));

            if (data.message === "Service Unavailable") {
                throw new Error("Service Unavailable");
            }

            return data;
        } catch (error) {
            console.error(`Attempt ${attempt}: Error placing order:`, error);
            if (attempt === MAX_ORDER_RETRIES) {
                throw error;
            }
            await setTimeout(ORDER_RETRY_DELAY);
        }
    }
}

async function fetchESIMDetailsWithRetry(orderReference: string, expectedQuantity: number): Promise<any[]> {
    const MAX_RETRIES = 10;
    const RETRY_DELAY = 5000;

    const eSIMgoKey = process.env.ESIM_GO_API_KEY;
    if (!eSIMgoKey) {
        throw new Error('ESIM_GO_API_KEY is not set');
    }

    const endpoint = `${baseUrl}v2.4/esims/assignments?reference=${orderReference}`;

    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
        try {
            const response = await fetch(endpoint, {
                method: 'GET',
                headers: {
                    'X-API-Key': eSIMgoKey,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log(`Attempt ${attempt}: Fetched eSIM details:`, JSON.stringify(data, null, 2));

            if (data.length === expectedQuantity) {
                return data;
            }

            console.log(`Attempt ${attempt}: Expected ${expectedQuantity} eSIMs, but got ${data.length}. Retrying...`);
        } catch (error) {
            console.error(`Attempt ${attempt}: Error fetching eSIM details:`, error);
        }

        if (attempt < MAX_RETRIES) {
            await setTimeout(RETRY_DELAY);
        }
    }

    throw new Error(`Failed to fetch complete eSIM details after ${MAX_RETRIES} attempts`);
}

async function createOrderedESIMs(orderedPlans: OrderedPlan[]): Promise<OrderedeSIM[]> {
    const orderedESIMs: OrderedeSIM[] = [];

    for (const op of orderedPlans) {
        try {
            const accessCodeAndroid = 'LPA:1$' + op.smdpAddress + '$' + op.matchingId 

            const orderedESIM: OrderedeSIM = {
                orderNo: BigInt(Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)).toString(),
                regionName: op.associatedPlan.region_nombre,
                data: op.associatedPlan.data === 'unlimited' ? 'Datos Ilimitados' : `${op.associatedPlan.data}GB`,
                salePrice: op.associatedPlan.precio,
                qrCodeUrl: accessCodeAndroid,
                totalDuration: parseInt(op.associatedPlan.duracion),
                smdpAddress: op.smdpAddress,
                accessCodeIos: op.matchingId,
                accessCodeAndroid: accessCodeAndroid,
            };

            orderedESIMs.push(orderedESIM);
        } catch (error) {
            console.error('Error creating OrderedESIM:', error);
        }
    }

    return orderedESIMs;
}