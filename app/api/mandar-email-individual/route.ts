import { NextResponse } from "next/server";
import { sendOrderEmail } from "../enviar-esim/sendOrderEmail";
import { sendPaymentConfirmationEmail } from "../enviar-esim/sendPaymentConfirmationEmail";

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

// export type PaymentEmailInformation = {
//     email : string,
//     orderNumber : string,
//     firstName : string,
//     lastName : string,
//     total : string,
//     paymentMethod: string,
//     datePaid : string,
//     purchasedPlans : PlanPricingInfo[]
//     appliedDiscount : string,
// }
// export type PlanPricingInfo = {
//     regionName : string,
//     duration : string,
//     salePrice : number
//     data : string,
//     iccid : string
// }


export async function GET(){
    // sendOrderEmail(
    //     {
    //         userFirstName: 'Ana maria',
    //         userLastName: 'Ibarra',
    //         orderNumber: '1000161',
    //         email: 'an_ia84@hotmail.com',
    //         regionName: 'Estados Unidos',
    //         data: 'Datos Ilimitados',
    //         duration: '15',
    //         qrcode: 'LPA:1$ecprsp.eastcompeace.com$5DFC4B4341C943CDA34A1706609F836C',
    //         smdpAddress: 'ecprsp.eastcompeace.com',
    //         activationCodeIos: '5DFC4B4341C943CDA34A1706609F836C',
    //         activationCodeAndroid: 'LPA:1$ecprsp.eastcompeace.com$5DFC4B4341C943CDA34A1706609F836C'
    //     }, 'es'
    // );
    // sendPaymentConfirmationEmail({
    //     email: 'grace.aguirre47@gmail.com',
    //     firstName: 'GRACE',
    //     lastName: 'AGUIRRE',
    //     orderNumber: '1000162',
    //     total: '13,00',
    //     paymentMethod: 'Tarjeta de Crédito/Débito',
    //     datePaid: '2024-10-01',
    //     purchasedPlans: [
    //         {
    //             regionName: 'Argentina',
    //             duration: '15',
    //             salePrice: 13,
    //             data: 'Datos Ilimitados',
    //             iccid: '8932042000006419636'
    //         }
    //     ],
    //     appliedDiscount: '0'
    // }, 'es' )
    return NextResponse.json({message : 'Email enviado'});
}