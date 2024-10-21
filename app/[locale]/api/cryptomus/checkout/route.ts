import { NextRequest, NextResponse } from "next/server";
import crypto from 'crypto';

const merchantId = process.env.CRYPTOMUS_MERCHANT_ID ?? '';
const cryptomusKey = process.env.CRYPTOMUS_API_KEY ?? '';
const cryptomusUuid = process.env.CRYPTOMUS_UUID ?? '';

export async function POST(request: NextRequest) {
    const bodyData = await request.json();
    const { amount, currency, network, to_currency } = bodyData;
    const orderId = 'crypto' + crypto.randomBytes(12).toString('hex');

    const data = {
        amount: amount.toString(),
        currency,
        order_id: orderId,
        network,
        to_currency,
        url_callback: 'https://viajaresim.com/api/cryptomus/callback'
    };

    const jsonData = JSON.stringify(data);
    const base64Data = Buffer.from(jsonData).toString('base64');
    const sign = crypto.createHash('md5').update(base64Data + cryptomusKey).digest('hex');

    const res = await fetch('https://api.cryptomus.com/v1/payment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'merchant': merchantId,
            'sign': sign,
        },
        body: jsonData
    });

    if (!res.ok) {
        return NextResponse.json({ message: 'Unable to create cryptomus order' }, { status: 500 })
    }
    else {
        const responseData = await res.json();
        return NextResponse.json({ data: responseData });
    }
}