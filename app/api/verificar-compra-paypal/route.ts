import { NextResponse, NextRequest } from "next/server";

const ENDPOINT_URL = process.env.PAYPAL_ENVIRONMENT === 'production' 
  ? 'https://api-m.paypal.com/' 
  : 'https://api-m.sandbox.paypal.com/';
const CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ?? '';
const CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET ?? '';

interface AccessTokenResponse {
    access_token: string;
}

export async function POST(request: NextRequest){
    try {
        const body = await request.json();
        const orderId = body.orderId;
        const referenceId = body.referenceId;

        if (!orderId) {
            return NextResponse.json({ error: 'OrderId is required' }, { status: 400 });
        }

        const accessToken = await getAccessToken();
        const result = await completeOrder(accessToken, orderId, referenceId);

        return NextResponse.json(result, { status: 200 });
    } catch (error) {
        console.error('Error in verificar-compra-paypal:', error);
        return NextResponse.json({ error: 'Failed to verify PayPal purchase' }, { status: 500 });
    }
}

async function completeOrder(accessToken: string, orderId: string, paypalRequestId: string){
    const response = await fetch(`${ENDPOINT_URL}v2/checkout/orders/${orderId}/capture`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'PayPal-Request-Id': paypalRequestId,
            'Authorization': `Bearer ${accessToken}`
        }
    });

    if(!response.ok){
        const errorBody = await response.text();
        console.error('PayPal API Error:', response.status, errorBody);
        throw new Error(`Failed to complete order: ${response.status} ${errorBody}`);
    }

    const data = await response.json();
    return data;
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