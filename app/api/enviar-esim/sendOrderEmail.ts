import { EmailInformation } from "@/app/components/Types/TEmailInformation";
import formData from 'form-data';
import Mailgun from 'mailgun.js';
import { orderEmail } from './order-email';
import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';
import QRCode from 'qrcode';

export async function sendOrderEmail(emailInfo : EmailInformation) {

    const emailText = `ViajareSIM

Order ${emailInfo.orderNumber}

${emailInfo.userFirstName} ${emailInfo.userLastName} tu eSIM esta lista

${emailInfo.regionName}
Datos: ${emailInfo.data}
Duración: ${emailInfo.duration === '1' ? emailInfo.duration + ' Día' : emailInfo.duration + ' Días'}

1. Instala tu eSIM

Por favor, préstale mucha atención a la siguiente información.

Puedes instalarlo antes o durante tu viaje utilizando el código QR a continuación o ingresando los códigos manualmente que se encuentran en este correo electrónico.

- Ve a Ajustes en tu dispositivo.
- Escanea el código QR o copia y pega los códigos manualmente.
- Configura tu eSIM

Te recomendamos conectarte a una red Wi-Fi estable para asegurar un proceso de instalación exitoso y sencillo.

Descubre instrucciones paso a paso en nuestro sitio web.

[Ir a instalación de eSIM]

2. Activa tu eSIM

Una vez completada la instalación, estarás listo para activar tu eSIM. Ten en cuenta que este paso puede tardar hasta 4 minutos y debe realizarse únicamente cuando hayas llegado a tu destino.

- Ve a Ajustes en tu dispositivo.
- Selecciona tu ViajareSIM eSIM.
- Prende los datos roaming.

Te recomendamos conectarte a una red Wi-Fi estable para asegurar un proceso de instalación exitoso y sencillo.

Instala tu eSIM con código QR

Escanea el código QR desde la Configuración de tu dispositivo móvil. Ten en cuenta que puedes instalarla antes o durante tu viaje.

O instala manualmente

Encuentra el código para tu sistema operativo correspondiente justo abajo. Recuerda que los pasos detallados están en el sitio web o en las guías en PDF.

Para Apple

Dirección SM-DP+: ${emailInfo.smdpAddress}
Código de activación: ${emailInfo.activationCodeIos}
Código de confirmación: No requerido

Para Android

Código de activación: ${emailInfo.activationCodeAndroid}

¿Necesitas ayuda con algun problema?

No dudes en contactarnos ante cualquier inquietud.

[Ir a centro de ayuda]

ViajareSIM`;
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
    const imagePaths = [ appleLogoPath, androidLogoPath, faviconPath, mujerLlamandoPath, hombreConCelularPath, settingsSvgPath, qrCodeScannerSvgPath, simCardSvgPath, noticePath, checklistPath];

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

        const subject = `${emailInfo.userFirstName}, tu eSIM a ${emailInfo.regionName} está lista`;

        const html = orderEmail(emailInfo);

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