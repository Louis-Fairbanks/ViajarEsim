import React from 'react'
import Header from '../components/HeaderComponents/Header'
import TopBar from '../components/HeaderComponents/TopBar'
import FooterAbove from '../components/HomeSections/FooterAbove'
import Footer from '../components/HomeSections/Footer'
import Image from 'next/image'
import SectionHeader from '../components/ReusableComponents/SectionHeader'
import GoNow from '../components/HomeSections/GoNow'
import Card from '../components/ReusableComponents/Card'
import Faqs from '../components/HomeSections/Faqs'
import Link from 'next/link'
import AdvantageBlurb from '../components/ReusableComponents/AdvantageBlurb'

const page = () => {
    const popularDestinations = [
        {
            popular: true,
            header: 'Estados Unidos',
            ISOcode: 'us',
            imgPath: '/media/statuaLibertad.png',
            alt: 'estados unidos'
        },
        {
            popular: true,
            header: 'Turquía',
            ISOcode: 'tr',
            imgPath: '/media/turquia.png',
            alt: 'turquía'
        },
        {
            popular: true,
            header: 'Reino Unido',
            ISOcode: 'gb',
            imgPath: '/media/granBen.png',
            alt: 'reino unido'
        }
    ]

    return (
        <>
            <div className='flex flex-col h-screen'>
                <TopBar />
                <Header />
                <div className='flex-grow px-64 flex items-center'>
                    <div className='flex flex-col w-1/2 gap-y-16'>
                        <h1 className="font-medium text-hero leading-body">¿Qué es una eSIM y cómo funciona?</h1>
                        <p>¿Sabías que tu teléfono probablemente no necesite una tarjeta SIM tradicional? Una eSIM puede ahorrarte dinero y evitar los costosos cargos de roaming. A continuación, te explicamos qué son las eSIM y cómo pueden ser una herramienta invaluable para tus viajes.</p>
                        <button className='bg-primary text-background rounded-custom w-1/2 px-48 py-16 font-medium
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
                    <Image className='absolute bottom-0 right-256 mr-256'
                        src='/media/globo.png'
                        alt='mundo'
                        width={200}
                        height={200}
                    />
                </div>
            </div>
            <div className='flex flex-col p-64 space-y-48 relative'>
                <div className='flex justify-between items-center'>
                    <SectionHeader
                        title='destinos populares'
                        header='Estos son los destinos más solicitados.'
                        subheader='Consulta nuestros planes de eSIM antes de tu próximo viaje:'
                        alignLeft={true}
                    />
                    <GoNow
                        ctaText='Ver todos los destinos'
                    />
                </div>
                <Image className='absolute left-32 top-128 scale-200 -z-10'
                    src='/media/avioncito.png'
                    alt='avion'
                    width={100}
                    height={100}
                />
                <div className='grid grid-cols-3 space-x-24 bg-background'>
                    {popularDestinations.map((destination, index) => (
                        <Card key={index} {...destination} />
                    ))
                    }
                </div>
            </div>
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
                        width={450}
                        height={457}
                    />
                </div>
                <Image className='absolute bottom-0 -left-32 scale-200'
                    src='/media/lamparita.svg'
                    alt=''
                    height={266}
                    width={198}
                />
            </div>
            <div className="flex flex-col p-64 space-y-48">
                <SectionHeader title="paso a paso" header="Conocé como activar tu eSIM fácilmente" />
                <div className='grid grid-cols-3 space-x-48'>
                    <div className='flex flex-col rounded-custom border-custom p-24 space-y-32 items-center'>
                        <div className='flex flex-col gap-12 justify-center text-center'>
                            <p className='font-extrabold text-hero leading-body text-accent'>1.</p>
                            <h2 className='font-semibold'>Verifica que tu teléfono sea compatible.</h2>
                            <div className='text-text-faded'>Verifica si tu smartphone es compatible <Link href='/faqs' className='font-bold text-primary'>aquí.</Link></div>
                        </div>
                        <hr></hr>
                        <div className='relative'>
                            <Image
                                src='/media/que-es-una-sim2.png'
                                alt='celular con esim'
                                height={288}
                                width={260}
                            />
                            <Image className='absolute top-64 right-32'
                                src='/media/puntitos.svg'
                                alt=''
                                height={24}
                                width={60}
                            />
                        </div>
                    </div>
                    <div className='flex flex-col rounded-custom border-custom p-24 space-y-32 items-center'>
                        <div className='flex flex-col gap-12 justify-center text-center'>
                            <p className='font-extrabold text-hero leading-body text-accent'>2.</p>
                            <h2 className='font-semibold'>Adquiere tu eSIM prepago.</h2>
                            <div className='text-text-faded'>Elige el plan de datos móviles que necesites.</div>
                        </div>
                        <hr></hr>
                        <div className='relative'>
                            <Image
                                src='/media/que-es-una-sim3.png'
                                alt='celular con esim'
                                height={250}
                                width={220}
                            />
                        </div>
                    </div>
                    <div className='flex flex-col rounded-custom border-custom p-24 space-y-32 items-center'>
                        <div className='flex flex-col gap-12 justify-center text-center'>
                            <p className='font-extrabold text-hero leading-body text-accent'>3.</p>
                            <h2 className='font-semibold'>Sigue las instrucciones enviadas por correo.</h2>
                            <div className='text-text-faded'>Te enviaremos un correo con las instrucciones.</div>
                        </div>
                        <hr></hr>
                        <div className='relative'>
                            <Image
                                src='/media/que-es-una-sim4.png'
                                alt='celular con esim'
                                height={534}
                                width={650}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex flex-col p-64 space-y-48'>
                <div className='flex flex-col rounded-2xl bg-green-gradient items-center text-center space-y-16 p-48 relative overflow-hidden'>
                    <h1 className='font-semibold text-large-heading w-1/2 leading-body'>
                        ¿Porqué usar una eSIM?</h1>
                    <p className='w-1/2'>Sabemos que no tener tu conexion a tus seres queridos puede ser dificil, por eso llegamos para ayudarte.</p>
                    <Image className='absolute -top-16 left-0'
                        src='/media/nube.png'
                        alt=''
                        height={156}
                        width={227}
                    />
                    <Image className='absolute -top-16 right-0 scale-x-[-1]'
                        src='/media/nube.png'
                        alt=''
                        height={156}
                        width={227}
                    />
                    <div className='grid grid-cols-3 space-x-64'>
                        <AdvantageBlurb
                            heading="Reduce los costos de roaming"
                            info="Los cargos de roaming pueden acumularse rápidamente. Consigue un plan de datos y manten el control de tu factura."
                            imgPath='/media/avioncito-negro.svg'
                            blackText={true}
                        />
                        <AdvantageBlurb
                            heading="Conexión inmediata"
                            info="Activa tu plan eSIM antes de tu vuelo y estarás conectado en cuanto aterrices."
                            imgPath='/media/rayo-negro.svg'
                            blackText={true}
                        />
                        <AdvantageBlurb
                            heading="Disfruta de planes adaptables"
                            info="Elige entre diversos planes de datos asequibles para cualquier destino. Obtén la cantidad de datos que necesites."
                            imgPath='/media/persona-saltando.svg'
                            blackText={true}
                        />
                    </div>
                </div>
            </div>

            <Faqs />
            <FooterAbove />
            <Footer />
        </>
    )
}

export default page
