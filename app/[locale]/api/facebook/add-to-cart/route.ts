import { NextRequest, NextResponse } from "next/server";
type DataToSend = {
    timestamp: number;
    eventId: string;
    clientUserAgent: string | null;
    clientIpAddress: string;
    currency: string;
    total: number;
    plans: metaPlan[]
}

type metaPlan = {
    id: string;
    quantity: number;
    item_price: number;
}

export async function POST(request : NextRequest){
    const requestBody = await request.json();
    if(!requestBody.ecommerce || !requestBody.eventId){
        return NextResponse.json({message: 'Missing required fields'}, {status: 400})
    }
    const metaPlans : metaPlan[] = requestBody.ecommerce.items.map((item : any) => {
        return {
            id: item.item_id,
            quantity: item.quantity,
            item_price: item.price
        }
    })
    const dataToSend : DataToSend = {
        timestamp : Math.floor(Date.now() / 1000),
        eventId : requestBody.eventId,
        clientUserAgent : request.headers.get('user-agent'),
        clientIpAddress : requestBody.userIpAddress,
        currency: requestBody.ecommerce.currency,
        total: requestBody.ecommerce.value,
        plans: metaPlans
    }
    sendDataToFacebook(dataToSend);
    return NextResponse.json({message: 'hello'})
}

async function sendDataToFacebook({timestamp, eventId, clientUserAgent, clientIpAddress, currency, total, plans} : DataToSend){
    const url = `https://graph.facebook.com/v20.0/387339964231038/events?access_token=${process.env.FACEBOOK_CONVERSIONS_API_KEY}`

    const dataToSend = {
        "data": [
            {
                "event_name": "AddToCart",
                "event_time": timestamp,
                "action_source": "website",
                "event_id": eventId,
                "event_source_url": "https://viajaresim.com",
                "user_data": {
                    "client_ip_address": clientIpAddress,
                    "client_user_agent": clientUserAgent
                },
                "custom_data": {
                    "currency": currency,
                    "value": total,
                    'contents': plans
                }
            }
        ]
    }
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSend)
        })

    const data = await response.json();
    console.log(data)
}