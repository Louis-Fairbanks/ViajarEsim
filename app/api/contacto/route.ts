import { NextRequest, NextResponse } from "next/server";
import formData from 'form-data';
import Mailgun from 'mailgun.js';

interface ContactFormData {
    nombre: string;
    apellido: string;
    telefono: string;
    correo: string;
    // razon: string;
    mensaje: string;
  }

export async function POST(request: NextRequest) {

    const body = await request.json()
    if (!isContactFormData(body)) {
        return NextResponse.json({ error: 'Invalid data provided' }, { status: 400 });
      }
      const contactFormData: ContactFormData = body;

    const mailgunAPIKey = process.env.MAILGUN_API_KEY;
    if (!mailgunAPIKey) {
        console.log('mailgunAPIKey is not set');
        return NextResponse.json({ error: 'Mailgun API key is not set' }, { status: 500 });
    }
    else {

    const mailgun = new Mailgun(formData);
    const mg = mailgun.client({
        username: 'api',
        key: mailgunAPIKey
    });
        const subject = `${contactFormData.nombre} tiene una consulta`;
        const text = contactFormData.mensaje;

        const result = await mg.messages.create('viajaresim.com', {
            from: "ViajareSIM <noreply@viajaresim.com>",
            to:  'help@viajaresim.com',
            subject: subject,
            text: text,
            html: `<h1>Hola ViajareSIM, soy ${contactFormData.nombre} ${contactFormData.apellido}</h1><p>Les contacto por: </p>
            <p>${contactFormData.mensaje}</p><p>Correo: ${contactFormData.correo}</p><p>Telefono: ${contactFormData.telefono}</p>`
        });
        if(!result){
            return NextResponse.json({ error: 'Error sending email' }, { status: 500 });
        }
        else {
            return NextResponse.json({ success: 'Email sent' });
        }
    }
}

function isContactFormData(obj: any){
    return (
      typeof obj.nombre === 'string' &&
      typeof obj.apellido === 'string' &&
      typeof obj.telefono === 'string' &&
      typeof obj.correo === 'string' &&
    //   typeof obj.razon === 'string' &&
      typeof obj.mensaje === 'string'
    );
  }