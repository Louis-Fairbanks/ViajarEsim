'use client'
import React, { useState } from 'react'
import LanguageOrCurrencyButton from './LanguageOrCurrencyButton'



const LanguageAndCurrency = () => {

    const [selectedLanguageField, setSelectedLanguageField] = useState<string>('Español');
    const [selectedCurrencyField, setSelectedCurrencyField] = useState<string>('USD');


    return (
        <>
            <div className='flex flex-col space-y-24 py-24 mt-12 border-b-custom border-t-custom'>
                    <LanguageOrCurrencyButton language="Español" translation='Spanish' selectedField={selectedLanguageField}
                        onClick={() => {
                            setSelectedLanguageField('Español')
                        }} />
                    <LanguageOrCurrencyButton language="Inglés" translation='English' selectedField={selectedLanguageField}
                        onClick={() => {
                            setSelectedLanguageField('Inglés')
                            }} />
                <LanguageOrCurrencyButton language="Portugues" translation='Portuguese' selectedField={selectedLanguageField}
                    onClick={() => {
                        setSelectedLanguageField('Portugues')
                        }} />
            </div>
            <div className='flex flex-col space-y-24'>
                <h2 className='font-medium text-heading leading-body py-12 border-b-custom'>
                    Selecciona tu divisa preferida</h2>
                <LanguageOrCurrencyButton language='USD' selectedField={selectedCurrencyField}
                    onClick={setSelectedCurrencyField} />
                <LanguageOrCurrencyButton language='EUR' selectedField={selectedCurrencyField}
                    onClick={setSelectedCurrencyField} />
                <LanguageOrCurrencyButton language='MXN' selectedField={selectedCurrencyField}
                    onClick={setSelectedCurrencyField} />
            </div>
        </>
    )
}

export default LanguageAndCurrency
