import formData from 'form-data';
import Mailgun from 'mailgun.js';
import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';
import { EmailInformation } from '@/app/components/Types/TEmailInformation';
import { orderEmail } from '../enviar-esim/order-email';
import { paymentConfirmationEmail } from '../enviar-esim/payment-confirmation-email';
import { PaymentEmailInformation } from '@/app/components/Types/TPaymentEmailInformation';
import { PlanPricingInfo } from '@/app/components/Types/TPlanPricingInfo';

export async function GET(){
        sendOrderEmail();
        return NextResponse.json({essage: 'hi'})
}

const emailInfo: EmailInformation = {
    userFirstName: 'John',
    userLastName: 'Doe',
    orderNumber: Math.floor(Math.random() * 10000).toString(), // Random order number
    email: 'base216ball@yahoo.com',
    regionName: 'North America',
    data: 'Datos Ilimitados',
    duration: '30', // 30 days
    qrcode: 'https://viajaresim.com', // Random buffer for the QR code
    smdpAddress: 'ecprsp.eastcompeace.com',
    activationCodeIos: '40AAA23E893C4CFBB4679688413FFD07',
    activationCodeAndroid: 'LPA:1$ecprsp.eastcompeace.com$40AAA23E893C4CFBB4679688413FFD07'
}

const purchasedPlans : PlanPricingInfo[] = [
    {
        regionName : 'North America',
        data : 'Datos Ilimitados',
        salePrice: 5.90000,
        duration: '30'
    },
    {
        regionName : 'North America',
        data : 'Datos Ilimitados',
        salePrice: 5.90000,
        duration: '30'
    },
    {
        regionName : 'North America',
        data : 'Datos Ilimitados',
        salePrice: 5.90000,
        duration: '30'
    }
]

const paymentEmailInfo : PaymentEmailInformation ={
    email : 'base216ball@yahoo.com',
    orderNumber : '12345',
    firstName: 'John',
    lastName: 'Doe',
    total: '100',
    datePaid: '2022-01-01',
    purchasedPlans: purchasedPlans,
    appliedDiscount: '5,90'
}

async function sendOrderEmail() {
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
    // const appleLogoPath = path.join(process.cwd(), '/public/media/email/apple-logo-svgrepo-com 1.png');
    // const androidLogoPath = path.join(process.cwd(), '/public/media/email/android-svgrepo-com 1.png');
    // base encoding these for now appleLogoPath, androidLogoPath,
    const imagePaths = [  faviconPath, mujerLlamandoPath, hombreConCelularPath, settingsSvgPath, qrCodeScannerSvgPath, simCardSvgPath, noticePath, checklistPath];

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
                    cid: path.basename(imagePath)
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
    sendPaymentConfirmationEmail(paymentEmailInfo);
    return NextResponse.json({ message: 'Email sent' })
}

export async function sendPaymentConfirmationEmail(paymentEmailInformation: PaymentEmailInformation) {
    //imagenes para el email (inline)
    const faviconPath = path.join(process.cwd(), '/public/img/favicon.png')
    const mujerConTarjetaCreditoPath = path.join(process.cwd(), '/public/media/email/mujer-con-tarjeta-credito.png')
    //can perhaps comment these back in later
    // const facebookPath = path.join(process.cwd(), '/public/media/email/facebook-svgrepo-com.png');
    // const instagramPath = path.join(process.cwd(), '/public/media/email/instagram-svgrepo-com.png');
    // const youtubePath = path.join(process.cwd(), '/public/media/email/youtube-svgrepo-com.png');
    // const twitterPath = path.join(process.cwd(), '/public/media/email/twitter-svgrepo-com.png');
    // const tiktokPath = path.join(process.cwd(), '/public/media/email/tiktok-svgrepo-com.png');

    const imagePaths = [ faviconPath, mujerConTarjetaCreditoPath];

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
                    cid: path.basename(imagePath)
                }
                files.push(file);
            }
        
            const subject = `Orden #${paymentEmailInformation.orderNumber} confirmado`;
            const text = `Orden #${paymentEmailInformation.orderNumber} confirmado`

            //orderEmail es una funcion que toma como parametros toda la
            //informacion necesaria para el email y retorna el html del email como string
            const html = paymentConfirmationEmail(paymentEmailInformation)
            mg.messages.create('viajaresim.com', {
                from: "ViajareSIM <noreply@viajaresim.com>",
                to: [paymentEmailInformation.email],  //mandar email al correo del cliente
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