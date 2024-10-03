import pg, { QueryResultRow } from 'pg';
import { PlanFromDb } from '@/app/[locale]/components/Types/PlanFromDb';
import { orderFromeSIMAccess } from './orderFromeSIMAccess';
import { cache } from 'react';
import { orderFromMicroesim } from './orderFromMiscroesim';
import { orderFromeSIMgo } from './orderFromeSIMgo';
import { NextResponse } from 'next/server';
import { insertOrderIntoDatabase } from './insertOrderIntoDatabase';
import { orderFromeSIMCard } from './orderFromeSIMCard';
import { EmailInformation } from '@/app/[locale]/components/Types/TEmailInformation';
import { sendOrderEmail } from './sendOrderEmail';
import { sendPaymentConfirmationEmail } from './sendPaymentConfirmationEmail';
import { PaymentEmailInformation } from '@/app/[locale]/components/Types/TPaymentEmailInformation';
import { PlanPricingInfo } from '@/app/[locale]/components/Types/TPlanPricingInfo';
import { OrderedeSIM } from '@/app/[locale]/components/Types/TOrderedEsim';
import { setPurchaseAsSuccessful } from './setPurchaseAsSuccessful';
import { sendOrderConfirmedEmailToOwner } from './sendOrderConfirmedEmailToOwner';
import { PlanData } from '@/app/[locale]/components/Types/TPlanData';
import { PlanDataWithIdFromPlanesPedidos } from '@/app/[locale]/components/Types/TPlanDataWithIdFromPlanesPedidos';
import { addICCIDsToOrder } from './addICCIDsToOrder';
import { findDiscountFromDatabase } from './findDiscountFromDatabase';

const { Pool } = pg;
const pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
    ssl: {
        rejectUnauthorized: false
    }
})


let orderId: number;

type paymentIdentifyingInformation = {
    processor: 'Stripe' | 'PayPal';
    identifier: string
}

//debouncing
const purchaseCache = new Map<string, { timestamp: number, processing: boolean }>();

const DEBOUNCE_TIME = 5000; // 5 seconds debounce time

const debouncedPurchase = cache(async (cacheKey: string, planesData: PlanData[], paymentIntent: string, paypalOrderId: string) => {
    const now = Date.now();
    const cached = purchaseCache.get(cacheKey);
    const paymentIdentifyingInformation: paymentIdentifyingInformation = {
        processor: paymentIntent === '' ? 'PayPal' : 'Stripe',
        identifier: paymentIntent === '' ? paypalOrderId : paymentIntent
    }

    if (cached && now - cached.timestamp < DEBOUNCE_TIME) {
        if (cached.processing) {
            return { message: 'Purchase is already being processed' };
        }
        return { message: 'Purchase was recently processed' };
    }

    purchaseCache.set(cacheKey, { timestamp: now, processing: true });

    try {
        // Check if paymentIntent is already in the database and verify stripe or paypal payment intent
        let insertResult = await insertOrderIntoDatabase({
            nombre: userFirstName,
            apellido: userLastName,
            correo: userEmail,
            celular: userPhoneNumber,
            paymentIdentifyingInformation, //this is the stripe or paypal payment intent
            planes: planesData
        }, pool);

        //if something went wrong there will be a big problem
        if (!insertResult || insertResult instanceof NextResponse) {
            throw new Error('Failed to insert order into database');
        }

        //otherwise add 100000 to the order to make it seem like we sell a lot more than we do
        //the insertResult will be necessary later because it has the ids from the planes_id database where we will need to associate each iccid
        orderId = insertResult.orderId + 1000000;
        console.log(`New order created with ID: ${orderId}`);

        //now we can identify the right plans from the database. 
        //we basically search by the ids of all of the plans and then add the 
        //need to pass through the planes_id at all stages because we need to associate the iccids with each planes_id in the planes_pedidos table
        const plansArray = await getRequestedPlans(insertResult.plans);
        if (!Array.isArray(plansArray)) {
            throw new Error('Failed to retrieve requested plans from database');
        }
        //if its not an array then it would have failed by now so we know we have an array of plans and their quantities
        //we can use this to order the eSIMs from the providers
        //the plansArray will contain one PlanFromDb object for each plan that was ordered, with its associated id from the planes_pedidos table
        const orderedESIMsData = await orderBasedOnProvider(plansArray);
        if (!orderedESIMsData || orderedESIMsData instanceof Response) {
            throw new Error('Failed to order eSIMs from providers');
        }

        //now we have to add the iccids to the order
        for (const esim of orderedESIMsData) {
            await addICCIDsToOrder(esim.pedidos_planes_id, esim.iccid, pool);
        }

        let totalDespuesDeDescuento = await sendEmails(orderedESIMsData);
        if(!totalDespuesDeDescuento){
            console.log('Total despues de descuento was not calculated correctly')
            totalDespuesDeDescuento = 0;
        }

        purchaseCache.set(cacheKey, { timestamp: now, processing: false });
        const originalOrderId = orderId - 1000000;
        
        let descuentoId =  await findDiscountFromDatabase(discountApplied.name, pool)
        if (descuentoId === null){
            descuentoId = 0;
        }
        console.log('totalDespuesDeDescuento right now is ' + totalDespuesDeDescuento);
        const setOrderAsSuccessful = await setPurchaseAsSuccessful({
             orderId : originalOrderId.toString(),
             enlace_afiliado : affiliateLinkId, 
             total : totalDespuesDeDescuento,
             descuento_aplicado : descuentoId, 
             pool});
        if (!setOrderAsSuccessful) {
            throw new Error(`Failed to set order ${originalOrderId} as successful`);
        }
        return { message: 'Purchase processed successfully', orderId: orderId };
    } catch (error) {
        purchaseCache.delete(cacheKey);
        console.error('Error in debouncedPurchase:', error);
        throw error;
    }
});

