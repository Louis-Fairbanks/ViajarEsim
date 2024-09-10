'use client'
import React, { useState, useEffect } from 'react'
import CoveredCountriesModal from './CoveredCountriesModal';
import 'flag-icons/css/flag-icons.min.css';
import { regionsList } from './CountriesPerRegion';

type Props = {
    currentRegion: string
}
type Region = {
    nombre: string,
    isocode: string
}

const CoveredCountries = ({ currentRegion }: Props) => {

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
                    className={`relative w-32 h-32 overflow-hidden rounded-full border-custom ${index > 0 ? '-ml-6' : '' }`}>
                        <span className={`fi fi-${country.isocode.toLowerCase()} left-2 ml-2 h-32 w-32 -top-6 absolute scale-200`}></span>
                    </div>
                })}
            <button className='ml-8 underline' onClick={() => setModalClicked(true)}>Ver lista de países ({currentCountries.length})</button>
            <CoveredCountriesModal modalClicked={modalClicked} setModalClicked={setModalClicked} currentRegion={currentRegion} />
        </div>
    )
}

export default CoveredCountries
