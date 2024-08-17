import React from 'react'
import SectionHeader from '../ReusableComponents/SectionHeader'
import Image from 'next/image'
import FaqSection from '../ReusableComponents/FaqSection'

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
            <FaqSection/>
        </div>
    )
}

export default Faqs
