'use client'
import React, { useEffect, useState } from 'react'
import LanguageOrCurrencyButton from './LanguageOrCurrencyButton'
import { useTranslations } from 'next-intl'
import { Link } from '@/routing'
import { usePathname } from '@/routing'



const LanguageAndCurrency = () => {

    const [selectedLanguageField, setSelectedLanguageField] = useState<string>('Español');
    const [selectedCurrencyField, setSelectedCurrencyField] = useState<string>('USD');

    const translations = useTranslations('Header')
    const path = usePathname()

  useEffect(() => {
    // Function to get the value of NEXT_LOCALE cookie
    const getNextLocaleCookie = () => {
      const cookies = document.cookie.split(';');
      for (let cookie of cookies) {
        const [name, value] = cookie.trim().split('=');
        if (name === 'NEXT_LOCALE') {
          return value;
        }
      }
      return null; // Return null if cookie not found
    };

    const locale = getNextLocaleCookie();
    if(!locale){
        setSelectedLanguageField('Español');
    }

    if (locale === 'en') {
      setSelectedLanguageField('Inglés');
    } else if (locale === 'br'){
      setSelectedLanguageField('Portugues')
    }else if (locale === 'es') {
      setSelectedLanguageField('Español');
    } else {
      setSelectedLanguageField('Español');
    }
  }, []); 


    return (
        <>
            <div className='flex flex-col space-y-24 py-24 mt-12 border-b-custom border-t-custom'>
                    <Link locale='es' href={`/${path}`}><LanguageOrCurrencyButton language="Español" translation='Spanish' selectedField={selectedLanguageField}
                        onClick={() => {
                            setSelectedLanguageField('Español')
                        }} /></Link>
                    <Link locale='en' href={`/${path}`}><LanguageOrCurrencyButton language="Inglés" translation='English' selectedField={selectedLanguageField}
                        onClick={() => {
                            setSelectedLanguageField('Inglés')
                            }} /></Link>
               <Link locale='br' href={`/${path}`}> <LanguageOrCurrencyButton language="Portugues" translation='Portuguese' selectedField={selectedLanguageField}
                    onClick={() => {
                        setSelectedLanguageField('Portugues')
                        }} /></Link>
            </div>
            <div className='flex flex-col space-y-24'>
                <h2 className='font-medium text-heading leading-body py-12 border-b-custom'>
                    {translations('divisaPreferida')}</h2>
                <LanguageOrCurrencyButton language='USD' selectedField={selectedCurrencyField}
                    onClick={setSelectedCurrencyField} />
                <LanguageOrCurrencyButton language='EUR' selectedField={selectedCurrencyField}
                    onClick={setSelectedCurrencyField} />
                <LanguageOrCurrencyButton language='MXN' selectedField={selectedCurrencyField}
                    onClick={setSelectedCurrencyField} />
            </div>
        </>
    )
}

export default LanguageAndCurrency
