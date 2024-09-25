import React from 'react'
import TopBarAndHeader from '../components/HeaderComponents/TopBarAndHeader'
import FooterAbove from '../components/HomeSections/FooterAbove'
import Footer from '../components/HomeSections/Footer'
import ChatScript from '../components/ReusableComponents/ChatScript'
import { getTranslations } from 'next-intl/server'

const fetchTranslations = async () =>{
    return await getTranslations('TermsAndConditions')
}


const page = async () => {

  const translations = await fetchTranslations()


  return (
    <>
      <TopBarAndHeader/>
      <h1 className='text-center pt-64 leading-body text-heading font-bold'>{translations('title')}</h1>
      <div className='p-24 sm:px-64 leading-body'>
        <ul className='flex flex-col space-y-12'>
          <li>{translations("11")}</li>
          <li>{translations('12')}</li>
          <li>{translations('21')}</li>
          <li>{translations('22')}</li>
          <li>{translations('31')}</li>
          <li>{translations('32')}</li>
          <li>{translations('41')}</li>
          <li>{translations('51')}</li>
          <li>{translations('61')}</li>
          <li>{translations('71')}</li>
          <li>{translations('81')}</li>
          <li>{translations('91')}</li>
          <li>{translations('101')}</li>
          <li>{translations('102')}</li>
          <li>{translations('103')}</li>
          <li>{translations('111')}</li>
          <li>{translations('121')}</li>
        </ul>
      </div>
      <FooterAbove/>
      <Footer/>
      <ChatScript/>
    </>
  )
}

export default page
