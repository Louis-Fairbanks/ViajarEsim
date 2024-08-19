import React from 'react'
import Header from '../components/HeaderComponents/Header'
import TopBar from '../components/HeaderComponents/TopBar'
import FooterAbove from '../components/HomeSections/FooterAbove'
import Footer from '../components/HomeSections/Footer'
import Image from 'next/image'
import Faqs from '../components/HomeSections/Faqs'
import AdvantageBlurb from '../components/ReusableComponents/AdvantageBlurb'
import HowToActivate from '../components/ReusableComponents/HowToActivate'
import PopularDestinations from '../components/ReusableComponents/PopularDestinations'
import WhyUseSim from '../components/ReusableComponents/WhyUseSim'

const page = () => {
    return (
        <>
            <div className='flex flex-col h-screen'>
                <TopBar />
                <Header />
                <div className='flex-grow px-64 flex items-center'>
                    <div className='flex flex-col w-1/2 gap-y-16'>
                        <h1 className="font-medium text-hero leading-body">¿Qué es una eSIM y cómo funciona?</h1>
                        <p>¿Sabías que tu teléfono probablemente no necesite una tarjeta SIM tradicional? Una eSIM puede ahorrarte dinero y evitar los costosos cargos de roaming. A continuación, te explicamos qué son las eSIM y cómo pueden ser una herramienta invaluable para tus viajes.</p>
                        <button className='bg-primary text-background rounded-custom w-1/2 px-48 py-8 font-medium
                        text-body'>Selecciona tu destino</button>
                    </div>
                    <Image className='absolute right-0 bottom-0'
                        src='/media/mano-con-celular.png'
                        alt='mano con celular'
                        height={908}
                        width={743}
                    />
                    <Image className='absolute top-128 right-0 scale-x-[-1]'
                        src='/media/avioncito.png'
                        alt=''
                        height={300}
                        width={300}
                    />
                    <Image className='absolute bottom-64 right-256 mr-128 -z-20'
                        src='/media/earth-1.svg'
                        alt='mundo'
                        width={200}
                        height={200}
                    />
                    <Image className='absolute bottom-0 right-0 -z-10'
                        src='/media/fondo-esquina.svg'
                        alt=''
                        height={400}
                        width={600}
                    />
                </div>
            </div>
            <PopularDestinations />
            <div className='p-64 relative'>
                <div className='flex justify-between items-center space-x-128' >
                    <div className='flex flex-col space-y-12'>
                        <h1 className='font-semibold text-large-heading leading-body'>¿Qué es una eSIM?</h1>
                        <p>
                            Una eSIM, o SIM embebida, es una tarjeta SIM digital integrada directamente en tu dispositivo, eliminando la necesidad de una tarjeta SIM física. Permite activar y gestionar planes de datos móviles sin cambiar tarjetas, facilitando la conexión y ayudando a evitar cargos de roaming al viajar.
                        </p>
                    </div>
                    <Image
                        src='/media/que-es-una-sim.png'
                        alt=''
                        width={550}
                        height={550}
                    />
                </div>
                <Image className='absolute bottom-0 -left-32 scale-200'
                    src='/media/lamparita.svg'
                    alt=''
                    height={266}
                    width={198}
                />
            </div>
            <HowToActivate />
            <WhyUseSim backgroundColor='green' />
            <Faqs />
            <FooterAbove />
            <Footer />
        </>
    )
}

export default page
