'use client'
import React, { useEffect, useState } from 'react'
import "/node_modules/flag-icons/css/flag-icons.min.css"
import { KeyboardArrowDown } from '@mui/icons-material';
import LineItems from './LineItems';

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
                <LineItems/>
            </div>
        </div>
    )
}

export default CartSummary
