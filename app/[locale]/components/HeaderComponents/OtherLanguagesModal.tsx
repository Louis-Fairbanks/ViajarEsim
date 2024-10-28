'use client'
import React from 'react'
import { useShopping } from '../ShoppingContext/ShoppingContext'
import CloseIcon from '@mui/icons-material/Close';
import { useTranslations } from 'next-intl';
import { Link } from '@/routing';
import LanguageOrCurrencyButton from './LanguageOrCurrencyButton';
import { useSearchParams } from 'next/navigation';
import { usePathname } from '@/routing';

interface Props {
    modalClicked: boolean,
    setModalClicked: React.Dispatch<React.SetStateAction<boolean>>
    selectedLanguageField : string
    setSelectedLanguageField : React.Dispatch<React.SetStateAction<string>>
}

const OtherLanguagesModal = ({ modalClicked, setModalClicked, selectedLanguageField, setSelectedLanguageField }: Props) => {

    const { setOpenedSidebar } = useShopping();
    const translations = useTranslations('Header')

    const searchParams = useSearchParams();
    const path = usePathname();

    return (
        <>
            <div className={`fixed h-screen w-screen left-0 top-0 bg-text bg-opacity-60 z-10`}
                onClick={() => setModalClicked(false)}></div>
            <div className={`flex flex-col p-24 rounded-custom space-y-12 fixed left-1/2 top-24 lg:top-1/2 
bg-background z-50 w-3/4 lg:w-1/2 h-2/3 lg:h-3/4 overflow-y-auto -translate-x-1/2 lg:-translate-y-1/2`}>
                <CloseIcon className='cursor-pointer ml-auto -mb-48 z-10' onClick={() => setModalClicked(false)}></CloseIcon>
                <h1 className='font-medium text-heading leading-body text-center'>{translations('seleccionaTuLenguaje')}</h1>
                <Link locale='de' href={`/${path}${searchParams.get('datos') ? `?dias=${searchParams.get('dias')}&datos=${searchParams.get('datos')}` : ''}`}>
          <LanguageOrCurrencyButton isocode='de' language={translations('de')} translation={translations('deOriginal')} selectedField={selectedLanguageField}
            onClick={() => {
              setSelectedLanguageField('other')
            }} /></Link>
            <Link locale='br' href={`/${path}${searchParams.get('datos') ? `?dias=${searchParams.get('dias')}&datos=${searchParams.get('datos')}` : ''}`}>
          <LanguageOrCurrencyButton isocode='br' language={translations('br')} translation={translations('brOriginal')} selectedField={selectedLanguageField}
            onClick={() => {
              setSelectedLanguageField('other')
            }} /></Link>
            <Link locale='fr' href={`/${path}${searchParams.get('datos') ? `?dias=${searchParams.get('dias')}&datos=${searchParams.get('datos')}` : ''}`}>
          <LanguageOrCurrencyButton isocode='fr' language={translations('fr')} translation={translations('frOriginal')} selectedField={selectedLanguageField}
            onClick={() => {
              setSelectedLanguageField('other')
            }} /></Link>
            <Link locale='it' href={`/${path}${searchParams.get('datos') ? `?dias=${searchParams.get('dias')}&datos=${searchParams.get('datos')}` : ''}`}>
          <LanguageOrCurrencyButton isocode='it' language={translations('it')} translation={translations('itOriginal')} selectedField={selectedLanguageField}
            onClick={() => {
              setSelectedLanguageField('Inglés')
            }} /></Link>
            </div>
        </>
    )
}

export default OtherLanguagesModal
