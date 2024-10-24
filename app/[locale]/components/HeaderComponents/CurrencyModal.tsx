'use client'
import React from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { useShopping } from '../ShoppingContext/ShoppingContext';
import { countryToCurrencyMap } from '../ShoppingContext/CurrencyCodeMappings';
import { useTranslations } from 'next-intl';

interface Props {
    modalClicked: boolean,
    setModalClicked: React.Dispatch<React.SetStateAction<boolean>>
}

const CurrencyModal = ({ modalClicked, setModalClicked }: Props) => {

    const { preferredCurrency, switchCurrency, setOpenedSidebar } = useShopping()

    const uniqueCurrencies = countryToCurrencyMap.filter((mapping, index, self) =>
        index === self.findIndex((country) => country.currency === mapping.currency)
    );

    const translations = useTranslations('Header')
    return (
        <>
            <div className={`fixed h-screen w-screen left-0 top-0 bg-text bg-opacity-60 z-10`}
                onClick={() => setModalClicked(false)}></div>
            <div className={`flex flex-col p-24 rounded-custom space-y-12 fixed left-1/2 top-24 lg:top-1/2 
bg-background z-50 w-3/4 lg:w-1/2 h-2/3 lg:h-3/4 overflow-y-auto -translate-x-1/2 lg:-translate-y-1/2`}>
                <CloseIcon className='cursor-pointer ml-auto -mb-48' onClick={() => setModalClicked(false)}></CloseIcon>
                <h1 className='font-medium text-heading leading-body text-center'>{translations('divisaPreferida')}</h1>
                {uniqueCurrencies.map((country, index) => {
                    return (
                        <div key={index} className={`transition-all duration-150 ease-linear cursor-pointer active:border-primary focus:border-primary hover:border-button-hover
                        ${preferredCurrency.name === country.currency ? 'border-primary border-custom' : 'border-custom'}
                         rounded-custom p-6 flex space-x-8 items-center justify-between`} onClick={() => {
                            setModalClicked(false)
                            switchCurrency(country.currency)
                            setOpenedSidebar('')}}>
                            <div className='flex items-center space-x-8'>
                                <div className="relative w-32 h-32 overflow-hidden rounded-full border-custom pb-8">
                                    <span className={`fi fi-${country.country.toLowerCase() === 'es' ? 'eu' : country.country.toLowerCase()} 
                                left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-32 w-32 absolute scale-200`}></span>
                                </div>
                                <p>{country.currency}</p>
                            </div>
                            <div className={`${preferredCurrency.name === country.currency ? 'border-primary' : 'border-black'} rounded-full h-24 w-24 border-custom flex items-center justify-center`}>
                            {preferredCurrency.name === country.currency && <div className='border-primary rounded-full h-16 w-16 border-custom bg-primary'>
                                </div>}
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default CurrencyModal
