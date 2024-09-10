'use client'
import React, { useEffect, useState } from 'react'
import LineItem from './LineItem'
import ButtonDark from '../components/ReusableComponents/ButtonDark'
import Check from '@mui/icons-material/Check'
import { useShopping } from '../components/ShoppingContext/ShoppingContext'
import { TCartItem } from '../components/Types/TCartItem'


const LineItems = () => {

    const { cartItems, total, setDiscountApplied } = useShopping();
    const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
    const [formMessage, setFormMessage] = useState<string>('');

    function applyDiscount(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setFormSubmitted(true);

        const descuento = event.currentTarget.elements.namedItem('descuento') as HTMLInputElement;

        const validDiscountCodes = [
            'VIVIRVIAJANDO',
            'vivirviajando',
            'Vivirviajando',
            'Vivir viajando',
            'vivir viajando',
            'VivirViajando',
            'Vivir Viajando'
        ]

        if (descuento && descuento.value && validDiscountCodes.includes(descuento.value)) {
            setDiscountApplied(true);
            setFormMessage('Descuento aplicado');
        }
        else {
            setFormMessage('Código de descuento inválido');
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
                <input name='descuento' className='w-full rounded-custom p-12 lg:p-0 border-custom lg:border-none' placeholder='Código de descuento' />
                <ButtonDark type='submit' extraClasses='absolute bottom-16 right-8 lg:-right-8 lg:bottom-0 lg:relative w-32 h-32'><Check style={{ color: '#FFFFFF' }} /></ButtonDark>
            </form>
            {formSubmitted && <p className='text-center text-heading'>{formMessage}</p>}
            <div className='hidden lg:flex justify-between items-center lg:mx-24 py-12'>
                <p className='font-medium text-text-faded'>Total</p>
                <span className='font-medium text-heading'>${parseFloat(total?.toFixed(2)).toLocaleString('es-ES', { minimumFractionDigits: 2 })}<span className='text-small text-text-faded ml-6'>USD</span></span>
            </div>
        </div>
    )
}

export default LineItems
