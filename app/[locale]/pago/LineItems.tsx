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

    const { cartItems, total, appliedDiscount, setAppliedDiscount, preferredCurrency } = useShopping();
    const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
    const [formMessage, setFormMessage] = useState<string>('');

    function applyDiscount(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setFormSubmitted(true);
    
        const descuentoInput = event.currentTarget.elements.namedItem('descuento') as HTMLInputElement;
        const descuentoValue = descuentoInput.value.trim();
    
        let codeAppliedCorrectly : boolean = false;
        const foundDiscount: Discount | undefined = discountCodes.find((code) => {
            const foundCode = code.acceptedVariations.find(
                (acceptedVariation) => descuentoValue === acceptedVariation
            );

            if (foundCode && code.code === 'PROMO20') {
                if (cartItems.some(item => item.quantity > 1)) {
                    codeAppliedCorrectly = true;
                    return code;
                } else {
                    return false; // Discount not applied
                }
            } else if (foundCode) {
                codeAppliedCorrectly = true;
                return code;
            } else {
                return false; // Continue searching
            }
        });
    
        if (foundDiscount) {
            if (!appliedDiscount && codeAppliedCorrectly) {
                setAppliedDiscount(foundDiscount);
                setFormMessage(translations('descuentoAplicado') + foundDiscount.code);
            } else {
                setFormMessage(translations('yaAplicaste'));
            }
        } else {
            if (!formMessage) {
                setFormMessage(translations('invalido'));
            }
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
                <span className='font-medium text-heading'>{new Intl.NumberFormat(preferredCurrency.locale_format, {
                        style: 'currency',
                        currency: preferredCurrency.name,
                        minimumFractionDigits: 2
                    }).format(total * preferredCurrency.tasa)}</span>
            </div>
        </div>
    )
}

export default LineItems
