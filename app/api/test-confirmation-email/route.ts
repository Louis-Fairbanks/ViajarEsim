import { paymentConfirmationEmail } from "../enviar-esim/payment-confirmation-email";
import formData from 'form-data';
import Mailgun from 'mailgun.js';


//ESTE ROUTE ES SOLO PARA TESTEAR COMO SE VE EL EMAIL DE CONFIRMACION DE PAGO SIN TENER QUE HACER COMPRAS REALES
export async function GET() {

    const mailgunAPIKey = process.env.MAILGUN_API_KEY;
    if (!mailgunAPIKey) {
        console.log('mailgunAPIKey is not set');
    }

    else {
        const mailgun = new Mailgun(formData);
        const mg = mailgun.client({
            username: 'api',
            key: mailgunAPIKey
        });

        const subject = `Orden 23423441234 confirmado`;
        const text = `Hola Louis,\n\nGracias por tu compra.' `
        mg.messages.create('viajaresim.com', {
            from: "ViajareSIM <noreply@viajaresim.com>",
            to: ['base216ball@yahoo.com'],
            subject: subject,
            text: text,
            html: paymentConfirmationEmail,
        })
            .then(msg => console.log(msg)) // logs NextResponse data
            .catch(err => console.log(err)); // logs any error
    } 

}