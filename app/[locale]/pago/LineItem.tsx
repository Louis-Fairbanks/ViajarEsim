'use client'
import React from 'react'
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
import { Plan } from '../components/Types/TPlan';
import 'flag-icons/css/flag-icons.min.css';
import { useTranslations, useLocale } from 'next-intl';
import { useShopping } from '../components/ShoppingContext/ShoppingContext';

interface Props {
    plan : Plan
    quantity : number
}

const LineItem = ({ plan, quantity } : Props) => {

    const locale = useLocale()

    const translations = useTranslations('PricingCard')
    const { preferredCurrency } = useShopping();

    const getTranslatedRegionName = () => {
        if(!plan.region_nombre_translations){
            return plan.region_nombre
        }
        else {
            return (plan.region_nombre_translations as any)[locale]
        }
    };

    return (
        <>
            <div className='flex justify-between items-center border-b-custom lg:mx-24 pb-12'>
                <p className='font-medium text-text-faded'>{translations('pais')}</p>
                <div className='flex items-center space-x-12'>
                <div className="relative w-32 h-32 overflow-hidden pb-6 rounded-full border-custom">
                        <span className={`fi fi-${plan.region_isocode} h-32 w-32 absolute left-1/2 top-1/2 -translate-x-1/2 scale-200 -translate-y-1/2`}></span>
                    </div>
                    <span className='font-medium text-subheading whitespace-nowrap'>{getTranslatedRegionName()}</span>
                </div>
            </div>
            <hr className='bg-background w-full h-2 lg:hidden'></hr>
            <div className='flex justify-between items-center border-b-custom lg:mx-24 pb-12'>
                <p className='font-medium text-text-faded'>{translations('datos')}</p>
                <span className='font-medium text-subheading'>
                    {plan.data === 'unlimited' ? <AllInclusiveIcon style={{ color : '#6C85FF'}}/> : plan.data + ' GB'}
                </span>
            </div>
            <hr className='bg-background w-full h-2 lg:hidden'></hr>
            <div className='flex justify-between items-center border-b-custom lg:mx-24 pb-12'>
                <p className='font-medium text-text-faded'>{translations('cantidad')}</p>
                <span className='font-medium text-subheading'>
                    {quantity}
                </span>
            </div>
            <hr className='bg-background w-full h-2 lg:hidden'></hr>
            <div className='flex justify-between items-center border-b-custom lg:mx-24 pb-12'>
                <p className='font-medium text-text-faded'>{translations('duracion')}</p>
                <span className='font-medium text-subheading'>{plan.duracion} {plan.duracion === '1' ? translations('dia') : translations('dias')}</span>
            </div>
            <hr className='bg-background w-full h-2 lg:hidden'></hr>
            <div className='flex justify-between items-center py-12 lg:px-24 lg:bg-payment-methods'>
                <p className='font-medium text-text-faded'>{translations('precio')}</p>
                <span className='font-medium text-heading'>{new Intl.NumberFormat(preferredCurrency.locale_format, {
                        style: 'currency',
                        currency: preferredCurrency.name,
                        minimumFractionDigits: 2
                    }).format(plan.precio * preferredCurrency.tasa)}</span>
            </div>
        </>
    )
}

export default LineItem
