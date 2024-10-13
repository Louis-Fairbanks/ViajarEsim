// import { EmailInformation } from '@/app/[locale]/components/Types/TEmailInformation';
// import { orderEmail } from './order-email';
// import { orderEmailEnglish } from './translatedEmails/order-email-english';
// import { spanishText } from './email-texts/spanish-text';
// import { englishText } from './email-texts/english-text';
// import { NextResponse } from 'next/server';
// import path from 'path';
// import fs from 'fs';
// import QRCode from 'qrcode';
// import { portugueseText } from './email-texts/portuguese-text';
// import { orderEmailPortuguese } from './translatedEmails/order-email-portuguese';
// import nodemailer from 'nodemailer';
// import { ClientSecretCredential } from '@azure/identity';
// import { TokenCredentialAuthenticationProvider } from '@microsoft/microsoft-graph-client/authProviders/azureTokenCredentials';

// export async function sendOrderEmail(emailInfo: EmailInformation, locale: string) {
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
//     let emailText = spanishText(emailInfo);
//     if (locale === 'en') {
//         emailText = englishText(emailInfo);
//     } if (locale === 'br') {
//         emailText = portugueseText(emailInfo);
//     }

//     const faviconPath = path.join(process.cwd(), '/public/img/favicon.png')
//     const mujerLlamandoPath = path.join(process.cwd(), '/public/media/email/mujer-llamando.png');
//     const hombreConCelularPath = path.join(process.cwd(), '/public/media/email/hombre-con-celular.png');
//     const settingsSvgPath = path.join(process.cwd(), '/public/media/email/settings.png');
//     const qrCodeScannerSvgPath = path.join(process.cwd(), '/public/media/email/qr_code_scanner.png');
//     const simCardSvgPath = path.join(process.cwd(), '/public/media/email/sim_card.png');
//     const noticePath = path.join(process.cwd(), '/public/media/email/notice.png');
//     const checklistPath = path.join(process.cwd(), '/public/media/email/checklist.png');
//     const appleLogoPath = path.join(process.cwd(), '/public/media/email/appleLogo.png');
//     const androidLogoPath = path.join(process.cwd(), '/public/media/email/androidLogo.png');
//     const imagePaths = [appleLogoPath, androidLogoPath, faviconPath, mujerLlamandoPath, hombreConCelularPath, settingsSvgPath, qrCodeScannerSvgPath, simCardSvgPath, noticePath, checklistPath];

//     try {
//         let attachments = [];
//         for (const imagePath of imagePaths) {
//             const attachment = {
//                 filename: path.basename(imagePath),
//                 path: imagePath,
//                 cid: path.basename(imagePath)
//             };
//             attachments.push(attachment);
//         }

//         // Handle QR code
//         if (emailInfo.qrcode) {
//             if (emailInfo.qrcode.startsWith('http') || emailInfo.qrcode.startsWith('https')) {
//                 // It's a URL, no need to generate QR code
//                 emailInfo.qrcode = emailInfo.qrcode;
//             } else {
//                 // Generate QR code
//                 const qrCodeBuffer = await QRCode.toBuffer(emailInfo.qrcode);
//                 const qrCodeAttachment = {
//                     filename: 'qrcode.png',
//                     content: qrCodeBuffer,
//                     contentDisposition: 'inline' as const,
//                     cid: 'qrcode.png'
//                 };
//                 attachments.push(qrCodeAttachment);
//                 emailInfo.qrcode = 'cid:qrcode.png';
//             }
//         }

//         const subject = locale === 'en'
//             ? `${emailInfo.userFirstName}, your eSIM to ${emailInfo.regionName} is ready`
//             : locale === 'br'
//                 ? `${emailInfo.userFirstName}, sua eSIM para ${emailInfo.regionName} está pronta`
//                 : `${emailInfo.userFirstName}, tu eSIM a ${emailInfo.regionName} está lista`;

//         let html = orderEmail(emailInfo);
//         if (locale === 'en') {
//             html = orderEmailEnglish(emailInfo);
//         } else if (locale === 'br') {
//             html = orderEmailPortuguese(emailInfo);
//         }

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
//             to: emailInfo.email,
//             subject: subject,
//             text: emailText,
//             html: html,
//             attachments: attachments
//         });

//         console.log('eSIM email Message sent: %s', info.messageId);
//         return NextResponse.json({ message: 'Email sent successfully' });

//     } catch (error) {
//         console.error('Error sending email:', error);
//         return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
//     }
// }

import { EmailInformation } from '@/app/[locale]/components/Types/TEmailInformation';
import formData from 'form-data';
import Mailgun from 'mailgun.js';
import { orderEmail } from './order-email';
import { orderEmailEnglish } from './translatedEmails/order-email-english';
import { spanishText } from './email-texts/spanish-text';
import { englishText } from './email-texts/english-text';
import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';
import QRCode from 'qrcode';
import { portugueseText } from './email-texts/portuguese-text';
import { orderEmailPortuguese } from './translatedEmails/order-email-portuguese';

