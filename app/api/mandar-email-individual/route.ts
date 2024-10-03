import { NextResponse } from "next/server";
import { sendOrderEmail } from "../enviar-esim/sendOrderEmail";
import { sendPaymentConfirmationEmail } from "../enviar-esim/sendPaymentConfirmationEmail";
import { sendOrderConfirmedEmailToOwner } from "../enviar-esim/sendOrderConfirmedEmailToOwner";

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
    //         userFirstName: 'Miguel',
    //         userLastName: 'Oportus M',
    //         orderNumber: '1000169',
    //         email: '',
    //         regionName: 'Argentina',
    //         data: '1',
    //         duration: '7',
    //         qrcode: 'LPA:1$rsp.truphone.com$JQ-20CEWF-5YIN36',
    //         smdpAddress: 'rsp.truphone.com',
    //         activationCodeIos: 'JQ-20CEWF-5YIN36',
    //         activationCodeAndroid: 'LPA:1$rsp.truphone.com$JQ-20CEWF-5YIN36'
    //     }, 'es'
    // );
    // sendPaymentConfirmationEmail({
    //     email: '',
    //     firstName: 'Miguel',
    //     lastName: 'Oportus M',
    //     orderNumber: '1000169',
    //     total: '6,00',
    //     paymentMethod: 'Tarjeta de Crédito/Débito',
    //     datePaid: '2024-10-02',
    //     purchasedPlans: [
    //         {
    //             regionName: 'Argentina',
    //             duration: '7',
    //             salePrice: 6,
    //             data: '1',
    //             iccid: '8932042000006284186'
    //         }
    //     ],
    //     appliedDiscount: '0'
    // }, 'es' )
    // sendOrderConfirmedEmailToOwner(
    //     {
    //         firstName: 'Gaston',
    //         lastName: 'Ennis',
    //         orderNumber: '1000159',
    //         email: '',
    //         total: '24',
    //         paymentMethod: 'Tarjeta de Crédito/Débito',
    //         datePaid: '2024-10-01',
    //         purchasedPlans: [
    //             {
    //                 regionName: 'Chile',
    //                 duration: '7',
    //                 salePrice: 6,
    //                 data: '1',
    //                 iccid: '8932042000006286979'
    //             }
    //         ],
    //         appliedDiscount: '0'
    //     }, ''
    // )
    return NextResponse.json({message : 'Email enviado'});
}