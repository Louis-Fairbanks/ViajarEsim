'use client'
import React from 'react'

interface Props{
    language : string,
    selectedField : string
    onClick : React.Dispatch<React.SetStateAction<string>>
    translation? : string
}

const LanguageOrCurrencyButton = ( {language , translation, selectedField, onClick} : Props) => {

    return (
        <div className={`px-24 py-8 rounded-custom flex justify-between border-custom items-center
         transition-all duration-150 ease-linear cursor-pointer
        ${selectedField === language ? 'border-primary' : ''}`} onClick={() => {onClick(language)}}>
            <div className='flex space-x-12 items-center'>
                <div className='w-32 h-32 rounded-full border-custom flex items-center justify-center text-text-faded'>$</div>
                <div className='flex flex-col'>
                    <h2 className='font-medium'>{language}</h2>
                    {translation && <p className='text-small text-text-faded'>{translation}</p>}
                </div>
            </div>
            <div className={`w-24 h-24 rounded-full border-custom relative
            ${selectedField === language ? 'border-primary' : 'border-text'}`}>
                {selectedField === language ? <div className='w-16 h-16 rounded-full absolute bg-primary 
                -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2'></div> : <></>}
            </div>
        </div>
    )
}

export default LanguageOrCurrencyButton
