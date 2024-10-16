import { NextRequest, NextResponse } from "next/server";
import crypto from 'crypto';

const merchantId = process.env.CRYPTOMUS_MERCHANT_ID ?? '';
const cryptomusKey = process.env.CRYPTOMUS_API_KEY ?? '';
const cryptomusUuid = process.env.CRYPTOMUS_UUID ?? '';

export async function POST(request: NextRequest) {
    const bodyData = await request.json();
    const { amount, currency, nombre, apellido, correo, celular, descuentoAplicado, planes } = bodyData;
    const orderId = 'crypto' + crypto.randomBytes(12).toString('hex')


    const data = {
        amount: amount.toString(),
        currency,
        order_id: orderId
    };

    const jsonData = JSON.stringify(data);
    const base64Data = Buffer.from(jsonData).toString('base64');
    const sign = crypto.createHash('md5').update(base64Data + cryptomusKey).digest('hex');

    const params = new URLSearchParams({
        nombre,
        apellido,
        correo,
        celular,
        descuentoAplicado,
        planes,
        payment_intent: orderId
    });

    const returnUrl = `https://viajaresim.com/pago-exitoso?${params.toString()}`;

    const res = await fetch('https://api.cryptomus.com/v1/payment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'merchant': merchantId,
            'sign': sign,
            'url_callback': 'https://viajaresim.com/api/callback',
            'url_return': returnUrl,  // Include the constructed return URL here
            'to_currency': currency,
            'logo_url': 'https://imagedelivery.net/VO_nfLYqcOXLb5WCIb9kZg/c6a6b8aa-f79c-405f-05cb-7669e5df7d00/chico',
            'favicon_url': 'https://imagedelivery.net/VO_nfLYqcOXLb5WCIb9kZg/c6a6b8aa-f79c-405f-05cb-7669e5df7d00/chico',
            'theme_color_main': '#E4E4E4',
            'theme_color_button': '#6C85FF',
            'theme_color_btn_text': '#FFF'
        },
        body: jsonData
    });

    const responseData = await res.json();
    console.log(responseData)

    return NextResponse.json({ data: responseData });
}