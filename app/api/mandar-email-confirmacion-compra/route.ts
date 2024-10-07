import { NextRequest, NextResponse } from "next/server";
import { sendPaymentConfirmationEmail } from "../enviar-esim/sendPaymentConfirmationEmail";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/auth";

export async function POST(req: NextRequest) {

    const session = await getServerSession(authOptions);

    if (!session || !session.user || session.user.email != 'viajaresimoficial@gmail.com') {
        return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
            status: 401,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    const requestData = await req.json();

    if (!requestData) {
        return NextResponse.json({ err: 'Unable to parse request data' }, { status: 500 });
    }

    try {
        await sendPaymentConfirmationEmail({
            email: requestData.email,
            firstName: requestData.firstName,
            lastName: requestData.lastName,
            orderNumber: requestData.orderNumber,
            total: requestData.total,
            paymentMethod: requestData.paymentMethod,
            datePaid: requestData.datePaid,
            purchasedPlans: requestData.purchasedPlans,
            appliedDiscount: requestData.appliedDiscount
        }, requestData.idioma);

        return NextResponse.json({ message: 'Email de confirmación de pago enviado con éxito' });
    } catch (error) {
        console.error('Error sending payment confirmation email:', error);
        return NextResponse.json({ error: 'Failed to send payment confirmation email' }, { status: 500 });
    }
}