import { Pool, PoolClient } from 'pg';
import { NextResponse } from 'next/server';
import { Stripe } from 'stripe';

const ENDPOINT_URL = process.env.PAYPAL_ENVIRONMENT === 'production' 
  ? 'https://api-m.paypal.com/' 
  : 'https://api-m.sandbox.paypal.com/';
const CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ?? '';
const CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET ?? '';

type PlanData = {
    id: number;
    quantity: number;
}

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


export async function insertOrderIntoDatabase(orderData: OrderData, pool: Pool): Promise<number | NextResponse> {
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

        // Insert order
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

        const orderId = insertedOrder.rows[0].id;

        // Insert order details
        const values = orderData.planes.map(plan => `(${orderId}, ${plan.id}, ${plan.quantity})`).join(', ');
        await client.query(`
            INSERT INTO ordenes_pedidos (pedido_id, plan_id, cantidad)
            VALUES ${values}
        `);

        // Commit transaction
        await client.query('COMMIT');

        return orderId;
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