import { Pool } from 'pg';
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


export async function insertOrderIntoDatabase(orderData: OrderData, pool: Pool): Promise<number | NextResponse | undefined> {
    let client;
    let rowId: number = 0;



    try {
        if (orderData.paymentIdentifyingInformation.processor === 'Stripe') {
            const paymentIntent = await stripe.paymentIntents.retrieve(orderData.paymentIdentifyingInformation.identifier);
            if (paymentIntent.status != 'succeeded') {
                return NextResponse.json({ message: 'Payment intent not found, due not proceed' })
            }
        }
        else if (orderData.paymentIdentifyingInformation.processor === 'PayPal') {
            const isOrderValid = await verifyPayPalOrder(orderData.paymentIdentifyingInformation.identifier);
            if (!isOrderValid) {
                return NextResponse.json({ message: 'PayPal order not found or not completed' });
            }
        }


        client = await pool.connect();
        const insertedOrder = await client.query(`INSERT INTO pedidos (payment_intent, nombre, apellido, correo, celular, exitoso)
        VALUES ($1, $2, $3, $4, $5, false) RETURNING id`, [orderData.paymentIdentifyingInformation.identifier, orderData.nombre, orderData.apellido, orderData.correo, orderData.celular]);
        if (insertedOrder.rows.length === 0) {
            return NextResponse.json({ message: 'No se pudo insertar el pedido' })
        }
        else {
            rowId = insertedOrder.rows[0].id;
            const values = orderData.planes.map(plan => `(${rowId}, ${plan.id}, ${plan.quantity})`).join(', ');
            const insertedRows = await client.query(`INSERT INTO ordenes_pedidos (pedido_id, plan_id, cantidad) VALUES ${values}`);
            if (insertedRows.rowCount !== orderData.planes.length) {
                return NextResponse.json({ message: 'No se pudieron insertar los planes' })
            }
        }
    } catch (err) {
        console.log(err)
    }
    finally {
        client?.release();
        return rowId;
    }
}

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