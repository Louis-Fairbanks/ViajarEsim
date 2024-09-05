import { Pool} from 'pg';
import { NextResponse } from 'next/server';

export async function checkPaymentIntent(paymentIntent: string, pool: Pool): Promise<boolean | NextResponse | undefined> {
    let client;
    let proceed: boolean = false;
    try {
        client = await pool.connect();
        const result = await client.query('SELECT id FROM pedidos WHERE payment_intent = $1', [paymentIntent]);
        if (result.rows.length === 0) {
            console.log('Payment intent not found, proceed to verify if payment intent is valid');
            proceed = true;
        }
    } catch (err) {
        console.error(err);
        return false;
    } finally {
        client?.release();
        return proceed;
    }
}