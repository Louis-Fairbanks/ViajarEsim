
import crypto from 'crypto';
import { NextRequest, NextResponse } from 'next/server';

const merchantId = process.env.CRYPTOMUS_MERCHANT_ID ?? '';
const cryptomusKey = process.env.CRYPTOMUS_API_KEY ?? '';

export async function POST(req: NextRequest) {
    const bodyData = await req.json();
    const { order_id } = bodyData  

    if (!order_id) {
        return NextResponse.json({message : 'send the uuid'}, {status : 500})
    }
    const jsonData = JSON.stringify({order_id : order_id});
    const base64Data = Buffer.from(jsonData).toString('base64');
    const sign = crypto.createHash('md5').update(base64Data + cryptomusKey).digest('hex');


    try {
        const response = await fetch('https://api.cryptomus.com/v1/payment/info', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'merchant': merchantId,
                'sign': sign,
            },
            body: jsonData,
        });

        if (!response.ok) {
            throw new Error('Failed to fetch payment info');
        }

        const paymentInfo = await response.json();
        return NextResponse.json({paymentInfo : paymentInfo}, {status : 200})
    } catch (error) {
        console.error('Error checking Cryptomus payment status:', error);
        return NextResponse.json({message : 'Error checking payment status'}, { status : 500})
    }
}