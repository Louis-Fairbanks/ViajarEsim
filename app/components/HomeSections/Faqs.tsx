import React from 'react'
import SectionHeader from '../SectionHeader'
import Faq from './Faq'
import { preguntasFrecuentes } from '../PreguntasFrecuentes'
import Image from 'next/image'



const Faqs = () => {
    return (
        <div className='flex flex-col p-64 space-y-48 justify-center relative'>
            <Image className='absolute top-64 -left-32'
                src='/media/flecha.png'
                alt=''
                height={258}
                width={215}
            />
            <Image className='absolute top-0 right-0 rotate-180'
                src='/media/flecha.png'
                alt=''
                height={258}
                width={215}
            />
            <SectionHeader title='Preguntas frecuentes' header="Resuelve todas tus dudas con nuestra ayuda."
                subheader='Aquí encontrarás respuestas a las preguntas más comunes de los viajeros.' />
            <div className='flex space-x-24 mx-auto'>
                <button className='rounded-custom border border-text-faded py-8 px-24 w-128'>Uso</button>
                <button className='rounded-custom border border-text-faded py-8 px-24 w-128'>Recarga</button>
                <button className='rounded-custom border border-text-faded py-8 px-24 w-128'>Instalación</button>
                <button className='rounded-custom border border-text-faded py-8 px-24 w-128'>Soporte</button>
            </div>
            <div className='grid grid-cols-2 gap-x-24 gap-y-16'>
                {preguntasFrecuentes.map((faq, index) => {
                    return <Faq key={index} question={faq.question} />
                })
                }
            </div>
        </div>
    )
}

export default Faqs
