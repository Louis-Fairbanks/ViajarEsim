import pg, { QueryResultRow } from 'pg';
import { PlanFromDb } from '@/app/components/Types/PlanFromDb';
import formData from 'form-data';
import Mailgun from 'mailgun.js';
import { orderFromeSIMAccess } from './orderFromeSIMAccess';
import { cache } from 'react';
import { orderFromMicroesim } from './orderFromMiscroesim';
import { orderFromeSIMgo } from './orderFromeSIMgo';
import { NextResponse } from 'next/server';
import { checkPaymentIntent } from './checkPaymentIntent';
import { insertOrderIntoDatabase } from './insertOrderIntoDatabase';
import { orderFromeSIMCard } from './orderFromeSIMCard';

const { Pool } = pg;
const pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
    ssl: {
        rejectUnauthorized: false
    }
})

type PlanData = {
    id: number;
    quantity: number;
}

type OrderedeSIM = {
    orderNo: string,
    iccid: string,
    qrCodeUrl: string,
    totalDuration: number
    accessCode: string
}

//debouncing
const purchaseCache = new Map<string, { timestamp: number, processing: boolean }>();

const DEBOUNCE_TIME = 5000; // 5 seconds debounce time

const debouncedPurchase = cache(async (cacheKey: string, planesData: PlanData[], paymentIntent : string) => {
    const now = Date.now();
    const cached = purchaseCache.get(cacheKey);

    if (cached && now - cached.timestamp < DEBOUNCE_TIME) {
        if (cached.processing) {
            return { message: 'Purchase is already being processed' };
        }
        return { message: 'Purchase was recently processed' };
    }

    purchaseCache.set(cacheKey, { timestamp: now, processing: true });

    try {
        //check if paymentIntent is already in the database
        const paymentIntentExists = await checkPaymentIntent(paymentIntent, pool);
        if(!paymentIntentExists){
            throw new Error('Payment is a duplicate, not proceeding with purchase');
        }

        //THIS IS COMMENTED OUT FOR TESTING PURPOSES TO BE ABLE TO TEST THE REST OF THE FUNCTIONALITY
        //THIS IS A GOOD QUERY TO HAVE FOR ATENCION AL CLIENTE
        // SELECT * FROM pedidos INNER JOIN ordenes_pedidos ON pedidos.id = pedido_id INNER JOIN planes ON planes.id = plan_id;
        //REMEMBER TO SET THE ORDER AS SUCCESSFUL IN THE DATABASE ONCE ITS COMPLETED
        // let insertedOrderIdPlus10000 = await insertOrderIntoDatabase({nombre: userFirstName, apellido: userLastName, correo: userEmail, paymentIntent, planes: planesData}, pool);
        // if(!insertedOrderIdPlus10000 || insertedOrderIdPlus10000 instanceof Response){
        //     throw new Error('Error inserting order into database');
        // }
        // let orderId = insertedOrderIdPlus10000 + 10000;
        // console.log('The order id of the new order is' + orderId);

        const plansArray = await getRequestedPlans(planesData);
        //something went wrong querying the plnas from the database
        if (!Array.isArray(plansArray)) {
            throw new Error('getRequestedPlans did not return an array');
        }

        //order the plans based on the provider
        const orderedESIMsData = await orderBasedOnProvider(plansArray);
        if(!orderedESIMsData || orderedESIMsData instanceof Response){
            throw new Error('Error ordering based on provider');
        }
        //if everything works out then you can send the email
        else{
            console.log('We got the orderedESIMsData')
            console.log(orderedESIMsData)
            sendEmail(orderedESIMsData);    
        }

        purchaseCache.set(cacheKey, { timestamp: now, processing: false });
        return { message: 'Purchase processed successfully' };
    } catch (error) {
        purchaseCache.delete(cacheKey);
        throw error;
    }
});

let userFirstName : string;
let userLastName : string;
let userEmail : string;
let paymentIntent : string;

