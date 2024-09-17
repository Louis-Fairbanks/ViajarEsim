import React from 'react'
import FooterAbove from '../components/HomeSections/FooterAbove'
import Footer from '../components/HomeSections/Footer'
import Image from 'next/image'
import Faqs from '../components/HomeSections/Faqs'
import HowToActivate from '../components/ReusableComponents/HowToActivate'
import PopularDestinations from '../components/ReusableComponents/PopularDestinations'
import WhyUseSim from '../components/ReusableComponents/WhyUseSim'
import ButtonDark from '../components/ReusableComponents/ButtonDark'
import Link from 'next/link'
import TopBarAndHeader from '../components/HeaderComponents/TopBarAndHeader'

const page = () => {
    return (
        <>
            <div className='flex flex-col h-screen'>
                <TopBarAndHeader/>
                <div className='flex-grow px-24 sm:pl-64 sm:pr-0 flex items-center overflow-hidden relative'>
                    <div className='flex flex-col items-center sm:items-start text-center sm:text-start  w-full sm:w-1/2 gap-y-16'>
                        <h1 className="font-medium text-hero leading-body">¿Qué es una eSIM y cómo funciona?</h1>
                        <p>¿Sabías que tu teléfono probablemente no necesite una tarjeta SIM tradicional? Una eSIM puede ahorrarte dinero y evitar los costosos cargos de roaming. A continuación, te explicamos qué son las eSIM y cómo pueden ser una herramienta invaluable para tus viajes.</p>
                        <Link href='/destinos' className='w-full sm:w-full md:w-3/4 xl:w-1/2'>
                            <ButtonDark extraClasses='w-full px-48 py-8 whitespace-nowrap relative z-[1]'>Selecciona tu destino</ButtonDark>
                        </Link>
                    </div>
                    <div className='absolute w-full sm:w-1/2 h-full sm:relative lg:scale-x-125 xl:scale-x-100'>
                        <Image className='hidden lg:block'
                            priority
                            src='/media/mano-con-celular.png'
                            alt='mano con celular'
                            fill={true}
                        />
                        <Image className='absolute bottom-0 -right-24 -z-10'
                            src='/media/fondo-esquina.svg'
                            alt=''
                            height={400}
                            width={600}
                        />
                        <Image className='absolute -top-64 sm:top-0 md:top-0 lg:-top-64 -right-128 sm:right-0 scale-x-[-1] -z-10'
                            src='/media/avioncito.png'
                            alt=''
                            height={300}
                            width={300}
                        />
                        <Image className='absolute bottom-0 -left-64 lg:-left-16 xl:left-32 -z-20'
                            src='/media/earth-1.svg'
                            alt='mundo'
                            width={200}
                            height={200}
                        />
                    </div>

                </div>
            </div>
            <PopularDestinations />
            <div className='p-24 sm:p-64'>
                <div className='flex flex-col lg:flex-row justify-between items-center space-x-0 xl:space-x-128' >
                    <div className='flex flex-col space-y-12 text-center lg:text-start relative'>
                        <h1 className='font-semibold text-large-heading leading-body'>¿Qué es una eSIM?</h1>
                        <p>
                            Una eSIM, o SIM embebida, es una tarjeta SIM digital integrada directamente en tu dispositivo, eliminando la necesidad de una tarjeta SIM física. Permite activar y gestionar planes de datos móviles sin cambiar tarjetas, facilitando la conexión y ayudando a evitar cargos de roaming al viajar.
                        </p>
                        <Image className='absolute -left-64 -bottom-128 sm:-left-128 lg:-bottom-128 lg:translate-y-64 lg:-left-128 -z-10 lg:scale-150'
                            src='/media/lamparita.svg'
                            alt=''
                            height={266}
                            width={198}
                        />
                    </div>
                    <Image
                        src='/media/que-es-una-sim.png'
                        alt=''
                        width={550}
                        height={550}
                    />
                </div>
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
