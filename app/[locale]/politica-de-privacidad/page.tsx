import TopBarAndHeader from '../components/HeaderComponents/TopBarAndHeader'
import Footer from '../components/HomeSections/Footer'
import FooterAbove from '../components/HomeSections/FooterAbove'
import React from 'react'
import ChatScript from '../components/ReusableComponents/ChatScript'
import { getTranslations } from 'next-intl/server'

const fetchTranslations = async () =>{
    return await getTranslations('PrivacyPolicy')
}

const page = async () => {

    const translations = await fetchTranslations()

    return (
        <>
            <TopBarAndHeader />
            <h1 className='text-center pt-64 text-heading font-bold'>{translations('title')}</h1>
            <div className='p-24 sm:p-64'>
                <ul className='flex flex-col space-y-12'>
                    <li>{translations('1')}</li>
                    <li>{translations('2')}</li>
                    <li>{translations('3')}</li>
                    <li>{translations('4')}</li>
                    <li>{translations('5')}</li>
                    <li>{translations('6')}</li>
                    <li>{translations('7')}</li>
                    <li>{translations('8')}</li>
                </ul>
            </div>
            <FooterAbove />
            <Footer />
            <ChatScript />
        </>
    )
}

export default page
