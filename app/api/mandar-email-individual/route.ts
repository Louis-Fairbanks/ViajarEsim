import { NextResponse } from "next/server";
import { sendOrderEmail } from "../enviar-esim/sendOrderEmail";

export type EmailInformation = {
    userFirstName : string,
    userLastName : string,
    orderNumber : string,  //podemos usar un numero cualquiera por ahora
    email : string,
    regionName : string,
    data : string, // o numero dias o el string 'Datos Ilimitados'       
    duration : string,    //duracion en dias por ejemplo: '1' or '30' 
    qrcode : string, //o un url a donde esta alojada la imagen o un buffer con la imagen
    smdpAddress : string,  //ejemplo: ecprsp.eastcompeace.com
    activationCodeIos : string,   //mismo como android pero sin el $ ejemeplo 40AAA23E893C4CFBB4679688413FFD07
    activationCodeAndroid: string //ejemplo LPA:1$ecprsp.eastcompeace.com$40AAA23E893C4CFBB4679688413FFD07
}


export async function GET(){
    sendOrderEmail(
        {
            userFirstName: 'Rafael',
            userLastName: 'Rossi',
            orderNumber: '1000025',
            email: 'louis_fairbanks@websitesbylouis.com',
            regionName: 'Brazil',
            data: '20',
            duration: '30',
            qrcode: 'LPA:1$rsp.truphone.com$JQ-20BDEA-1OFFUO3',
            smdpAddress: 'rsp.truphone.com',
            activationCodeIos: 'JQ-20BDEA-1OFFUO3',
            activationCodeAndroid: 'LPA:1$rsp.truphone.com$JQ-20BDEA-1OFFUO3'
        }, 'en'
    );
    return NextResponse.json({message : 'Email enviado'});
}