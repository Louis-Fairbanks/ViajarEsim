import React, { Suspense } from 'react'
import Header from '../components/HeaderComponents/Header'
import TopBar from '../components/HeaderComponents/TopBar'
import Search from '../components/ReusableComponents/Search'
import Image from 'next/image'
import Footer from '../components/HomeSections/Footer'
import FooterAbove from '../components/HomeSections/FooterAbove'
import CountriesSection from './CountriesSection'

const page = () => {
    return (
        <div className='relative'>
            <Image className='absolute -translate-x-24 sm:translate-x-0 translate-y-full top-256 -left-128 -rotate-90 scale-200'
                src='/media/rectangle 8.svg'
                alt=''
                height={1200}
                width={340}
            />
            <Image className='absolute translate-x-24 sm:translate-x-0 translate-y-full top-256 -right-128 rotate-90 scale-200'
                src='/media/rectangle 8.svg'
                alt=''
                height={1200}
                width={340}
            />
            <div className='z-10 relative bg-background'>
                <TopBar />
                <Header />
            </div>
            <div className='relative p-24 sm:px-64 sm:py-24 justify-start flex flex-col items-center'>
                <div className='flex flex-col space-y-16 text-center w-full z-10 sm:w-3/4 justify-center items-center'>
                    <h1 className='font-medium text-large-heading leading-body'>Encontrá el destino perfecto para ti</h1>
                    <p className='text-center leading-body'>
                        Compra tu eSIM prepago online y conéctate al instante en más de 190 destinos internacionales. Disfruta de datos ilimitados en Europa, Estados Unidos, Japón, China, México, Turquía y muchos más. Tu conexión global en minutos.
                    </p>
                    <Search extraClasses='w-full lg:w-2/3' callAPIimmediately={true}/>
                </div>
            </div>
            <Suspense>
            <CountriesSection />
            </Suspense>
            <FooterAbove />
            <Footer />
        </div>
    )
}

export default page
