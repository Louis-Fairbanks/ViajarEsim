import { NextRequest, NextResponse } from "next/server";
import crypto from 'crypto';

const cryptomusKey = process.env.CRYPTOMUS_API_KEY ?? '';

export async function POST(request: NextRequest) {
    // Get the raw body data and the sign from the header
    const rawBody = await request.text();
    const receivedSign = request.headers.get('sign');

    if (!receivedSign) {
        return NextResponse.json({ message: 'Missing signature' }, { status: 400 });
    }

    try {
        // Parse the raw body as JSON
        const jsonData = JSON.parse(rawBody);

        // Create the base64 encoded string
        const base64Data = Buffer.from(rawBody).toString('base64');

        // Create the hash
        const calculatedSign = crypto.createHash('md5')
            .update(base64Data + cryptomusKey)
            .digest('hex');

        // Compare the calculated hash with the received sign
        if (calculatedSign !== receivedSign) {
            return NextResponse.json({ message: 'Invalid signature' }, { status: 400 });
        }

        // If we reach here, the signature is valid
        console.log('Validated webhook payload:', jsonData);

        // Process the webhook data here
        // ...

        return NextResponse.json({ message: 'Webhook validated and processed!' }, { status: 200 });
    } catch (error) {
        console.error('Error processing webhook:', error);
        return NextResponse.json({ message: 'Error processing webhook' }, { status: 500 });
    }
}