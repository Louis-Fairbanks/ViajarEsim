import React from 'react'
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
import { Plan } from '../components/Types/TPlan';
import 'flag-icons/css/flag-icons.min.css';

interface Props {
    plan : Plan
    quantity : number
}

const LineItem = ({ plan, quantity } : Props) => {
    return (
        <>
            <div className='flex justify-between items-center border-b-custom lg:mx-24 pb-12'>
                <p className='font-medium text-text-faded'>País</p>
                <div className='flex items-center space-x-12'>
                    <div className="relative w-32 h-32 overflow-hidden rounded-full border-custom">
                        <span className={`fi fi-${plan.region_isocode} h-32 w-32 absolute left-0 -top-6 scale-200`}></span>
                    </div>
                    <span className='font-medium text-subheading whitespace-nowrap'>{plan.region_nombre}</span>
                </div>
            </div>
            <hr className='bg-background w-full h-2 lg:hidden'></hr>
            <div className='flex justify-between items-center border-b-custom lg:mx-24 pb-12'>
                <p className='font-medium text-text-faded'>Datos</p>
                <span className='font-medium text-subheading'>
                    {plan.data === 'unlimited' ? <AllInclusiveIcon style={{ color : '#6C85FF'}}/> : plan.data + ' GB'}
                </span>
            </div>
            <hr className='bg-background w-full h-2 lg:hidden'></hr>
            <div className='flex justify-between items-center border-b-custom lg:mx-24 pb-12'>
                <p className='font-medium text-text-faded'>Cantidad</p>
                <span className='font-medium text-subheading'>
                    {quantity}
                </span>
            </div>
            <hr className='bg-background w-full h-2 lg:hidden'></hr>
            <div className='flex justify-between items-center border-b-custom lg:mx-24 pb-12'>
                <p className='font-medium text-text-faded'>Duración</p>
                <span className='font-medium text-subheading'>{plan.duracion} {plan.duracion === '1' ? 'día' : 'días'}</span>
            </div>
            <hr className='bg-background w-full h-2 lg:hidden'></hr>
            <div className='flex justify-between items-center py-12 lg:px-24 lg:bg-payment-methods'>
                <p className='font-medium text-text-faded'>Precio</p>
                <span className='font-medium text-heading'>{Number(plan.precio).toLocaleString('ES-es', { minimumFractionDigits: 2, maximumFractionDigits: 2})}<span className='text-small text-text-faded ml-6'>USD</span></span>
            </div>
        </>
    )
}

export default LineItem
