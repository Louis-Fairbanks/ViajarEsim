import { PlanFromDb } from "@/app/components/Types/PlanFromDb";
import { OrderedeSIM } from "@/app/components/Types/TOrderedEsim";
import QRCode from 'qrcode';

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
        const planName = `esim_${plan.data !== 'unlimited' ? `${plan.data}GB` : 'UL'}_${plan.duracion}D_${plan.isocode.toUpperCase()}_V2`;
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

    const endpoint = baseUrl + 'v2.4/orders';
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
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'X-API-Key': eSIMgoKey,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderInfo)
        });

        if (!response.ok) {
            throw new Error('Failed to place order');
        }

        const data = await response.json();
        console.log('Order response:', JSON.stringify(data, null, 2));

        if (!data.order || !Array.isArray(data.order)) {
            throw new Error('Unexpected order response structure');
        }

        const orderedPlans: OrderedPlan[] = [];

        for (const orderItem of data.order) {
            const associatedPlan = associatedPlans.find(ap => ap.name === orderItem.item);
            if (!associatedPlan) {
                console.warn(`No matching associated plan found for ${orderItem.item}`);
                continue;
            }

            for (const esim of orderItem.esims) {
                orderedPlans.push({
                    associatedPlan,
                    iccid: esim.iccid,
                    matchingId: esim.matchingId,
                    smdpAddress: esim.smdpAddress
                });
            }
        }

        return orderedPlans;
    } catch (error) {
        console.error('Error ordering plans:', error);
        return [];
    }
}

async function createOrderedESIMs(orderedPlans: OrderedPlan[]): Promise<OrderedeSIM[]> {
    const orderedESIMs: OrderedeSIM[] = [];

    for (const op of orderedPlans) {
        try {
            const qrCodeBuffer = await QRCode.toBuffer(op.matchingId);
            const qrCodeBase64 = qrCodeBuffer.toString('base64');

            const orderedESIM: OrderedeSIM = {
                orderNo: BigInt(Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)).toString(),
                regionName: op.associatedPlan.region_nombre,
                data: op.associatedPlan.data === 'unlimited' ? 'Datos Ilimitados' : `${op.associatedPlan.data}GB`,
                salePrice: op.associatedPlan.precio,
                qrCodeUrl: `data:image/png;base64,${qrCodeBase64}`,
                totalDuration: parseInt(op.associatedPlan.duracion),
                smdpAddress: op.smdpAddress,
                accessCodeIos: op.matchingId,
                accessCodeAndroid: 'LPA:1$' + op.smdpAddress + '$' + op.matchingId,
            };

            orderedESIMs.push(orderedESIM);
        } catch (error) {
            console.error('Error creating OrderedESIM:', error);
        }
    }

    return orderedESIMs;
}