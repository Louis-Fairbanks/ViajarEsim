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
            userFirstName: 'Ivan',
            userLastName: 'LATAM',
            orderNumber: '1000025',
            email: 'base216ball@yahoo.com',
            regionName: 'Espana',
            data: 'Datos Ilimitados',
            duration: '20',
            qrcode: 'https://microesim.top/files/0000-9000024091352894',
            smdpAddress: 'ecprsp.eastcompeace.com',
            activationCodeIos: 'B445AB27C9E741A4AF098CEB275573BA',
            activationCodeAndroid: 'LPA:1$ecprsp.eastcompeace.com$B445AB27C9E741A4AF098CEB275573BA'
        }
    );
    NextResponse.json({message : 'Email enviado'});
}