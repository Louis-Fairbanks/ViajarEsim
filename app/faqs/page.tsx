import React from 'react'
import Image from 'next/image'
import SearchIcon from '@mui/icons-material/Search';
import Faqs from '../components/HomeSections/Faqs';
import FooterAbove from '../components/HomeSections/FooterAbove';
import Footer from '../components/HomeSections/Footer';
import HowToActivate from '../components/ReusableComponents/HowToActivate';
import GradientCard from '../components/ReusableComponents/GradientCard';
import TopBarAndHeader from '../components/HeaderComponents/TopBarAndHeader';

const page = () => {
    return (
        <>
            <div className='flex flex-col h-screen'>
                <TopBarAndHeader/>
                <div className='flex flex-grow h-full relative justify-center items-center overflow-y-hidden'>
                    <Image className='absolute w-full z-20 -top-64'
                        src='/media/fondoOlas.png'
                        alt=''
                        width={650}
                        height={78}
                    />
                    <Image className='absolute w-full -bottom-64 rotate-180'
                        src='/media/fondoOlas.png'
                        alt=''
                        width={650}
                        height={78}
                    />
                    <Image className='absolute right-0 top-32'
                        src='/media/lightbulb.svg'
                        alt=''
                        width="300"
                        height="300"
                    />
                    <Image className='absolute bottom-0 -left-64 scale-150 -z-10'
                        src='/media/campana.svg'
                        alt=''
                        width='300'
                        height='300'
                    />
                    <div className='flex flex-col space-y-16 text-center items-center'>
                        <h1 className='font-medium text-hero leading-body'>
                            Preguntas comunes sobre la eSIM
                        </h1>
                        <p>
                            Pregúntanos; probablemente tengamos la respuesta que buscas.
                        </p>
                        <form className='flex justify-between pl-24 pr-12 py-8 border-custom rounded-custom shadow-input w-2/3'>
                            <input className='w-full' type='text' placeholder="Pregunta lo que necesites"/>
                            <button className='bg-primary rounded-custom p-10'><SearchIcon style={{ fill: 'white' }} /></button>
                        </form>
                    </div>
                </div>
            </div>
            <Faqs/>
            <HowToActivate/>
            <div className='flex space-x-48 px-64 pt-64 pb-32'>
                <GradientCard 
                    backgroundColor='bg-green-gradient'
                    heading='Revisa si tu dispositivo es compatible'
                    subheading='No te olvides de revisar si tu dispositivo es compatible para poder estar seguros que la eSIM podrá ser utilizada en el mismo.'
                    buttonText='Ver compatibilidad'
                />
                <GradientCard 
                    backgroundColor='bg-yellow-gradient'
                    heading='Conoce como instalar y activar la eSIM'
                    subheading='Sabemos que no tener tu conexion a tus seres queridos puede ser dificil, por eso llegamos para ayudarte.'
                    buttonText='Ir a instrucciónes'
                />
            </div>
            <FooterAbove/>
            <Footer/>
        </>
    )
}

export default page
