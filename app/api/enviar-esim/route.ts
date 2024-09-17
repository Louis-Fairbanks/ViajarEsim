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
import { setPurchaseAsSuccessful } from './setPurchaseAsSuccessful';
import { sendOrderConfirmedEmailToOwner } from './sendOrderConfirmedEmailToOwner';

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
let orderId : number;

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
        let insertedOrderId = await insertOrderIntoDatabase({nombre: userFirstName, apellido: userLastName, correo: userEmail, celular: userPhoneNumber, paymentIntent, planes: planesData}, pool);
        if(!insertedOrderId || insertedOrderId instanceof Response){
            throw new Error('Error inserting order into database');
        }
        orderId = insertedOrderId+ 1000000;
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
        const originalOrderId = orderId - 1000000;
        const setOrderAsSuccessful = await setPurchaseAsSuccessful(originalOrderId.toString(), pool);
        if(!setOrderAsSuccessful){
            throw new Error('Error setting order as successful');
        }
        return { message: 'Purchase processed successfully' };
    } catch (error) {
        purchaseCache.delete(cacheKey);
        throw error;
    }
});

let userFirstName : string;
let userLastName : string;
let userEmail : string;
let userPhoneNumber : string;
let paymentIntent : string;
let discountApplied : {
    name : string,
    discountPercentage : number
};


export async function POST(request: Request) {

    try {
        const requestData = await request.json();
        userFirstName = requestData.nombre;
        userLastName = requestData.apellido;
        userEmail = requestData.correo;
        userPhoneNumber = requestData.celular;
        paymentIntent = requestData.paymentIntent;
        console.log(requestData)
        const discountAppliedParts = requestData.descuentoAplicado.split(':');
        if(discountAppliedParts[0] === 'undefined' || discountAppliedParts[1] === 'undefined'){
            discountApplied = {name : 'Ninguno', discountPercentage : 0};
        }else{
            discountApplied = {name : discountAppliedParts[0], discountPercentage : Number(discountAppliedParts[1])};
        }

        //split data plan id and quantity from request and map it to objects
        const planesData = requestData.planes.split(',').map((plan: string) => {
            const [id, quantity] = plan.split(':').map(Number);
            return { id, quantity };
        });

        const cacheKey = JSON.stringify(planesData);
        const result = await debouncedPurchase(cacheKey, planesData, paymentIntent);

        return NextResponse.json({purchaseSuccessful : true, orderId : orderId});
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

        ({ rows } = await client.query(`SELECT planes.id, data, duracion, proveedor, isocode, precio, regiones.nombre as region_nombre
         FROM planes INNER JOIN regiones ON planes.region_id = regiones.id WHERE planes.id = ANY($1::int[])`, [planesData.map(plan => plan.id)]));

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
                const planData = planesData.find(plan => plan.id === row.id);
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

async function orderBasedOnProvider(planData: PlanFromDb[]): Promise<OrderedeSIM[] | NextResponse> {
    // Group plans by provider
    console.log('All plan data:', planData);
    const groupedPlans = planData.reduce((groups, plan) => {
        const key = plan.proveedor;
        if (!groups[key]) {
            groups[key] = [];
        }
        groups[key].push(plan);
        return groups;
    }, {} as Record<string, PlanFromDb[]>);

    let allOrderedESIMs: OrderedeSIM[] = [];

    // Iterate over each provider and make one orderFrom call
    for (const provider in groupedPlans) {
        console.log(`Processing orders for provider: ${provider}`);
        try {
            let orderedESIMsData: OrderedeSIM[] | undefined;

            switch (provider) {
                case 'eSIMaccess':
                    orderedESIMsData = await orderFromeSIMAccess(groupedPlans[provider]);
                    break;
                case 'eSIMcard':
                    orderedESIMsData = await orderFromeSIMCard(groupedPlans[provider]);
                    break;
                case 'eSIMgo':
                    orderedESIMsData = await orderFromeSIMgo(groupedPlans[provider]);
                    break;
                case 'microesim':
                    orderedESIMsData = await orderFromMicroesim(groupedPlans[provider]);
                    break;
                default:
                    console.warn(`Unknown provider: ${provider}`);
                    continue;
            }

            if (orderedESIMsData && orderedESIMsData.length > 0) {
                allOrderedESIMs = allOrderedESIMs.concat(orderedESIMsData);
                console.log(`Successfully ordered ${orderedESIMsData.length} eSIMs from ${provider}`);
            } else {
                console.error(`Error ordering from ${provider}: No eSIMs returned`);
            }
        } catch (error) {
            console.error(`Error processing orders for ${provider}:`, error);
        }
    }

    if (allOrderedESIMs.length === 0) {
        return NextResponse.json({ message: 'Failed to order eSIMs from any provider' });
    }

    console.log(`Total eSIMs ordered: ${allOrderedESIMs.length}`);
    return allOrderedESIMs;
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
        totalDeCompra += Number(individualEsim.salePrice);
        planPricingInfo.push(planInfo)

        //esto es para mandar el esim por email
        const emailInformation : EmailInformation = {
            userFirstName,  //sacado desde arriba, de parametros de POST request
            userLastName,   //sacado desde arriba  de parametros de post rqeust
            orderNumber: orderId.toString(),   //podemos usar un numero cualquiera por ahora
            email: userEmail,    //sacado desde arriba
            regionName: individualEsim.regionName, //
            data: individualEsim.data, // o numero gb o el string 'Datos Ilimitados'
            duration: individualEsim.totalDuration.toString(),    //duracion en dias por ejemplo: '1' or '30'
            //@ts-ignore
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

    let appliedDiscount : number = 0;
    
    if(discountApplied.name === 'Ninguno' || discountApplied.discountPercentage === 0){
        appliedDiscount = 0;
    }
    else {;
        appliedDiscount = totalDeCompra * (discountApplied.discountPercentage /100 ) //how much was taken off the total
        totalDeCompra = totalDeCompra * ((100 - discountApplied.discountPercentage) / 100);
    }
    console.log('discount applied is ' + appliedDiscount);
    const paymentEmailInformation : PaymentEmailInformation = {
        orderNumber: orderId.toString(), //podemos usar un numero cualquiera por ahora capaz generado por uuid
        firstName: userFirstName,
        lastName: userLastName,
        email: userEmail,
        total: Number(totalDeCompra).toFixed(2).replace('.', ','),  //total de la compra
        datePaid: new Date().toLocaleDateString('es-419', { year: 'numeric', month: '2-digit', day: '2-digit' }), //fecha en la que se hizo la compra
        purchasedPlans: planPricingInfo, //array de objetos con la info de cada plan
        appliedDiscount: Number(appliedDiscount).toFixed(2).replace('.', ',') //descuento aplicado 0 por ahora hasta que se implemente
    }

    //despues hay que mandar un email de confirmacion de pago
    const success = await sendPaymentConfirmationEmail(paymentEmailInformation);
    const orderSentToOwners = await sendOrderConfirmedEmailToOwner(paymentEmailInformation, userPhoneNumber);

    if (!success) {
        console.error('Error mandando cosas');
    }
    else{
        console.log('Emails sent successfully');
    }
}