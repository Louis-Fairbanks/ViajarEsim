import { EmailInformation } from "@/app/components/Types/TEmailInformation";
import formData from 'form-data';
import Mailgun from 'mailgun.js';
import { orderEmail } from './order-email';
import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';

export async function sendOrderEmail(emailInfo : EmailInformation) {
    //imagenes para el email (inline)
    const facebookPath = path.join(process.cwd(), '/public/media/email/facebook-svgrepo-com.png');
    const instagramPath = path.join(process.cwd(), '/public/media/email/instagram-svgrepo-com.png');
    const youtubePath = path.join(process.cwd(), '/public/media/email/youtube-svgrepo-com.png');
    const twitterPath = path.join(process.cwd(), '/public/media/email/twitter-svgrepo-com.png');
    const tiktokPath = path.join(process.cwd(), '/public/media/email/tiktok-svgrepo-com.png');
    const faviconPath = path.join(process.cwd(), '/public/media/favicon.png')
    const mujerLlamandoPath = path.join(process.cwd(), '/public/media/email/mujer-llamando.png');
    const hombreConCelularPath = path.join(process.cwd(), '/public/media/email/hombre-con-celular.png');
    const settingsSvgPath = path.join(process.cwd(), '/public/media/email/settings.png');
    const qrCodeScannerSvgPath = path.join(process.cwd(), '/public/media/email/qr_code_scanner.png');
    const simCardSvgPath = path.join(process.cwd(), '/public/media/email/sim_card.png');
    const noticePath = path.join(process.cwd(), '/public/media/email/notice.png');
    const checklistPath = path.join(process.cwd(), '/public/media/email/checklist.png');
    const appleLogoPath = path.join(process.cwd(), '/public/media/email/apple-logo-svgrepo-com 1.png');
    const androidLogoPath = path.join(process.cwd(), '/public/media/email/android-svgrepo-com 1.png');
    const imagePaths = [ appleLogoPath, androidLogoPath, facebookPath, instagramPath, youtubePath, twitterPath, tiktokPath, faviconPath, mujerLlamandoPath, hombreConCelularPath, settingsSvgPath, qrCodeScannerSvgPath, simCardSvgPath, noticePath, checklistPath];

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
                    data: await fs.promises.readFile(imagePath)
                }
                files.push(file);
            }
        
            const subject = `${emailInfo.userFirstName}, tu eSIM a ${emailInfo.regionName} está lista!`;
            const text = `Hola ${emailInfo.userFirstName} ${emailInfo.userLastName},\n\nGracias por tu compra.' `

            //orderEmail es una funcion que toma como parametros toda la
            //informacion necesaria para el email y retorna el html del email como string
            const html = orderEmail(emailInfo)
            mg.messages.create('viajaresim.com', {
                from: "ViajareSIM <noreply@viajaresim.com>",
                to: [emailInfo.email],  //mandar email al correo del cliente
                subject: subject,   //asunto
                text: text,   //texto cualquiera por ahora
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