let userFirstName: string;
let userLastName: string;
let userEmail: string;
let userPhoneNumber: string;
let paymentIntent: string = '';
let paypalOrderId: string = '';
let userLocale: string;
let discountApplied: {
    name: string,
    discountPercentage: number
};
let affiliateLinkId : number = 0;

export async function POST(request: Request) {
    console.log('POST function called');
    try {
        console.log('Parsing request body');
        const requestData = await request.json();
        console.log('Request data:', JSON.stringify(requestData, null, 2));

        //get cookie from headers if the purchase was made via a referral from an affiliate
        const cookies = request.headers.get('cookie')
        
        if (cookies){
            const cookieObj = Object.fromEntries(cookies.split('; ').map(c => c.split('=')))
            affiliateLinkId = cookieObj['affiliate_link_id']
        }

        //get the relevant information from the post request for inserting into the database and sending emails
        console.log('Extracting user information');
        userFirstName = requestData.nombre;
        userLastName = requestData.apellido;
        userEmail = requestData.correo;
        userPhoneNumber = requestData.celular;
        paymentIntent = requestData.paymentIntent || '';
        paypalOrderId = requestData.paypalOrderId || '';
        userLocale = requestData.locale

        console.log('Extracted user information:', { userFirstName, userLastName, userEmail, userPhoneNumber, paymentIntent, paypalOrderId });

        console.log('Processing discount information');
        const discountAppliedParts = requestData.descuentoAplicado.split(':');
        discountApplied = {
            name: discountAppliedParts[0] === 'undefined' ? 'Ninguno' : discountAppliedParts[0],
            discountPercentage: discountAppliedParts[1] === 'undefined' ? 0 : Number(discountAppliedParts[1])
        };
        console.log('Discount applied:', discountApplied);

        console.log('Processing plan data');
        const planesData = requestData.planes.split(',').map((plan: string) => {
            const [id, quantity] = plan.split(':').map(Number);
            return { id, quantity };
        });
        console.log('Processed plan data:', planesData);

        const cacheKey = JSON.stringify(planesData);
        console.log('Cache key:', cacheKey);

        console.log('Calling debouncedPurchase');
        const result = await debouncedPurchase(cacheKey, planesData, paymentIntent, paypalOrderId);
        console.log('debouncedPurchase result:', result);

        console.log('Purchase successful, returning response');
        return NextResponse.json({ purchaseSuccessful: true, orderId: orderId });
    } catch (error) {
        console.error('Error in POST function:', error);
        console.error('Error stack:', error);
        return NextResponse.json({
            message: 'An error occurred while processing the purchase',
            error: error
        }, { status: 500 });
    }
}


