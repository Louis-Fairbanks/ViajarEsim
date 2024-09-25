'use client'
import React, { useEffect, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { regionsList } from './CountriesPerRegion';
import 'flag-icons/css/flag-icons.min.css';
import { useTranslations } from 'next-intl';

interface Props {
    modalClicked: boolean
    setModalClicked: React.Dispatch<React.SetStateAction<boolean>>
    currentRegion: string
    extraClassesOverlay?: string
    extraClassesModal?: string
}

type Region = {
    nombre: string,
    isocode: string
}

const CoveredCountriesModal = ({ modalClicked, setModalClicked, currentRegion, extraClassesModal, extraClassesOverlay }: Props) => {

    const translations = useTranslations('PricingSection');
    const [currentCountries, setCurrentCountries] = useState<Region[]>([]);

    useEffect(() => {
        setCurrentCountries((regionsList as any)[currentRegion]);
    }, [])

    return (
        <>
            {modalClicked && <>
                <div className={`fixed h-screen w-screen left-0 top-0 bg-text bg-opacity-60 z-10 ${extraClassesOverlay}`}
                    onClick={() => setModalClicked(false)}></div>
                <div className={`flex flex-col p-24 rounded-custom space-y-24 fixed left-1/2 top-24 lg:top-1/2 
bg-background z-50 w-3/4 lg:w-1/2 h-2/3 lg:h-3/4 overflow-y-auto -translate-x-1/2 lg:-translate-y-1/2 ${extraClassesModal}`}>
                    <CloseIcon className='cursor-pointer sticky top-2 left-full -mb-48' onClick={() => setModalClicked(false)}></CloseIcon>
                    <h1 className='font-medium text-heading leading-body'>{translations('listaPaises')}</h1>
                    {currentCountries.map((country, index) => {
                        return (
                            <div key={index} className='flex space-x-8 items-center'>
            <div className="relative w-32 h-32 overflow-hidden rounded-full border-custom pb-8">
                                    <span className={`fi fi-${country.isocode.toLowerCase()} left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-32 w-32 absolute scale-200`}></span>
                                </div>
                                <p>{country.nombre}</p>
                            </div>
                        )
                    })}
                </div>
            </>}
        </>
    )
}

export default CoveredCountriesModal
