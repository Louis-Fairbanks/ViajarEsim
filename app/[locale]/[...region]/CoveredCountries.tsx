'use client'
import React, { useState, useEffect } from 'react'
import CoveredCountriesModal from './CoveredCountriesModal';
import 'flag-icons/css/flag-icons.min.css';
import { regionsList } from './CountriesPerRegion';
import { useTranslations } from 'next-intl';

type Props = {
    currentRegion: string
}
type Region = {
    nombre: string,
    isocode: string
}

const CoveredCountries = ({ currentRegion }: Props) => {

    const translations = useTranslations('PricingSection');

    const [modalClicked, setModalClicked] = useState<boolean>(false);

    const [currentCountries, setCurrentCountries] = useState<Region[]>([]);

    useEffect(() => {
        setCurrentCountries((regionsList as any)[currentRegion]);
    }, [])


    return (
        <div className='flex'>
            {
                currentCountries.map((country, index) => {
                    if(index > 2){
                        return
                    }
                    return <div key={index}
                    className={`relative w-32 h-32 overflow-hidden rounded-full pb-8 border-custom ${index > 0 ? '-ml-6' : '' }`}>
                    <span className={`fi fi-${country.isocode.toLowerCase()}  h-32 w-32 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 absolute scale-200`}></span>
                    </div>
                })}
            <button className='ml-8 underline' onClick={() => setModalClicked(true)}>{translations('verListaPaises')} ({currentCountries.length})</button>
            <CoveredCountriesModal modalClicked={modalClicked} setModalClicked={setModalClicked} currentRegion={currentRegion} />
        </div>
    )
}

export default CoveredCountries
