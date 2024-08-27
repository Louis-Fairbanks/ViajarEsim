'use client'
import React, { useState } from 'react'
import AllCountries from './AllCountries'
import CountryCard from './CountryCard'
import { RegionesCompletos } from '../components/RegionesCompletos'
import Link from 'next/link'

const CountriesSection = () => {

    
    const [category, setCategory] = useState('');

    return (
        <div>
            <AllCountries category={category} setCategory={setCategory}/>
            <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pb-64 mx-24 sm:mx-64 gap-24 border-b-custom'>
                {RegionesCompletos.map((region, index) => {
                    if(index > 32){
                        return <></>
                    }
                    return <Link href={`${region}`} key={index}><CountryCard key={index} region={region} startingPrice='6,00' imgPath='' category={category}/></Link>
                })}
            </div>
        </div>
    )
}

export default CountriesSection
