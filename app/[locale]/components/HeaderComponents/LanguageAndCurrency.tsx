'use client'
import React, { useEffect, useState } from 'react'
import LanguageOrCurrencyButton from './LanguageOrCurrencyButton'
import { useTranslations } from 'next-intl'
import { Link } from '@/routing'
import { usePathname } from '@/routing'
import { useSearchParams } from 'next/navigation'
import { useShopping } from '../ShoppingContext/ShoppingContext'
import CurrencyModal from './CurrencyModal'
import { useLocale } from 'next-intl'
import OtherLanguagesModal from './OtherLanguagesModal'



const LanguageAndCurrency = () => {

  const [selectedLanguageField, setSelectedLanguageField] = useState<string>('Español');
  const [selectedCurrency, setSelectedCurrency] = useState<string>('');
  const [modalClicked, setModalClicked] = useState<boolean>(false);
  const [languageModalClicked, setLanguageModalClicked] = useState<boolean>(false)
  const searchParams = useSearchParams();

  const { preferredCurrency, setPreferredCurrency, switchCurrency, setOpenedSidebar } = useShopping();

  const translations = useTranslations('Header')
  const path = usePathname()
  const locale = useLocale();

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
    if (!locale) {
      setSelectedLanguageField('Español');
    }

    if (locale === 'en') {
      setSelectedLanguageField('English');
    }  else if (locale === 'es') {
      setSelectedLanguageField('Español');
    } else {
      setSelectedLanguageField('other');
    }
  }, []);

  useEffect(() => {
    setSelectedCurrency(preferredCurrency.name)
  }, [preferredCurrency])


  return (
    <>
      <div className='flex flex-col space-y-24 py-24 mt-12 border-b-custom border-t-custom'>
        <Link locale='es' href={`/${path}${searchParams.get('datos') ? `?dias=${searchParams.get('dias')}&datos=${searchParams.get('datos')}` : ''}`}>
          <LanguageOrCurrencyButton isocode='es' language={translations('espanol')} translation='Español' selectedField={selectedLanguageField}
            onClick={() => {
              setSelectedLanguageField('Español')
            }} /></Link>
        <Link locale='en' href={`/${path}${searchParams.get('datos') ? `?dias=${searchParams.get('dias')}&datos=${searchParams.get('datos')}` : ''}`}>
          <LanguageOrCurrencyButton isocode='gb' language={translations('ingles')} translation='English' selectedField={selectedLanguageField}
            onClick={() => {
              setSelectedLanguageField('Inglés')
            }} /></Link>
          <LanguageOrCurrencyButton isocode='unique' language={locale === 'en' || locale === 'es' ? 
        '' : translations(locale) } translation={locale === 'en' || locale === 'es' ? 
        '' : translations(locale + 'Original') } selectedField={selectedLanguageField}
            onClick={() => {setLanguageModalClicked(true)}} />
      </div>
      <div className='flex flex-col space-y-24'>
        <h2 className='font-medium text-heading leading-body py-12 border-b-custom'>
          {translations('divisaPreferida')}</h2>
        <LanguageOrCurrencyButton language='USD' selectedField={selectedCurrency}
          onClick={() => {
            setPreferredCurrency({ name: 'USD', tasa: 1, locale_format: 'en-US' })
            setOpenedSidebar('')
            }} />
        <LanguageOrCurrencyButton language='EUR' selectedField={selectedCurrency}
          onClick={() => {
            switchCurrency('EUR')
            setOpenedSidebar('')
            }} />
        <LanguageOrCurrencyButton language={selectedCurrency === 'USD' || selectedCurrency === 'EUR' ? translations('otrasMonedas') :
          selectedCurrency} selectedField={selectedCurrency}
          onClick={() => setModalClicked(true)} />
      </div>
      {languageModalClicked && <OtherLanguagesModal setSelectedLanguageField={setSelectedLanguageField} selectedLanguageField={selectedLanguageField}
       modalClicked={languageModalClicked} setModalClicked={setLanguageModalClicked}/>}
      {modalClicked && <CurrencyModal modalClicked={modalClicked} setModalClicked={setModalClicked}/>}
    </>
  )
}

export default LanguageAndCurrency
