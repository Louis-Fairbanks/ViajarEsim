import { NextRequest, NextResponse } from "next/server";
import { sendOrderEmail } from "../enviar-esim/sendOrderEmail";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/auth";

export async function POST(req : NextRequest){

    const session = await getServerSession(authOptions);

    if (!session || !session.user || session.user.email != 'viajaresimoficial@gmail.com') {
        return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
            status: 401,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    const requestData = await req.json();

    if(!requestData){
        return NextResponse.json({err: 'Unable to parse request data'}, {status: 500})
    }

    else {
        sendOrderEmail(
            {
                userFirstName: requestData.userFirstName,
                userLastName: requestData.userLastName,
                orderNumber: requestData.orderNumber,
                email: requestData.email,
                regionName: requestData.regionName,
                data: requestData.data,
                duration: requestData.duration,
                qrcode: requestData.qrcode,
                smdpAddress: requestData.qrcode.split('$')[1],
                activationCodeIos: requestData.qrcode.split('$')[2],
                activationCodeAndroid: requestData.qrcode,
                iccid: requestData.iccid
            }, requestData.idioma, requestData.sendingDomain
        )
    }
    return NextResponse.json({message : 'Email enviado con éxito'})
}