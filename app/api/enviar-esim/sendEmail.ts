import { EmailInformation } from "@/app/components/Types/TEmailInformation";
import formData from 'form-data';
import Mailgun from 'mailgun.js';
import { orderEmail } from '../enviar-esim/order-email';
import { paymentConfirmationEmail } from '../enviar-esim/payment-confirmation-email';
import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';

export async function sendeSIMEmail() {
    const facebookPath = path.join(process.cwd(), '/public/media/email/facebook-svgrepo-com.svg');
    const instagramPath = path.join(process.cwd(), '/public/media/email/instagram-svgrepo-com.svg');
    const youtubePath = path.join(process.cwd(), '/public/media/email/youtube-svgrepo-com.svg');
    const twitterPath = path.join(process.cwd(), '/public/media/email/twitter-svgrepo-com.svg');
    const tiktokPath = path.join(process.cwd(), '/public/media/email/tiktok-svgrepo-com.svg');
    const faviconPath = path.join(process.cwd(), '/public/media/favicon.png')
    const mujerLlamandoPath = path.join(process.cwd(), '/public/media/email/mujer-llamando.png');
    const hombreConCelularPath = path.join(process.cwd(), '/public/media/email/hombre-con-celular.png');
    const settingsSvgPath = path.join(process.cwd(), '/public/media/email/settings.svg');
    const qrCodeScannerSvgPath = path.join(process.cwd(), '/public/media/email/qr_code_scanner.svg');
    const simCardSvgPath = path.join(process.cwd(), '/public/media/email/sim_card.svg');
    const noticePath = path.join(process.cwd(), '/public/media/email/notice.svg');
    const checklistPath = path.join(process.cwd(), '/public/media/email/checklist.png');
    const appleLogoPath = path.join(process.cwd(), '/public/media/email/apple-logo-svgrepo-com 1.svg');
    const androidLogoPath = path.join(process.cwd(), '/public/media/email/android-svgrepo-com 1.svg');
    const imagePaths = [ appleLogoPath, androidLogoPath, facebookPath, instagramPath, youtubePath, twitterPath, tiktokPath, faviconPath, mujerLlamandoPath, hombreConCelularPath, settingsSvgPath, qrCodeScannerSvgPath, simCardSvgPath, noticePath, checklistPath];

    let userFirstName = 'Fabricio';
    let userLastName = 'Lemus';

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
        try {
            let files = [];
            for (const imagePath of imagePaths) {
                const file = {
                    filename: path.basename(imagePath),
                    data: await fs.promises.readFile(imagePath)
                }
                files.push(file);
            }

            const emailInfo : EmailInformation = {
                userFirstName : userFirstName,
                userLastName : userLastName,
                orderNumber : '1334344621',
                regionName : 'Albania',
                data : 'Ilimitado',
                duration : '1',
                qrcode : 'https://microesim.top/files/0000-9000024090692834',
                smdpAddress : 'ecprsp.eastcompeace.com',
                activationCodeIos : '40AAA23E893C4CFBB4679688413FFD07',
                activationCodeAndroid: 'LPA:1$ecprsp.eastcompeace.com$40AAA23E893C4CFBB4679688413FFD07'
            }
        
            const subject = `Gracias por comprar con ViajareSIM, ${userFirstName} ${userLastName}`;
            const text = `Hola ${userFirstName} ${userLastName},\n\nGracias por tu compra.' `
            const html = orderEmail(emailInfo)
            mg.messages.create('viajaresim.com', {
                from: "ViajareSIM <noreply@viajaresim.com>",
                to: ['base216ball@yahoo.com'],
                subject: subject,
                text: text,
                html: html,
                attachment: '',
                inline: files
            })
                .then(msg => console.log(msg)) // logs NextResponse data
                .catch(err => console.log(err)); // logs any error
        } catch (error) {
            console.error(error);
        }
    }
    return NextResponse.json({ message: 'Email sent' })
}