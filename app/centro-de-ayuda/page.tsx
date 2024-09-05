import React from 'react'
import GoNow from '../components/HomeSections/GoNow'
import { WhatsApp } from '@mui/icons-material'
import Image from 'next/image'
import FooterAbove from '../components/HomeSections/FooterAbove'
import Footer from '../components/HomeSections/Footer'
import PopularDestinations from '../components/ReusableComponents/PopularDestinations'
import Faqs from '../components/HomeSections/Faqs'
import ContactForm from '../components/ReusableComponents/ContactForm'
import ScrollHandler from './ScrollHandler'
import ButtonDark from '../components/ReusableComponents/ButtonDark'
import TopBarAndHeader from '../components/HeaderComponents/TopBarAndHeader'

const page = () => {
    return (
        <>
            <div className='flex flex-col h-screen'>
                <TopBarAndHeader/>
                <div className='flex-grow h-full flex flex-col justify-center items-center relative overflow-y-hidden'>
                    <Image className='absolute w-full -top-32'
                        src='/media/contacto-fondo.png'
                        alt='montañas'
                        width={650}
                        height={116}
                    />
                    <div className='flex flex-col items-center space-y-16 px-24'>
                        <h1 className='text-medium text-hero leading-body text-center'>Sentite libre de contactarnos</h1>
                        <p className='text-center'>Nuestro equipo va a ayudarte en todo momento y con cualquier duda existente.</p>
                        <div className='flex flex-col md:flex-row space-y-16 md:space-y-0 md:space-x-16 w-full sm:w-1/2 md:w-full'>
                            <div className='border-custom rounded-custom flex items-center p-24 space-x-24 w-full relative overflow-hidden'>
                                <div className='h-64 w-64 bg-whatsapp-green rounded-full flex 
                                border-custom items-center justify-center'>
                                    <WhatsApp style={{ fill: '#fff', height: '40px', width: '40px' }} />
                                </div>
                                <div className='flex flex-col space-y-8'>
                                    <h3 className='font-semibold text-subheading'>WhatsApp</h3>
                                    <GoNow ctaText='Contactar' />
                                </div>
                                <Image className='absolute -bottom-32 -right-48 xl:-bottom-16 xl:-right-16 xl:scale-200'
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
                                    <h3 className='font-semibold text-subheading'>Email</h3>
                                    <GoNow ctaText='Contactar' />
                                </div>
                                <Image className='absolute -bottom-32 -right-48 xl:-bottom-16 xl:-right-16 xl:scale-200'
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
            <div className='flex flex-col space-y-48 p-24 sm:p-64 relative overflow-hidden'>
                <div className='bg-green-gradient rounded-2xl flex flex-col space-y-16 p-24 sm:p-48 text-center lg:text-start'>
                    <h1 className='font-semibold text-heading sm:text-large-heading leading-body w-full lg:w-1/2 xl:w-full'>
                        ¿Sos un influencer o creador de contenido?</h1>
                    <p className='w-full lg:w-1/3'>
                        No dudes en contactarnos, estamos muy interesados en ayudarte a crear contenido
                    </p>
                    <ButtonDark extraClasses='w-3/4 mx-auto sm:w-1/2 lg:m-0 lg:w-1/4 p-8'>Contactar</ButtonDark>
                </div>
                <Image className='absolute hidden lg:block right-16 bottom-48'
                    src='/media/dos-personas-en-auto.png'
                    alt='dos personas en auto con palmeras'
                    width={487}
                    height={338}
                />
            </div>
            <PopularDestinations />
            <FooterAbove />
            <Footer />
            {/* <ScrollHandler /> */}
        </>
    )
}

export default page
