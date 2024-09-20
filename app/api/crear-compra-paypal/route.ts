import { NextRequest, NextResponse } from "next/server";

const ENDPOINT_URL = process.env.PAYPAL_ENVIRONMENT === 'production' 
  ? 'https://api-m.paypal.com/' 
  : 'https://api-m.sandbox.paypal.com/';
const CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ?? '';
const CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET ?? '';

interface PurchaseUnit {
  reference_id: string;
  amount: {
    currency_code: string;
    value: string;
  };
}

interface PayPalOrderResponse {
  id: string;
  status: string;
}

interface AccessTokenResponse {
  access_token: string;
}

function roundToTwoDecimals(num : number) {
    return Math.round((num + Number.EPSILON) * 100) / 100;
  }

  export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const accessToken = await getAccessToken();
        const referenceId = body.purchase_units[0].reference_id;
        const amount = body.purchase_units[0].amount.value;
        const roundedAmount = roundToTwoDecimals(parseFloat(amount));

        console.log(referenceId, roundedAmount, accessToken);

        const purchase_units = [{
            reference_id: referenceId,
            amount: {
                currency_code: body.purchase_units[0].amount.currency_code,
                value: roundedAmount.toFixed(2)
            }
        }];

        const orderId = await createOrder(accessToken, referenceId, purchase_units);
    
        return NextResponse.json({ orderId }, { status: 200 });
    } catch (error) {
        console.error('Error in PayPal order creation:', error);
        return NextResponse.json({ error: 'Failed to create PayPal order' }, { status: 500 });
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

async function createOrder(accessToken: string, referenceId: string, purchase_units: PurchaseUnit[]): Promise<string> {
  const response = await fetch(`${ENDPOINT_URL}v2/checkout/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Paypal-Request-Id': referenceId,
      'Authorization': `Bearer ${accessToken}`
      
    },
    body: JSON.stringify({
      intent: 'CAPTURE',
      purchase_units: purchase_units
    })
  });
  console.log(response)
  if (!response.ok) {
    throw new Error(`Failed to create order: ${response.statusText}`);
  }

  const data: PayPalOrderResponse = await response.json();
  return data.id;
}