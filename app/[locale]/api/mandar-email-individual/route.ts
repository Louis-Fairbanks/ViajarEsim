import { NextResponse } from "next/server";
import { sendOrderEmail } from "../enviar-esim/sendOrderEmail";
import { sendPaymentConfirmationEmail } from "../enviar-esim/sendPaymentConfirmationEmail";
import { sendOrderConfirmedEmailToOwner } from "../enviar-esim/sendOrderConfirmedEmailToOwner";

export async function GET(){
    // sendOrderConfirmedEmailToOwner(
    //     {
    //         firstName: 'Joel ricardo',
    //         lastName: 'Rojas guzman',
    //         orderNumber: '1000305',
    //         email: 'joel_rrg@hotmail.com',
    //         total: '50,00',
    //         paymentMethod: 'Tarjeta de Crédito/Débito',
    //         datePaid: '2024-10-15',
    //         purchasedPlans: [
    //             {
    //                 regionName: 'Brasil',
    //                 duration: '7',
    //                 salePrice: 25.00,
    //                 data: 'Datos ilimitados',
    //                 iccid: '9000024101570839'
    //             },
    //             {
    //                 regionName: 'Brasil',
    //                 duration: '7',
    //                 salePrice: 25.00,
    //                 data: 'Datos ilimitados',
    //                 iccid: '9000024101587496'
    //             }
    //         ],
    //         appliedDiscount: '0',
    //         discountName: '-'
    //     }, ''
    // )
    // sendOrderEmail({
    //     userFirstName: 'Gonzalo',
    //     userLastName: 'Gonzalo',
    //     orderNumber: '100242',
    //     email: 'louis_fairbanks@websitesbylouis.com',
    //     regionName: 'Argentina',
    //     data: '1 GB',
    //     duration: '7',
    //     qrcode: 'LPA:1$ecprsp.eastcompeace.com$40AAA23E893C4CFBB4679688413FFD07',
    //     smdpAddress: 'ecprsp.eastcompeace.com',
    //     activationCodeIos: '40AAA23E893C4CFBB4679688413FFD07',
    //     activationCodeAndroid: 'LPA:1$ecprsp.eastcompeace.com$40AAA23E893C4CFBB4679688413FFD07',
    //     iccid: '121234123212'
    // }, 'es');
    // sendPaymentConfirmationEmail({
    //     firstName: 'Louis',
    //     lastName: "fairbanks",
    //     orderNumber: '1000244',
    //     email: 'louis_fairbanks@websitesbylouis.com',
    //     total: '29,00',
    //     paymentMethod: 'PayPal',
    //     datePaid: '10/10/2024',
    //     purchasedPlans: [{
    //         regionName: 'Argentina',
    //         duration: '7',
    //         data: 'Datos ilimitados',
    //         salePrice: 29,
    //         iccid: '23413081923'
    //     }
    //     ],
    //     appliedDiscount: '3,15',
    //     discountName: 'ViajareSIM30'
    // }, 'es')
    return NextResponse.json({message : 'Email enviado'});
}