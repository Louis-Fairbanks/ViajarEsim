'use client';
import React from 'react'
import { useState } from 'react';
import Faq from '../HomeSections/Faq'
import { preguntasFrecuentes } from '../PreguntasFrecuentes'
import Tab from './Tab';

const FaqSection = () => {

    const [category, setCategory] = useState('');

    return (
        <div className='flex flex-col space-y-48'>
            <div className='flex space-x-24 mx-auto justify-center'>
                <Tab category={category} setCategory={setCategory} innerText='Uso' extraClasses='py-8 px-24 w-128'/>
                <Tab category={category} setCategory={setCategory} innerText='Recarga' extraClasses='py-8 px-24 w-128'/>
                <Tab category={category} setCategory={setCategory} innerText='Instalacion' extraClasses='py-8 px-24 w-128'/>
                <Tab category={category} setCategory={setCategory} innerText='Soporte' extraClasses='py-8 px-24 w-128'/>
            </div>
            <div className='grid grid-cols-2 gap-x-24 gap-y-16'>
                {preguntasFrecuentes.map((faq, index) => {
                    return <Faq key={index} question={faq.question} category={faq.category} currentCategory={category}
                    answer={faq.answer}/>
                })
                }
            </div>
        </div>
    )
}

export default FaqSection