export async function sendOrderEmail(emailInfo: EmailInformation, locale: string) {

    let emailText = spanishText(emailInfo);
    if (locale === 'en') {
        emailText = englishText(emailInfo);
    } if (locale === 'br'){
        emailText = portugueseText(emailInfo);
    }
    //imagenes para el email (inline)
    //can perhaps comment these back in later
    // const facebookPath = path.join(process.cwd(), '/public/media/email/facebook-svgrepo-com.png');
    // const instagramPath = path.join(process.cwd(), '/public/media/email/instagram-svgrepo-com.png');
    // const youtubePath = path.join(process.cwd(), '/public/media/email/youtube-svgrepo-com.png');
    // const twitterPath = path.join(process.cwd(), '/public/media/email/twitter-svgrepo-com.png');
    // const tiktokPath = path.join(process.cwd(), '/public/media/email/tiktok-svgrepo-com.png');
    const faviconPath = path.join(process.cwd(), '/public/img/favicon.png')
    const mujerLlamandoPath = path.join(process.cwd(), '/public/media/email/mujer-llamando.png');
    const hombreConCelularPath = path.join(process.cwd(), '/public/media/email/hombre-con-celular.png');
    const settingsSvgPath = path.join(process.cwd(), '/public/media/email/settings.png');
    const qrCodeScannerSvgPath = path.join(process.cwd(), '/public/media/email/qr_code_scanner.png');
    const simCardSvgPath = path.join(process.cwd(), '/public/media/email/sim_card.png');
    const noticePath = path.join(process.cwd(), '/public/media/email/notice.png');
    const checklistPath = path.join(process.cwd(), '/public/media/email/checklist.png');
    const appleLogoPath = path.join(process.cwd(), '/public/media/email/appleLogo.png');
    const androidLogoPath = path.join(process.cwd(), '/public/media/email/androidLogo.png');
    const imagePaths = [appleLogoPath, androidLogoPath, faviconPath, mujerLlamandoPath, hombreConCelularPath, settingsSvgPath, qrCodeScannerSvgPath, simCardSvgPath, noticePath, checklistPath];

    const mailgunAPIKey = process.env.MAILGUN_API_KEY;
    if (!mailgunAPIKey) {
        console.log('mailgunAPIKey is not set');
        return NextResponse.json({ error: 'Mailgun API key is not set' }, { status: 500 });
    }

    const mailgun = new Mailgun(formData);
    const mg = mailgun.client({
        username: 'api',
        key: mailgunAPIKey
    });

    try {
        let files = [];
        for (const imagePath of imagePaths) {
            const file = {
                filename: path.basename(imagePath),
                data: await fs.promises.readFile(imagePath),
                contentType: 'image/png',
                cid: path.basename(imagePath)
            }
            files.push(file);
        }

        // Handle QR code
        if (emailInfo.qrcode) {
            if (emailInfo.qrcode.startsWith('http') || emailInfo.qrcode.startsWith('https')) {
                // It's a URL, no need to generate QR code
                emailInfo.qrcode = emailInfo.qrcode;
            } else {
                // Generate QR code
                const qrCodeBuffer = await QRCode.toBuffer(emailInfo.qrcode);
                const qrCodeFile = {
                    filename: 'qrcode.png',
                    data: qrCodeBuffer,
                    contentType: 'image/png',
                    contentDisposition: 'inline',
                    cid: 'qrcode.png'
                };
                files.push(qrCodeFile);
                emailInfo.qrcode = 'cid:qrcode.png';
            }
        }

        const subject = locale === 'en' 
        ? `${emailInfo.userFirstName}, your eSIM to ${emailInfo.regionName} is ready` 
        : locale === 'br' 
        ? `${emailInfo.userFirstName}, sua eSIM para ${emailInfo.regionName} está pronta` 
        : `${emailInfo.userFirstName}, tu eSIM a ${emailInfo.regionName} está lista`;
    
    let html = orderEmail(emailInfo);
    if (locale === 'en') {
        html = orderEmailEnglish(emailInfo);
    } else if (locale === 'br') {
        html = orderEmailPortuguese(emailInfo);
    }
    

        const result = await mg.messages.create('mail.viajaresim.com', {
            from: "ViajareSIM <noreply@mail.viajaresim.com>",
            to: [emailInfo.email],
            subject: subject,
            text: emailText,
            html: html,
            inline: files
        });

        console.log(result);
        return NextResponse.json({ message: 'Email sent successfully' });

    } catch (error) {
        console.error('Error sending email:', error);
        return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }
}