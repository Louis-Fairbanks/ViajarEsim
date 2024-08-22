'use client'
import React, { useEffect, useState } from 'react'
import "/node_modules/flag-icons/css/flag-icons.min.css"
import ButtonDark from '../components/ReusableComponents/ButtonDark'
import CheckIcon from '@mui/icons-material/Check';
import { KeyboardArrowDown } from '@mui/icons-material';

const CartSummary = () => {

    const [summaryOpened, setSummaryOpened] = useState<boolean>(false)

    return (
        <div className='flex flex-col py-24 px-24 sm:px-64 lg:px-0 lg:border-custom lg:rounded-custom w-full lg:w-1/3 h-fit
        bg-light-background lg:bg-background'>
            <div className={`flex transition-all duration-300 ease-linear lg:hidden ${summaryOpened ? 'mb-24' : ''} justify-between`}>
                <div className='flex space-x-8 cursor-pointer' onClick={() => setSummaryOpened(!summaryOpened)}>
                    <h2 className='font-semibold text-primary'>Mostrar resúmen de mi pedido</h2>
                    <KeyboardArrowDown className={`text-primary ${summaryOpened ? 'rotate-180': ''}`}></KeyboardArrowDown>
                </div>
                <span className='font-medium text-heading'>$4.50<span className='text-small text-text-faded ml-6'>USD</span></span>
            </div>
            <div className={`transition-all duration-300 ease-linear ${summaryOpened ? 'max-h-512' : 'max-h-0'} 
            overflow-hidden lg:max-h-full flex flex-col lg:space-y-24`}>
                <h2 className='hidden lg:block font-medium text-heading leading-body pb-12 lg:mx-24 border-b-custom text-center'>Resúmen del pedido</h2>
                <div className='flex flex-col space-y-12'>
                    <div className='flex justify-between items-center border-b-custom lg:mx-24 pb-12'>
                        <p className='font-medium text-text-faded'>País</p>
                        <div className='flex items-center space-x-12'>
                            <div className="relative w-32 h-32 overflow-hidden rounded-full border-custom">
                                <span className={`fi fi-us h-32 w-32 absolute left-0 -top-6 scale-200`}></span>
                            </div>
                            <span className='font-medium text-subheading whitespace-nowrap'>Estados Unidos</span>
                        </div>
                    </div>
                    <hr className='bg-background w-full h-2 lg:hidden'></hr>
                    <div className='flex justify-between items-center border-b-custom lg:mx-24 pb-12'>
                        <p className='font-medium text-text-faded'>Datos</p>
                        <span className='font-medium text-subheading'>1 GB</span>
                    </div>
                    <hr className='bg-background w-full h-2 lg:hidden'></hr>
                    <div className='flex justify-between items-center border-b-custom lg:mx-24 pb-12'>
                        <p className='font-medium text-text-faded'>Duración</p>
                        <span className='font-medium text-subheading'>7 días</span>
                    </div>
                    <hr className='bg-background w-full h-2 lg:hidden'></hr>
                    <div className='flex justify-between items-center py-12 lg:px-24 lg:bg-payment-methods'>
                        <p className='font-medium text-text-faded'>Precio</p>
                        <span className='font-medium text-heading'>$4.50<span className='text-small text-text-faded ml-6'>USD</span></span>
                    </div>
                    <div className='border-custom rounded-custom lg:flex justify-between lg:px-12 py-8 lg:mx-24 space-x-12 relative'>
                        <input className='w-full rounded-custom p-12 lg:p-0 border-custom lg:border-none' placeholder='Código de descuento' />
                        <ButtonDark extraClasses='absolute bottom-16 right-8 lg:-right-8 lg:bottom-0 lg:relative w-32 h-32'><CheckIcon style={{ color: '#FFFFFF' }} /></ButtonDark>
                    </div>
                    <div className='hidden lg:flex justify-between items-center lg:mx-24 py-12'>
                        <p className='font-medium text-text-faded'>Precio</p>
                        <span className='font-medium text-heading'>$4.50<span className='text-small text-text-faded ml-6'>USD</span></span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartSummary
