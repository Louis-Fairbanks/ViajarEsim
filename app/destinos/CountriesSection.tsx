'use client'
import React, { useState } from 'react'
import AllCountries from './AllCountries'
import CountryCard from './CountryCard'
import { RegionesCompletos } from '../components/RegionesCompletos'

const CountriesSection = () => {

    
    const [category, setCategory] = useState('');

    return (
        <div>
            <AllCountries category={category} setCategory={setCategory}/>
            <div className='grid grid-cols-4 pb-64 mx-64 gap-24 border-b-custom'>
                <CountryCard region='India' startingPrice='6,00' imgPath='/media/countries/INDIA.jpg' category={category} />
                {RegionesCompletos.map((region, index) => {
                    return <CountryCard key={index} region={region} startingPrice='6,00' imgPath='' category={category}/>
                })}
            </div>
        </div>
    )
}

export default CountriesSection
