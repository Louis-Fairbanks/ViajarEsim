'use client';
import React from 'react'
import { useState } from 'react';
import Faq from '../HomeSections/Faq'
import Tab from './Tab';
import ButtonDark from './ButtonDark';
import { useTranslations } from 'next-intl';

const FaqSection = () => {

    const [category, setCategory] = useState('');
    const [showMore, setShowMore] = useState(false);

    const translations = useTranslations('FAQs')
    const preguntasFrecuentes = translations.raw('preguntasFrecuentes')

    return (
        <div className='flex flex-col space-y-48'>
            <div className='grid grid-cols-2 sm:grid-cols-4 gap-x-24 gap-y-24 mx-auto justify-center'>
                <Tab category={category} setCategory={setCategory} innerText={translations('uso')} extraClasses='py-8 px-24 w-128' />
                <Tab category={category} setCategory={setCategory} innerText={translations('recarga')} extraClasses='py-8 px-24 w-128' />
                <Tab category={category} setCategory={setCategory} innerText={translations('instalacion')} extraClasses='py-8 px-24 w-128' />
                <Tab category={category} setCategory={setCategory} innerText={translations('soporte')} extraClasses='py-8 px-24 w-128' />
            </div>
            <div className='flex flex-col md:space-x-24 md:flex-row'>
                <div className='flex flex-col w-full md:w-1/2'>
                    {preguntasFrecuentes.slice(0, preguntasFrecuentes.length / 2).map((faq : any, index : number) => {
                        return <Faq key={index} question={faq.question} category={faq.category} currentCategory={category}
                            answer={faq.answer} />
                    })}
                </div>
                <div className={`${showMore ? '' : 'hidden'} sm:flex flex-col w-full md:w-1/2`}>
                    {preguntasFrecuentes.slice(preguntasFrecuentes.length / 2).map((faq : any, index : number) => {
                        return <Faq key={index} question={faq.question} category={faq.category} currentCategory={category}
                            answer={faq.answer} />
                    })}
                </div>
                <ButtonDark extraClasses='block sm:hidden py-12' onClick={() => setShowMore(true)}>Cargar más</ButtonDark>
            </div>
        </div>
    )
}

export default FaqSection
