import TopBarAndHeader from '@/app/components/HeaderComponents/TopBarAndHeader'
import Footer from '@/app/components/HomeSections/Footer'
import FooterAbove from '@/app/components/HomeSections/FooterAbove'
import React from 'react'
import ChatScript from '../components/ReusableComponents/ChatScript'

const page = () => {
    return (
        <>
            <TopBarAndHeader />
            <h1 className='text-center pt-64 text-heading font-bold'>Política de Privacidad de ViajareSIM</h1>
            <div className='p-24 sm:p-64'>
                <ul className='flex flex-col space-y-12'>
                    <li>1. Introducción: ViajareSIM, una empresa registrada en Uruguay, se compromete a proteger la privacidad de los usuarios de nuestro sitio web y servicios. Esta Política de Privacidad explica cómo recopilamos, utilizamos y protegemos su información personal.</li>
                    <li>2. Información que Recopilamos: Recopilamos la siguiente información: Nombre, Dirección de correo electrónico, Información relacionada con la compra de eSIM.</li>
                    <li>3. Uso de la Información: Utilizamos su información personal únicamente para: Procesar su compra de eSIM, Enviarle información sobre su eSIM adquirida, Enviarle confirmaciones de compra, Proporcionar soporte al cliente. No utilizamos su información para marketing por correo electrónico ni compartimos sus datos con terceros para fines publicitarios.</li>
                    <li>4. Almacenamiento y Seguridad de Datos: Implementamos medidas de seguridad técnicas y organizativas para proteger sus datos personales contra acceso no autorizado, pérdida o alteración.</li>
                    <li>5. Sus Derechos: Usted tiene derecho a: Acceder a sus datos personales, Corregir datos inexactos. Para ejercer estos derechos, contáctenos a través de contacto@viajaresim.com.</li>
                    <li>7. Cambios en la Política de Privacidad: Nos reservamos el derecho de modificar esta política. Los cambios serán notificados a través de nuestro sitio web.</li>
                    <li>8. Contacto: Si tiene preguntas sobre esta Política de Privacidad, contáctenos: Correo electrónico: contacto@viajaresim.com, WhatsApp: +549 112 513 7092</li>
                    <li>9. Legislación Aplicable: Esta Política de Privacidad se rige por las leyes de Uruguay. Última actualización: 11 de septiembre de 2024</li>
                </ul>
            </div>
            <FooterAbove />
            <Footer />
            <ChatScript/>
        </>
    )
}

export default page
