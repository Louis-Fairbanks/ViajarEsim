// import { PaymentEmailInformation } from '@/app/[locale]/components/Types/TPaymentEmailInformation';
// import { paymentConfirmationEmail } from './payment-confirmation-email';
// import { paymentConfirmationEmailEnglish } from './translatedEmails/payment-confirmation-email-english';
// import { spanishPaymentText } from './email-texts/spanish-payment-text';
// import { englishPaymentText } from './email-texts/english-payment-text';
// import formData from 'form-data';
// import Mailgun from 'mailgun.js';
// import { NextResponse } from 'next/server';
// import path from 'path';
// import fs from 'fs';
// import { portuguesePaymentText } from './email-texts/portuguese-payment-text';
// import { paymentConfirmationEmailPortuguese } from './translatedEmails/payment-confirmation-email-portuguese';
// import nodemailer from 'nodemailer';
// import { ClientSecretCredential } from '@azure/identity';
// import { TokenCredentialAuthenticationProvider } from '@microsoft/microsoft-graph-client/authProviders/azureTokenCredentials';



// export async function sendPaymentConfirmationEmail(paymentEmailInformation: PaymentEmailInformation, locale: string) {
//     const tenantId: string = process.env.MICROSOFT_TENANT_ID ?? '';
//     const clientId: string = process.env.MICROSOFT_CLIENT_ID ?? '';
//     const clientSecret: string = process.env.OUTLOOK_SECRET_VALUE ?? '';

//     const credential = new ClientSecretCredential(tenantId, clientId, clientSecret);
//     const authProvider = new TokenCredentialAuthenticationProvider(credential, {
//         scopes: ['https://outlook.office.com/.default']
//     });

//     async function getAccessToken(): Promise<string> {
//         const token = await credential.getToken(['https://outlook.office.com/.default']);
//         return token?.token || '';
//     }

//     let paymentEmailText = spanishPaymentText(paymentEmailInformation);
//     if (locale === 'en') {
//         paymentEmailText = englishPaymentText(paymentEmailInformation);
//     } if (locale === 'br') {
//         paymentEmailText = portuguesePaymentText(paymentEmailInformation);
//     }

//     //imagenes para el email (inline)
//     const faviconPath = path.join(process.cwd(), '/public/img/favicon.png')
//     const mujerConTarjetaCreditoPath = path.join(process.cwd(), '/public/media/email/mujer-con-tarjeta-credito.png')
//     //can perhaps comment these back in later
//     // const facebookPath = path.join(process.cwd(), '/public/media/email/facebook-svgrepo-com.png');
//     // const instagramPath = path.join(process.cwd(), '/public/media/email/instagram-svgrepo-com.png');
//     // const youtubePath = path.join(process.cwd(), '/public/media/email/youtube-svgrepo-com.png');
//     // const twitterPath = path.join(process.cwd(), '/public/media/email/twitter-svgrepo-com.png');
//     // const tiktokPath = path.join(process.cwd(), '/public/media/email/tiktok-svgrepo-com.png');

//     const imagePaths = [faviconPath, mujerConTarjetaCreditoPath];

//     //para que la clave de mailgun este bien guardada
//     const mailgunAPIKey = process.env.MAILGUN_API_KEY;
//     if (!mailgunAPIKey) {
//         console.log('mailgunAPIKey is not set');
//     }
//     else {

//         //crear nuevo email
//         const mailgun = new Mailgun(formData);
//         const mg = mailgun.client({
//             username: 'api',
//             key: mailgunAPIKey
//         });
//         try {
//             //leer los archivos de todos los adjuntos (imagenes)
//             let files = [];
//             for (const imagePath of imagePaths) {
//                 const file = {
//                     filename: path.basename(imagePath),
//                     data: await fs.promises.readFile(imagePath),
//                     contentType: 'image/png',
//                     contentDisposition: 'inline',
//                     cid: path.basename(imagePath)
//                 }
//                 files.push(file);
//             }

//             let attachments = imagePaths.map(imagePath => ({
//                 filename: path.basename(imagePath),
//                 path: imagePath,
//                 cid: path.basename(imagePath),
//                 contentDisposition: 'inline' as const
//             }));

//             const subject = locale === 'en'
//                 ? `Order #${paymentEmailInformation.orderNumber} confirmed`
//                 : locale === 'br'
//                     ? `Pedido #${paymentEmailInformation.orderNumber} confirmado`
//                     : `Orden #${paymentEmailInformation.orderNumber} confirmado`;

//             // Default to Spanish email content
//             let html = paymentConfirmationEmail(paymentEmailInformation);

//             // Override with the appropriate locale content if needed
//             if (locale === 'en') {
//                 html = paymentConfirmationEmailEnglish(paymentEmailInformation);
//             } else if (locale === 'br') {
//                 html = paymentConfirmationEmailPortuguese(paymentEmailInformation);
//             }


//         const accessToken = await getAccessToken();

