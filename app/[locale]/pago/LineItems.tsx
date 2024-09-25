'use client'
import React, { useState } from 'react'
import LineItem from './LineItem'
import ButtonDark from '../components/ReusableComponents/ButtonDark'
import Check from '@mui/icons-material/Check'
import { useShopping } from '../components/ShoppingContext/ShoppingContext'
import { TCartItem } from '../components/Types/TCartItem'
import { discountCodes } from '../components/ShoppingContext/DiscountCodes'
import { Discount } from '../components/Types/TDiscount'
import { useTranslations } from 'next-intl'


const LineItems = () => {

    const translations = useTranslations('Discounts')

    const { cartItems, total, appliedDiscount, setAppliedDiscount } = useShopping();
    const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
    const [formMessage, setFormMessage] = useState<string>('');

    function applyDiscount(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setFormSubmitted(true);

        const descuento = event.currentTarget.elements.namedItem('descuento') as HTMLInputElement;
        //compare input to all accepted variations of the discount codes
        const foundDiscount: Discount | undefined = discountCodes.find((code) => {
            return code.acceptedVariations.find((acceptedVariation) => descuento.value === acceptedVariation)
        })

        if (descuento && foundDiscount) {
            if (appliedDiscount === undefined) {
                setAppliedDiscount(foundDiscount);
                setFormMessage(translations('descuentoAplicado') + foundDiscount.code);
            } else {
                setFormMessage(translations('yaAplicaste'));
            }
        }
        else {
            setFormMessage(translations('invalido'));
        }
    }

    return (
        <div className='flex flex-col space-y-12'>
            {
                cartItems.map((item: TCartItem) => {
                    return <LineItem key={item.plan.id} plan={item.plan} quantity={item.quantity} />
                })
            }
            <form onSubmit={applyDiscount} className='border-custom rounded-custom lg:flex justify-between lg:px-12 py-8 lg:mx-24 space-x-12 relative'>
                <input name='descuento' className='w-full rounded-custom p-12 lg:p-0 border-custom lg:border-none' placeholder={translations('codigo')} />
                <ButtonDark type='submit' extraClasses='absolute bottom-16 right-8 lg:-right-8 lg:bottom-0 lg:relative w-32 h-32'><Check style={{ color: '#FFFFFF' }} /></ButtonDark>
            </form>
            {formSubmitted && <p className='text-center text-heading'>{formMessage}</p>}
            <div className='hidden lg:flex justify-between items-center lg:mx-24 py-12'>
                <p className='font-medium text-text-faded'>{translations('total')}</p>
                <span className='font-medium text-heading'>${parseFloat(total?.toFixed(2)).toLocaleString('es-ES', { minimumFractionDigits: 2 })}<span className='text-small text-text-faded ml-6'>USD</span></span>
            </div>
        </div>
    )
}

export default LineItems
