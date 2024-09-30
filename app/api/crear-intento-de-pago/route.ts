import { NextRequest, NextResponse } from "next/server";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

function getServerSideClientIp(request: NextRequest): string | null {
    return request.headers.get("CF-Connecting-IP") || 
           request.headers.get("X-Forwarded-For")?.split(',')[0] || 
           request.headers.get("X-Real-IP") ||
           null;
}

export async function POST(request: NextRequest) {
    try {
        const { amount, email, name, phone, clientIpAddress } = await request.json();

        const serverSideIp = getServerSideClientIp(request);
        const ipAddress = clientIpAddress || serverSideIp || 'Unknown';

        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: 'usd',
            metadata: {
                email: email,
                name: name,
                phone: phone,
                ip_address: ipAddress,
                ip_source: clientIpAddress ? 'client' : (serverSideIp ? 'server' : 'unknown')
            },
            automatic_payment_methods: { enabled: true }
        });

        return NextResponse.json({ client_secret: paymentIntent.client_secret });
    } catch (err) {
        console.error("Internal Error: ", err);
        return NextResponse.json(
            { message: "Internal Error: " + err },
            { status: 500 }
        );
    }
}