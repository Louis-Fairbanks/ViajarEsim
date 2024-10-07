import { NextResponse } from "next/server";

export async function GET(){
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