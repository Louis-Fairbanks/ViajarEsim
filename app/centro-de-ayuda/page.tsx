import React from 'react'
import TopBar from '../components/HeaderComponents/TopBar'
import Header from '../components/HeaderComponents/Header'
import GoNow from '../components/HomeSections/GoNow'
import { WhatsApp } from '@mui/icons-material'
import Image from 'next/image'
import FooterAbove from '../components/HomeSections/FooterAbove'
import Footer from '../components/HomeSections/Footer'
import PopularDestinations from '../components/ReusableComponents/PopularDestinations'
import Faqs from '../components/HomeSections/Faqs'
import ContactForm from '../components/ReusableComponents/ContactForm'
import ScrollHandler from './ScrollHandler'

const page = () => {
    return (
        <>
            <div className='flex flex-col h-screen'>
                <TopBar />
                <Header />
                <div className='flex-grow h-full flex flex-col justify-center items-center relative overflow-y-hidden'>
                    <Image className='absolute w-full -top-32'
                        src='/media/contacto-fondo.png'
                        alt='montañas'
                        width={650}
                        height={116}
                    />
                    <div className='flex flex-col space-y-16'>
                        <h1 className='text-medium text-hero leading-body text-center'>Sentite libre de contactarnos</h1>
                        <p className='text-center'>Nuestro equipo va a ayudarte en todo momento y con cualquier duda existente.</p>
                        <div className='flex space-x-16'>
                            <div className='border-custom rounded-custom flex items-center p-24 space-x-24 w-full relative overflow-hidden'>
                                <div className='h-64 w-64 bg-whatsapp-green rounded-full flex 
                                border-custom items-center justify-center'>
                                    <WhatsApp style={{ fill: '#fff', height: '40px', width: '40px' }} />
                                </div>
                                <div className='flex flex-col space-y-8'>
                                    <h3 className='font-semibold text-subheading'>WhatsApp</h3>
                                    <GoNow ctaText='Contactar' />
                                </div>
                                <Image className='absolute -bottom-16 -right-16 scale-200'
                                    src='/media/earth-1.svg'
                                    alt=''
                                    height={100}
                                    width={100}
                                />
                            </div>
                            <div className='border-custom rounded-custom flex items-center p-24 space-x-24 w-full relative overflow-hidden'>
                                <div className='h-64 w-64 bg-primary rounded-full flex 
                                border-custom justify-end items-end'>
                                    <Image
                                        src='/media/sobre.svg'
                                        alt=''
                                        width={50}
                                        height={30}
                                    />
                                </div>
                                <div className='flex flex-col space-y-8'>
                                    <h3 className='font-semibold text-subheading'>WhatsApp</h3>
                                    <GoNow ctaText='Contactar' />
                                </div>
                                <Image className='absolute -bottom-16 -right-16 scale-200'
                                    src='/media/earth-1.svg'
                                    alt=''
                                    height={100}
                                    width={100}
                                />
                            </div>
                        </div>
                    </div>
                    <Image className='absolute w-full -bottom-32'
                        src='/media/contacto-fondo2.png'
                        alt='montañas'
                        width={650}
                        height={116}
                    />
                </div>
            </div>
            <ContactForm showEnvelope={true} />
            <Faqs />
            <div className='flex flex-col space-y-48 p-64 relative'>
                <div className='bg-green-gradient rounded-2xl flex flex-col space-y-16 p-48'>
                    <h1 className='font-semibold text-large-heading leading-body'>
                        ¿Sos un influencer o creador de contenido?</h1>
                    <p className='w-1/3'>
                        No dudes en contactarnos, estamos muy interesados en ayudarte a crear contenido
                    </p>
                    <button className='rounded-custom text-background bg-primary w-1/4 text-medium p-8'>Contactar</button>
                </div>
                <Image className='absolute right-16 bottom-48'
                    src='/media/dos-personas-en-auto.png'
                    alt='dos personas en auto con palmeras'
                    width={487}
                    height={338}
                />
            </div>
            <PopularDestinations />
            <FooterAbove />
            <Footer />
            <ScrollHandler />
        </>
    )
}

export default page
