import React from 'react'
import ButtonDark from '../components/ReusableComponents/ButtonDark'
import Image from 'next/image'

const PlanReadyToInstall = () => {

    const scrollToSection = () => {
        const section: HTMLElement | null = document.querySelector('#activationSection');
        if (!section) return;
        else { section.scrollIntoView({ behavior: 'smooth', block: 'start'}); }
    };

    return (
        <div className='bg-green-gradient rounded-2xl mx-24 sm:mx-64 flex justify-between p-24 sm:p-64 relative'>
            <div className='flex flex-col space-y-16'>
            <h1 className='font-semibold text-heading'>¡Felicitaciones! Ya tienes tu plan instalado y listo para activar.</h1>
            <p>Activa solamente al llegar a tu destino!</p>
            <ButtonDark extraClasses='px-32 py-8 w-full sm:w-3/4 lg:w-1/2' onClick={() => scrollToSection()}>Ver proceso de activación</ButtonDark>
            </div>
            <Image className='absolute right-0 -top-32 hidden lg:block'
                src='/media/hombre-con-checklist-grande.png'
                alt='hombre con checklist grande'
                width={400}
                height={395}
            />
        </div>
    )
}

export default PlanReadyToInstall
