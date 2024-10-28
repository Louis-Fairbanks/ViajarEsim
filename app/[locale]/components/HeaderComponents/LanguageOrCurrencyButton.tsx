'use client'
import React from 'react'
import { useLocale } from 'next-intl'

interface Props {
    language: string,
    selectedField: string
    onClick: React.Dispatch<React.SetStateAction<string>>
    translation?: string
    isocode?: string
}

const supportedLanguages = [
    {
        isocode: 'it'
    },
    {
        isocode: 'de'
    },
    {
        isocode: 'br'
    },
    {
        isocode: 'fr'
    }
]

const LanguageOrCurrencyButton = ({ language, translation, selectedField, onClick, isocode }: Props) => {

    const locale = useLocale()

    return (
        <div className={`px-24 py-8 rounded-custom flex justify-between border-custom items-center
         transition-all duration-150 ease-linear cursor-pointer active:border-primary focus:border-primary hover:border-button-hover
        ${selectedField === language || locale === isocode
             || (selectedField === 'other' && isocode ==='unique'
         && translation !== 'English' && translation !== 'Español') ? 'border-primary' : ''}`} onClick={() => { onClick(language) }}>
            <div className='flex space-x-12 items-center'>
                {isocode ? isocode !== 'unique' ?
                    <div className="relative w-32 h-32 overflow-hidden pb-6 rounded-full border-custom">
                        <span className={`fi fi-${isocode} h-32 w-32 absolute left-1/2 top-1/2 -translate-x-1/2 scale-200 -translate-y-1/2`}></span>
                    </div> :
                    <div className='flex'>{
                    supportedLanguages.map((country, index) => {
                        if(index > 3){
                            return
                        }
                        return <div key={index}
                        className={`relative w-32 h-32 overflow-hidden rounded-full pb-8 border-custom ${index > 0 ? '-ml-6' : '' }`}>
                        <span className={`fi fi-${country.isocode}  h-32 w-32 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 absolute scale-200`}></span>
                        </div>
                    })}</div>
                    :  <div className='w-32 h-32 rounded-full border-custom flex items-center justify-center text-text-faded'>
                    {language === 'EUR' ? '€' : '$'}</div>}
                <div className='flex flex-col'>
                    <h2 className='font-medium'>{language}</h2>
                    {translation && <p className='text-small text-text-faded'>{translation}</p>}
                </div>
            </div>
            <div className={`w-24 h-24 rounded-full border-custom relative
            ${selectedField === language || locale === isocode || (selectedField === 'other' && isocode === 'unique' && translation !== 'English' && translation !== 'Español') ? 'border-primary' : 'border-text'}`}>
                
                {selectedField === language || locale === isocode || (selectedField === 'other' && isocode === 'unique' && 
                translation !== 'English' && translation !== 'Español') ? <div className='w-16 h-16 rounded-full absolute bg-primary 
                -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2'></div> : <></>}
            </div>
        </div>
    )
}

export default LanguageOrCurrencyButton
