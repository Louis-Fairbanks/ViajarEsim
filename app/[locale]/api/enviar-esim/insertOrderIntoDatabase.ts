import { Pool, PoolClient } from 'pg';
import { NextResponse } from 'next/server';
import { Stripe } from 'stripe';
import { PlanData } from '@/app/[locale]/components/Types/TPlanData';
import { PlanDataWithIdFromPlanesPedidos } from '@/app/[locale]/components/Types/TPlanDataWithIdFromPlanesPedidos';

const ENDPOINT_URL = process.env.PAYPAL_ENVIRONMENT === 'production'
    ? 'https://api-m.paypal.com/'
    : 'https://api-m.sandbox.paypal.com/';
const CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ?? '';
const CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET ?? '';

type OrderData = {
    nombre: string;
    apellido: string;
    correo: string;
    celular: string;
    paymentIdentifyingInformation: {
        processor: 'Stripe' | 'PayPal';
        identifier: string
    };
    planes: PlanData[];
}

interface AccessTokenResponse {
    access_token: string;
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);


export async function insertOrderIntoDatabase(orderData: OrderData, pool: Pool): Promise<{ orderId: number, plans: PlanDataWithIdFromPlanesPedidos[] } | NextResponse> {
    let client: PoolClient | null = null;
    try {
        // Verify payment first
        if (orderData.paymentIdentifyingInformation.processor === 'Stripe') {
            const paymentIntent = await stripe.paymentIntents.retrieve(orderData.paymentIdentifyingInformation.identifier);
            if (paymentIntent.status !== 'succeeded') {
                return NextResponse.json({ message: 'Payment intent not found or not succeeded' }, { status: 400 });
            }
        } else if (orderData.paymentIdentifyingInformation.processor === 'PayPal') {
            const isOrderValid = await verifyPayPalOrder(orderData.paymentIdentifyingInformation.identifier);
            if (!isOrderValid) {
                return NextResponse.json({ message: 'PayPal order not found or not completed' }, { status: 400 });
            }
        }

        // Start transaction
        client = await pool.connect();
        await client.query('BEGIN');

        // Insert order with all fields and if there is a conflict on the unique constraint of payment intent then abort the transaction
        // If successful this will return the id of the inserted order (pedido)
        const insertedOrder = await client.query(`
        INSERT INTO pedidos (payment_intent, nombre, apellido, correo, celular, exitoso)
        VALUES ($1, $2, $3, $4, $5, false)
        ON CONFLICT (payment_intent) DO NOTHING
        RETURNING id
    `, [orderData.paymentIdentifyingInformation.identifier, orderData.nombre, orderData.apellido, orderData.correo, orderData.celular]);

        if (insertedOrder.rows.length === 0) {
            await client.query('ROLLBACK');
            return NextResponse.json({ message: 'Order already exists' }, { status: 409 });
        }

        //get the id of the order
        const orderId = insertedOrder.rows[0].id;

        const plansWithIds: PlanDataWithIdFromPlanesPedidos[] = [];

        //for each plan of the array of ordered plans, insert the orderId we just got at the related order, then insert the plans id and the amount purchased
        //return the id of the inserted plan. Plans with a quantity of greater than one will have multiple entries in the planes_pedidos table
        //the purpose of this is to associate the bought plans with the id of the order
        //the planes_pedidos is essentially the list of every plan that any customer has bought
        for (const plan of orderData.planes) {
            //this will insert a plan for each quantity of the plan so we don't need to track quantity any more
            for (let i = 0; i < plan.quantity; i++) {
                const insertedPlanPedido = await client.query(`
            INSERT INTO planes_pedidos (pedido_id, plan_id)
            VALUES ($1, $2)
            RETURNING id`, [orderId, plan.id])

        //return the plans information with its associated id in the planes_pedidos
            plansWithIds.push({
                ...plan,
                planesPedidosId: insertedPlanPedido.rows[0].id
            });
            }
            ;
        }

        await client.query('COMMIT');

        return { orderId, plans: plansWithIds };
    } catch (err) {
        await client?.query('ROLLBACK');
        console.error('Error inserting order:', err);
        return NextResponse.json({ message: 'Error inserting order' }, { status: 500 });
    } finally {
        client?.release();
    }
}

//gets the paypal access token
async function getAccessToken(): Promise<string> {
    const auth = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');
    const response = await fetch(`${ENDPOINT_URL}v1/oauth2/token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Basic ${auth}`
        },
        body: 'grant_type=client_credentials'
    });

    if (!response.ok) {
        throw new Error(`Failed to get access token: ${response.statusText}`);
    }

    const data: AccessTokenResponse = await response.json();
    return data.access_token;
}


//verifies that the paypal order is real so people don't spam the system
async function verifyPayPalOrder(orderId: string): Promise<boolean> {
    try {
        const accessToken = await getAccessToken();
        const response = await fetch(`${ENDPOINT_URL}v2/checkout/orders/${orderId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to verify PayPal order: ${response.statusText}`);
        }

        const orderData = await response.json();
        return orderData.status === 'COMPLETED';
    } catch (error) {
        console.error('Error verifying PayPal order:', error);
        return false;
    }
}