import React, { Suspense } from 'react'
import Search from '../components/ReusableComponents/Search'
import Image from 'next/image'
import Footer from '../components/HomeSections/Footer'
import FooterAbove from '../components/HomeSections/FooterAbove'
import CountriesSection from './CountriesSection'
import TopBarAndHeader from '../components/HeaderComponents/TopBarAndHeader'
import ChatScript from '../components/ReusableComponents/ChatScript'
import { useTranslations } from 'next-intl'

const page = () => {

    const translations = useTranslations('Destinations')

    return (
        <div className='relative'>
            {/* <Image className='absolute -top-128 -left-165 scale-75'
                src='/media/rectangle 5.svg'
                alt=''
                height={1200}
                width={340}
            />
            <Image className='absolute -top-128 -right-165 scale-75 rotate-180'
                src='/media/rectangle 5.svg'
                alt=''
                height={1200}
                width={340}
            /> */}
            <div className='z-10 relative bg-background'>
                <TopBarAndHeader/>
            </div>
            <div className='relative p-24 sm:px-64 sm:py-24 justify-start flex flex-col items-center'>
                <div className='flex flex-col space-y-12 lg:space-y-24 text-center w-full sm:w-3/4 justify-center items-center'>
                    <h1 className='font-medium text-large-heading leading-body'>{translations('heading')}</h1>
                    <p className='text-center leading-body'>
                        {translations('subheading')}
                    </p>
                    <Search extraClasses='w-full lg:w-2/3' callAPIimmediately={true}/>
                </div>
            </div>
            <Suspense>
            <CountriesSection />
            </Suspense>
            <FooterAbove />
            <Footer />
            <ChatScript/>
        </div>
    )
}

export default page