//         let transporter = nodemailer.createTransport({
//             host: 'smtp.office365.com',
//             port: 587,
//             secure: false,
//             auth: {
//                 // type: 'oauth2',
//                 user: 'influencers@viajaresim.com',
//                 pass: '1Malmes123',
//                 // clientId: clientId,
//                 // clientSecret: clientSecret,
//                 // tenantId: tenantId,
//                 // accessToken: accessToken
//             },
//             tls: {
//                 ciphers: "SSLv3",
//                 rejectUnauthorized: false
//             }
//         } as nodemailer.TransportOptions);

//         let info = await transporter.sendMail({
//             from: '"ViajareSIM" <influencers@viajaresim.com>',
//             to: paymentEmailInformation.email,
//             subject: subject,
//             text: paymentEmailText,
//             html: html,
//             attachments: attachments
//         });

//         console.log('Payment confirmation email sent: %s', info.messageId);
//         return NextResponse.json({ message: 'Email sent successfully' });

//     } catch (error) {
//         console.error('Error sending email:', error);
//         return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
//     }

//         //     mg.messages.create('mail.viajaresim.com', {
//         //         from: "ViajareSIM <noreply@mail.viajaresim.com>",
//         //         to: [paymentEmailInformation.email],  //mandar email al correo del cliente
//         //         subject: subject,   //asunto
//         //         text: paymentEmailText,   //texto cualquiera por ahora
//         //         html: html, //html recibido por la funcion orderEmail
//         //         inline: files //todos las imagenes que son insertadas en el html
//         //     })
//         //         .then(msg => console.log(msg)) // logs NextResponse data
//         //         .catch(err => console.log(err)); // logs any error
//         // } catch (error) {
//         //     console.error(error);
//         // }
//     }
//     return NextResponse.json({ message: 'Email sent' })

// }

import { PaymentEmailInformation } from '@/app/[locale]/components/Types/TPaymentEmailInformation';
import { paymentConfirmationEmail } from './payment-confirmation-email';
import { paymentConfirmationEmailEnglish } from './translatedEmails/payment-confirmation-email-english';
import { frenchPaymentText } from './email-texts/french-payment-text';
import { germanPaymentText } from './email-texts/german-payment-text';
import { italianPaymentText } from './email-texts/italian-payment-text';
import { spanishPaymentText } from './email-texts/spanish-payment-text';
import { englishPaymentText } from './email-texts/english-payment-text';
import { paymentConfirmationEmailFrench } from './translatedEmails/payment-confirmation-email-french';
import { paymentConfirmationEmailGerman } from './translatedEmails/payment-confirmation-email-german';
import { paymentConfirmationEmailItalian } from './translatedEmails/payment-confirmation-email-italian';
import formData from 'form-data';
import Mailgun from 'mailgun.js';
import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';
import { portuguesePaymentText } from './email-texts/portuguese-payment-text';
import { paymentConfirmationEmailPortuguese } from './translatedEmails/payment-confirmation-email-portuguese';


export async function sendPaymentConfirmationEmail(paymentEmailInformation: PaymentEmailInformation, locale: string,
    sendingDomain : string = 'mail.viajaresim.com'
) {

    let paymentEmailText = spanishPaymentText(paymentEmailInformation);
    if (locale === 'en') {
        paymentEmailText = englishPaymentText(paymentEmailInformation);
    } else if (locale === 'br') {
        paymentEmailText = portuguesePaymentText(paymentEmailInformation);
    } else if (locale === 'fr') {
        paymentEmailText = frenchPaymentText(paymentEmailInformation);
    } else if (locale === 'de') {
        paymentEmailText = germanPaymentText(paymentEmailInformation);
    } else if (locale === 'it') {
        paymentEmailText = italianPaymentText(paymentEmailInformation);
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
                    : locale === 'de'
                        ? `Bestellung #${paymentEmailInformation.orderNumber} bestätigt`
                        : locale === 'fr'
                            ? `Commande #${paymentEmailInformation.orderNumber} confirmée`
                            : locale === 'it'
                                ? `Ordine #${paymentEmailInformation.orderNumber} confermato`
                                : `Orden #${paymentEmailInformation.orderNumber} confirmado`;

            let html = paymentConfirmationEmail(paymentEmailInformation);

            // Override with the appropriate locale content if needed
            if (locale === 'en') {
                html = paymentConfirmationEmailEnglish(paymentEmailInformation);
            } else if (locale === 'br') {
                html = paymentConfirmationEmailPortuguese(paymentEmailInformation);
            } else if (locale === 'fr') {
                html = paymentConfirmationEmailFrench(paymentEmailInformation);
            } else if (locale === 'de') {
                html = paymentConfirmationEmailGerman(paymentEmailInformation);
            } else if (locale === 'it') {
                html = paymentConfirmationEmailItalian(paymentEmailInformation);
            }

            mg.messages.create(sendingDomain, {
                from: `ViajareSIM <noreply@${sendingDomain}>`,
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