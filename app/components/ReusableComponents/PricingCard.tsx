'use client';
import React from 'react'
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
import "/node_modules/flag-icons/css/flag-icons.min.css"

interface Props {
    ISOcode: string;
    planName: string;
    data: string;
    duration: string;
    price: string;
}

const PricingCard = (props: Props) => {
    return (
        <div className='rounded-custom border-custom p-18 space-y-12'>
            <div className='flex justify-between items-center'>
                <div className='flex items-center gap-x-8'>
                    <div className="relative w-32 h-32 overflow-hidden rounded-full border-custom">
                        <span className={`fi fi-${props.ISOcode} h-32 w-32 -top-6 absolute scale-200`}></span>
                    </div>
                    <span className='font-medium'>{props.planName}</span>
                </div>
                <button className='border-black border-collapse border-custom rounded-full w-24 h-24'></button>
            </div>
            <div className='flex justify-between'>
                <span className='font-medium text-text-faded'>Datos</span>
                {props.data === 'unlimited' ? <AllInclusiveIcon style={{ color : '#6C85FF'}} /> : <span className='font-semibold'>{props.data}</span>}
            </div>
            <div className='flex justify-between'>
                <span className='font-medium text-text-faded'>Duración</span>
                <span className='font-semibold'>{props.duration}</span>
            </div>
            <div className='flex justify-between'>
                <span className='font-medium text-text-faded'>Precio</span>
                <div className='font-semibold'>${props.price} <span className='text-text-faded text-small font-medium'>USD</span></div>
            </div>
        </div>
    )
}

export default PricingCard