export async function POST(request: Request) {

    try {
        const requestData = await request.json();
        userFirstName = requestData.nombre;
        userLastName = requestData.apellido;
        userEmail = requestData.correo;
        paymentIntent = requestData.paymentIntent;

        const planesData = requestData.planes.split(',').map((plan: string) => {
            const [id, quantity] = plan.split(':').map(Number);
            return { id, quantity };
        });

        const cacheKey = JSON.stringify(planesData);
        const result = await debouncedPurchase(cacheKey, planesData, paymentIntent);

        return NextResponse.json(result);
    } catch (error) {
        console.error('Error processing purchase:', error);
        return NextResponse.json({ message: 'An error occurred while processing the purchase' });
    }
}


async function getRequestedPlans(planesData: PlanData[]): Promise<PlanFromDb[] | Response | undefined> {
    let client;
    try {
        client = await pool.connect();
        let rows: QueryResultRow[];

        ({ rows } = await client.query(`SELECT "plan_id", "data", "duracion", "proveedor", "region_isocode"
         FROM planes_regiones WHERE plan_id = ANY($1::int[])`, [planesData.map(plan => plan.id)]));

        if (rows.length === 0) {
            return NextResponse.json({ message: 'No se encontraron planes' })
        }
        else {
            return rows.map(row => {
                const planData = planesData.find(plan => plan.id === row.plan_id);
                return {
                    ...row,
                    quantity: planData ? planData.quantity : 0
                } as PlanFromDb;
            });
        }
    } catch (err) {
        console.error(err)
    } finally {
        client?.release();
    }
}

async function orderBasedOnProvider(planData: PlanFromDb[]): Promise<OrderedeSIM[] | NextResponse | undefined> {
    // Group plans by provider
    console.log(planData)
    const groupedPlans = planData.reduce((groups, plan) => {
        const key = plan.proveedor;
        if (!groups[key]) {
            groups[key] = [];
        }
        groups[key].push(plan);
        return groups;
    }, {} as Record<string, PlanFromDb[]>);

    // Iterate over each provider and make one orderFrom call
    // If they've ordered from different providers then the results need to be combined
    for (const provider in groupedPlans) {
        if (provider === 'eSIMaccess') {
            const orderedESIMsData = await orderFromeSIMAccess(groupedPlans[provider]);
            // if(!orderedESIMsData){
            //     console.error('Error ordering from eSIMaccess');
            //     return;
            // }
            // else return orderedESIMsData;
        }
        else if (provider === 'eSIMcard') {
          orderFromeSIMCard();
        }
        else if (provider === 'eSIMgo') {
            orderFromeSIMgo(groupedPlans[provider]);
            let array : OrderedeSIM[] = [];
            return array
        }
        else if (provider === 'microesim') {
            orderFromMicroesim(groupedPlans[provider]);
            let array : OrderedeSIM[] = [];
            return array
        }
    }
}

function sendEmail(orderedeSIMs: OrderedeSIM[]) {
    const mailgunAPIKey = process.env.MAILGUN_API_KEY;
    if (!mailgunAPIKey) {
        console.log('mailgunAPIKey is not set');
    }
    else {
        const mailgun = new Mailgun(formData);
        const mg = mailgun.client({
            username: 'api',
            key: mailgunAPIKey
        });

        orderedeSIMs.forEach(orderedeSIM => {
            const subject = `Gracias por comprar con ViajareSIM, ${userFirstName} ${userLastName}`;
            const text = `Hola ${userFirstName} ${userLastName},\n\nGracias por tu compra. Tu eSIM ha sido ordenada con éxito. Tu número de orden es ${orderedeSIM.orderNo}. Tu eSIM estará disponible en tu correo electrónico ${userEmail}.\n\nSaludos,\nEl equipo de ViajareSIM`;
            const html = `<p>Hola ${userFirstName} ${userLastName},</p><p>Gracias por tu compra. Tu eSIM ha sido ordenada con éxito. Tu número de orden es ${orderedeSIM.orderNo}. Escanea este código para activar tu eSIM <img src=${orderedeSIM.qrCodeUrl}/> Tu eSIM estará disponible en tu correo electrónico ${userEmail}.</p><p>Saludos,</p><p>El equipo de ViajareSIM</p>`;

            mg.messages.create('viajaresim.com', {
                from: "ViajareSIM <noreply@viajaresim.com>",
                to: [userEmail],
                subject: subject,
                text: text,
                html: html
            })
                .then(msg => console.log(msg)) // logs NextResponse data
                .catch(err => console.log(err)); // logs any error
        });
    }
}