async function getRequestedPlans(planesData: PlanDataWithIdFromPlanesPedidos[]): Promise<PlanFromDb[] | Response | undefined> {
    let client;
    try {
        client = await pool.connect();
        let rows: QueryResultRow[];

        ({ rows } = await client.query(`
            SELECT 
                planes.id as plan_id, 
                data, 
                duracion, 
                proveedor, 
                isocode, 
                precio, 
                regiones.nombre as region_nombre,
                unnest($2::int[]) as planes_pedidos_id
            FROM planes 
            INNER JOIN regiones ON planes.region_id = regiones.id 
            WHERE planes.id = ANY($1::int[])
        `, [
            planesData.map(plan => plan.id),
            planesData.map(plan => plan.planesPedidosId)
        ]));

        if (rows.length === 0) {
            return NextResponse.json({ message: 'No se encontraron planes' }, { status: 404 });
        } else {
            return rows.map(row => ({
                plan_id: row.plan_id,
                data: row.data,
                duracion: row.duracion,
                proveedor: row.proveedor,
                isocode: row.isocode,
                precio: parseFloat(row.precio),
                planes_pedidos_id: row.planes_pedidos_id,
                region_nombre: row.region_nombre
            } as PlanFromDb));
        }
    } catch (err) {
        console.error(err);
        return NextResponse.json({ message: 'Error al obtener los planes' }, { status: 500 });
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

async function sendEmails(orderedeSIMs: OrderedeSIM[]) : Promise<number | undefined> {
    let planPricingInfo: PlanPricingInfo[] = [];
    const totalPagado = orderedeSIMs.reduce((total, esim) => total + Number(esim.salePrice), 0);
    //hay que crear un objeto de EmailInformation por cada eSIM que fue comprada
    const emailPromises = orderedeSIMs.map(individualEsim => {

        //esto es para crear los line items para el email de confirmacion de pago
        const planInfo: PlanPricingInfo = {
            regionName: individualEsim.regionName,
            duration: individualEsim.totalDuration.toString(),
            salePrice: individualEsim.salePrice,
            data: individualEsim.data,
            iccid: individualEsim.iccid
        }
        planPricingInfo.push(planInfo)

        //esto es para mandar el esim por email
        const emailInformation: EmailInformation = {
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
            activationCodeAndroid: individualEsim.accessCodeAndroid, //ejemplo LPA:1$ecprsp.eastcompeace.com$40AAA23E893C4CFBB4679688413FFD07
            iccid: individualEsim.iccid
        }
        //pasar la info al sendOrderEmail function para mandar un correo por cada eSIM
        return sendOrderEmail(emailInformation, userLocale);
    })

    //esperar
    await Promise.all(emailPromises);

    let appliedDiscount: number = 0;
    let totalDespuesDeDescuento : number = 0;

    
    if (discountApplied.name === 'Ninguno' || discountApplied.discountPercentage === 0) {
        appliedDiscount = 0;
        totalDespuesDeDescuento = totalPagado;
        console.log('no discount was applied, the total is ' + totalPagado);
    }
    else {
        appliedDiscount = totalPagado * (discountApplied.discountPercentage / 100);
        totalDespuesDeDescuento = totalPagado - appliedDiscount;
        console.log('a discount was applied of ' + appliedDiscount + ' the total is ' + totalDespuesDeDescuento);
    }
    console.log('discount applied is ' + appliedDiscount);
    const paymentEmailInformation: PaymentEmailInformation = {
        orderNumber: orderId.toString(), //podemos usar un numero cualquiera por ahora capaz generado por uuid
        firstName: userFirstName,
        lastName: userLastName,
        email: userEmail,
        paymentMethod: paymentIntent === '' ? 'PayPal' : 'Tarjeta de crédito/débito', //si no hay payment intent entonces fue paypal
        total: Number(totalDespuesDeDescuento).toFixed(2).replace('.', ','),  //total de la compra
        datePaid: new Date().toLocaleDateString('es-419', { year: 'numeric', month: '2-digit', day: '2-digit' }), //fecha en la que se hizo la compra
        purchasedPlans: planPricingInfo, //array de objetos con la info de cada plan
        appliedDiscount: Number(appliedDiscount).toFixed(2).replace('.', ',') //descuento aplicado 0 por ahora hasta que se implemente
    }

    //despues hay que mandar un email de confirmacion de pago
    const success = await sendPaymentConfirmationEmail(paymentEmailInformation, userLocale);
    const orderSentToOwners = await sendOrderConfirmedEmailToOwner(paymentEmailInformation, userPhoneNumber);

    if (!success) {
        console.error('Error mandando cosas');
        return undefined;
    }
    else {
        console.log('Emails sent successfully');
        return totalDespuesDeDescuento
    }
}