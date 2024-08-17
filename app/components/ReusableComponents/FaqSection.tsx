'use client';
import React from 'react'
import { useState } from 'react';
import Faq from '../HomeSections/Faq'
import { preguntasFrecuentes } from '../PreguntasFrecuentes'

const FaqSection = () => {

    const [category, setCategory] = useState('');

    return (
        <div className='flex flex-col space-y-48'>
            <div className='flex space-x-24 mx-auto justify-center'>
                <button className={`rounded-custom py-8 px-24 w-128 
${category === 'uso' ? 'bg-primary text-white font-semibold' : 'text-light-button-border border-custom border-light-button-border'}`}
                    onClick={() => setCategory('uso')} style={{ transition: 'all 0.25s ease' }}>Uso</button>

                <button className={`rounded-custom py-8 px-24 w-128 
${category === 'recarga' ? 'bg-primary text-white font-semibold' : 'text-light-button-border border-custom border-light-button-border'}`}
                    onClick={() => setCategory('recarga')} style={{ transition: 'all 0.25s ease' }}>Recarga</button>

                <button className={`rounded-custom py-8 px-24 w-128 
${category === 'instalacion' ? 'bg-primary text-white font-semibold' : 'text-light-button-border border-custom border-light-button-border'}`}
                    onClick={() => setCategory('instalacion')} style={{ transition: 'all 0.25s ease' }}>Instalación</button>

                <button className={`rounded-custom py-8 px-24 w-128 
${category === 'soporte' ? 'bg-primary text-white font-semibold' : 'text-light-button-border border-custom border-light-button-border'}`}
                    onClick={() => setCategory('soporte')} style={{ transition: 'all 0.25s ease' }}>Soporte</button>
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
