import pg, { QueryResultRow } from 'pg';
import { PlanFromDb } from '@/app/components/Types/PlanFromDb';
import { orderFromeSIMAccess } from './orderFromeSIMAccess';
import { cache } from 'react';
import { orderFromMicroesim } from './orderFromMiscroesim';
import { orderFromeSIMgo } from './orderFromeSIMgo';
import { NextResponse } from 'next/server';
import { checkPaymentIntent } from './checkPaymentIntent';
import { insertOrderIntoDatabase } from './insertOrderIntoDatabase';
import { orderFromeSIMCard } from './orderFromeSIMCard';
import { EmailInformation } from '@/app/components/Types/TEmailInformation';
import { sendOrderEmail } from './sendOrderEmail';
import { sendPaymentConfirmationEmail } from './sendPaymentConfirmationEmail';
import { PaymentEmailInformation } from '@/app/components/Types/TPaymentEmailInformation';
import { PlanPricingInfo } from '@/app/components/Types/TPlanPricingInfo';
import { OrderedeSIM } from '@/app/components/Types/TOrderedEsim';

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
        
        //sumar 10000 a cada id de pedido para que se vea como que vendemos mas de lo que vendemos
        let insertedOrderIdPlus10000 = await insertOrderIntoDatabase({nombre: userFirstName, apellido: userLastName, correo: userEmail, paymentIntent, planes: planesData}, pool);
        if(!insertedOrderIdPlus10000 || insertedOrderIdPlus10000 instanceof Response){
            throw new Error('Error inserting order into database');
        }
        let orderId = insertedOrderIdPlus10000 + 10000;
        console.log('The order id of the new order is' + orderId);

        const plansArray = await getRequestedPlans(planesData);
        //something went wrong querying the plans from the database
        if (!Array.isArray(plansArray)) {
            throw new Error('getRequestedPlans did not return an array');
        }

        //if we got the plans back from the database, order the plans based on the provider
        const orderedESIMsData = await orderBasedOnProvider(plansArray);
        if(!orderedESIMsData || orderedESIMsData instanceof Response){
            throw new Error('Error ordering based on provider');
        }
        //si todo sale bien podemos iterar por cada eSIM que fue comprada y llamar sendEmail para cada uno
        else{
            console.log('We got the orderedESIMsData')

            console.log(orderedESIMsData)
            //esto toma como parametro un array de objetos con la informacion de cada eSIM
            sendEmails(orderedESIMsData);    
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

        //split data plan id and quantity from request and map it to objects
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

        ({ rows } = await client.query(`SELECT "plan_id", "data", "duracion", "proveedor", "region_isocode", "precio",
         FROM planes_regiones WHERE plan_id = ANY($1::int[])`, [planesData.map(plan => plan.id)]));

        if (rows.length === 0) {
            return NextResponse.json({ message: 'No se encontraron planes' })
        }
        else {
            //returns array of plans, with the quantity added to the object
            return rows.map(row => {
                // plan from db tiene la informacion asi
                // {
                //     plan_id: 36,
                //     data: 'unlimited',
                //     duracion: '1',
                //     proveedor: 'eSIMcard',
                //     region_isocode: 'sa',
                //     precio : '12.8900000'
                //   }
                const planData = planesData.find(plan => plan.id === row.plan_id);
                return {
                    ...row,
                    quantity: planData ? planData.quantity : 0 //cantidad es agregado de los parametros
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
            if(!orderedESIMsData){
                console.error('Error ordering from eSIMaccess');
                return;
            }
            // else return orderedESIMsData;
        }
        else if (provider === 'eSIMcard') {
          orderFromeSIMCard(groupedPlans[provider]);
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

async function sendEmails(orderedeSIMs: OrderedeSIM[]) {
    let planPricingInfo : PlanPricingInfo[] = [];
    let totalDeCompra : number = 0;
    //hay que crear un objeto de EmailInformation por cada eSIM que fue comprada
    const emailPromises = orderedeSIMs.map(individualEsim => {
        //esto es para crear los line items para el email de confirmacion de pago
        const planInfo : PlanPricingInfo = {
            regionName: individualEsim.regionName,
            duration: individualEsim.totalDuration.toString(),
            salePrice: individualEsim.salePrice,
            data: individualEsim.data
        }
        totalDeCompra += individualEsim.salePrice;
        planPricingInfo.push(planInfo)

        //esto es para mandar el esim por email
        const emailInformation : EmailInformation = {
            userFirstName,  //sacado desde arriba, de parametros de POST request
            userLastName,   //sacado desde arriba  de parametros de post rqeust
            orderNumber: individualEsim.orderNo,   //podemos usar un numero cualquiera por ahora
            email: userEmail,    //sacado desde arriba
            regionName: individualEsim.regionName, //
            data: individualEsim.data, // o numero dias o el string 'Datos Ilimitados'
            duration: individualEsim.totalDuration.toString(),    //duracion en dias por ejemplo: '1' or '30'
            qrcode: individualEsim.qrCodeUrl, //o un url a donde esta alojada la imagen o un buffer con la imagen
            smdpAddress: individualEsim.smdpAddress,  //ejemplo: ecprsp.eastcompeace.com
            activationCodeIos: individualEsim.accessCodeIos,   //mismo como android pero sin el $ ejemeplo 40AAA23E893C4CFBB4679688413FFD07
            activationCodeAndroid: individualEsim.accessCodeAndroid //ejemplo LPA:1$ecprsp.eastcompeace.com$40AAA23E893C4CFBB4679688413FFD07
        }
        //pasar la info al sendOrderEmail function para mandar un correo por cada eSIM
        return sendOrderEmail(emailInformation);
    })
    
    //esperar
    await Promise.all(emailPromises);

    const paymentEmailInformation : PaymentEmailInformation = {
        orderNumber: '23543241312', //podemos usar un numero cualquiera por ahora capaz generado por uuid
        firstName: userFirstName,
        lastName: userLastName,
        email: userEmail,
        total: totalDeCompra,  //total de la compra
        datePaid: new Date().toISOString(), //fecha en la que se hizo la compra
        purchasedPlans: planPricingInfo, //array de objetos con la info de cada plan
        appliedDiscount: '0' //descuento aplicado 0 por ahora hasta que se implemente
    }

    //despues hay que mandar un email de confirmacion de pago
    const success = await sendPaymentConfirmationEmail(paymentEmailInformation);

    if (!success) {
        console.error('Error mandando cosas');
    }
    else{
        console.log('Emails sent successfully');
    }
}

// type PaymentEmailInformation = {
//     orderNumber : string,
//     firstName : string,
//     lastName : string,
//     total : number,
//     datePaid : string,
//     purchasedPlans : PlanPricingInfo[]
//     appliedDiscount : string,
// }

// export type PlanPricingInfo = {
//     regionName : string,
//     duration : string,
//     salePrice : string
//     data : string
// }