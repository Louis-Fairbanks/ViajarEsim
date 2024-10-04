import { PaymentEmailInformation } from '@/app/[locale]/components/Types/TPaymentEmailInformation';
import { paymentConfirmationEmail } from './payment-confirmation-email';
import { paymentConfirmationEmailEnglish } from './translatedEmails/payment-confirmation-email-english';
import { spanishPaymentText } from './email-texts/spanish-payment-text';
import { englishPaymentText } from './email-texts/english-payment-text';
import formData from 'form-data';
import Mailgun from 'mailgun.js';
import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';
import { portuguesePaymentText } from './email-texts/portuguese-payment-text';
import { paymentConfirmationEmailPortuguese } from './translatedEmails/payment-confirmation-email-portuguese';


export async function sendPaymentConfirmationEmail(paymentEmailInformation: PaymentEmailInformation, locale: string) {

    let paymentEmailText = spanishPaymentText(paymentEmailInformation);
    if (locale === 'en') {
        paymentEmailText = englishPaymentText(paymentEmailInformation);
    } if (locale === 'br') {
        paymentEmailText = portuguesePaymentText(paymentEmailInformation);
    }

    //imagenes para el email (inline)
    const faviconPath = path.join(process.cwd(), '/public/img/favicon.png')
    const mujerConTarjetaCreditoPath = path.join(process.cwd(), '/public/media/email/mujer-con-tarjeta-credito.png')
    //can perhaps comment these back in later
    // const facebookPath = path.join(process.cwd(), '/public/media/email/facebook-svgrepo-com.png');
    // const instagramPath = path.join(process.cwd(), '/public/media/email/instagram-svgrepo-com.png');
    // const youtubePath = path.join(process.cwd(), '/public/media/email/youtube-svgrepo-com.png');
    // const twitterPath = path.join(process.cwd(), '/public/media/email/twitter-svgrepo-com.png');
    // const tiktokPath = path.join(process.cwd(), '/public/media/email/tiktok-svgrepo-com.png');

    const imagePaths = [faviconPath, mujerConTarjetaCreditoPath];

    //para que la clave de mailgun este bien guardada
    const mailgunAPIKey = process.env.MAILGUN_API_KEY;
    if (!mailgunAPIKey) {
        console.log('mailgunAPIKey is not set');
    }
    else {

        //crear nuevo email
        const mailgun = new Mailgun(formData);
        const mg = mailgun.client({
            username: 'api',
            key: mailgunAPIKey
        });
        try {
            //leer los archivos de todos los adjuntos (imagenes)
            let files = [];
            for (const imagePath of imagePaths) {
                const file = {
                    filename: path.basename(imagePath),
                    data: await fs.promises.readFile(imagePath),
                    contentType: 'image/png',
                    contentDisposition: 'inline',
                    cid: path.basename(imagePath)
                }
                files.push(file);
            }

            const subject = locale === 'en'
                ? `Order #${paymentEmailInformation.orderNumber} confirmed`
                : locale === 'br'
                    ? `Pedido #${paymentEmailInformation.orderNumber} confirmado`
                    : `Orden #${paymentEmailInformation.orderNumber} confirmado`;

            // Default to Spanish email content
            let html = paymentConfirmationEmail(paymentEmailInformation);

            // Override with the appropriate locale content if needed
            if (locale === 'en') {
                html = paymentConfirmationEmailEnglish(paymentEmailInformation);
            } else if (locale === 'br') {
                html = paymentConfirmationEmailPortuguese(paymentEmailInformation);
            }

            mg.messages.create('mail.viajaresim.com', {
                from: "ViajareSIM <noreply@mail.viajaresim.com>",
                to: [paymentEmailInformation.email],  //mandar email al correo del cliente
                subject: subject,   //asunto
                text: paymentEmailText,   //texto cualquiera por ahora
                html: html, //html recibido por la funcion orderEmail
                inline: files //todos las imagenes que son insertadas en el html
            })
                .then(msg => console.log(msg)) // logs NextResponse data
                .catch(err => console.log(err)); // logs any error
        } catch (error) {
            console.error(error);
        }
    }
    return NextResponse.json({ message: 'Email sent' })

}