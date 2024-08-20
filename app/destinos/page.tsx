import React from 'react'
import Header from '../components/HeaderComponents/Header'
import TopBar from '../components/HeaderComponents/TopBar'
import Breadcrumbs from '../components/HeaderComponents/Breadcrumbs'
import Search from '../components/ReusableComponents/Search'
import Image from 'next/image'
import Footer from '../components/HomeSections/Footer'
import FooterAbove from '../components/HomeSections/FooterAbove'
import CountriesSection from './CountriesSection'

const page = () => {
    return (
        <>
            <div className='h-screen flex flex-col'>
                <TopBar />
                <Header />
                <Breadcrumbs />
                <div className='relative p-64 justify-center flex flex-col items-center h-full overflow-y-hidden'>
                    <Image className='absolute -left-128 -rotate-90 scale-200'
                        src='/media/rectangle 8.svg'
                        alt=''
                        height={1200}
                        width={340}
                    />
                    <div className='flex flex-col space-y-16 text-center w-3/4 justify-center items-center'>
                        <h1 className='font-medium text-hero leading-body'>Encontrá el destino perfecto para ti</h1>
                        <p className='text-center leading-body'>
                            Descubre y adquiere online las mejores eSIMs prepago para tus viajes. Conéctate a Internet en minutos en numerosos destinos globales. Disfruta de datos ilimitados en regiones clave como Europa, México, China, Turquía, Japón y Estados Unidos.
                        </p>
                        <Search extraClasses='w-2/3' />
                    </div>
                    <Image className='absolute -right-128 rotate-90 scale-200'
                        src='/media/rectangle 8.svg'
                        alt=''
                        height={1200}
                        width={340}
                    />
                </div>
            </div>
            <CountriesSection/>
            <FooterAbove />
            <Footer />
        </>
    )
}

export default page
