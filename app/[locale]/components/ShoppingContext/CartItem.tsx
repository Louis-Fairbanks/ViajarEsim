'use client'
import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import { Plan } from '../Types/TPlan';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import { useShopping } from './ShoppingContext';

interface Props {
    plan: Plan
    itemQuantity: number
    deleteOnClick: (id: number) => void
    adjustQuantity: (id: number, quantity: number) => void
}

const CartItem = ({ plan, itemQuantity, deleteOnClick, adjustQuantity }: Props) => {
    const translations = useTranslations('PricingCard');
    const locale = useLocale();

    const { preferredCurrency } = useShopping();

    const dataNoGB = plan.data.replace('GB', '');

    const getTranslatedRegionName = () => {
        //@ts-ignore
        return plan.region_nombre_translations[locale] || plan.region_nombre;
    };

    return (
        <div className='py-16 border-t-custom'>
            <div className='flex justify-between items-center'>
                <div className='flex space-x-12 items-center'>
                    <div className="relative w-65 h-65 overflow-hidden rounded-full border-custom pb-8">
                        <span className={`fi fi-${plan.region_isocode} h-65 w-65 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 scale-150`}></span>
                    </div>
                    <div className='flex flex-col'>
                        <p className='text-small font-semibold text-text-faded'>{translations(plan.plan_nombre)}</p>
                        <h4 className='font-semibold text-subheading'>eSIM {getTranslatedRegionName()}</h4>
                        <p className='text-small text-text-faded'>
                            {plan.duracion === '1' ? `1 ${translations('dia')} ` : `${plan.duracion} ${translations('dias')} `}
                            {plan.data === 'unlimited' ? translations('datosIlimitados') : dataNoGB + ' GB'}
                        </p>
                        <div>
                    {new Intl.NumberFormat(preferredCurrency.locale_format, {
                        style: 'currency',
                        currency: preferredCurrency.name,
                        minimumFractionDigits: 2
                    }).format(plan.precio * preferredCurrency.tasa)}
                </div>
                        <div className='border-custom rounded-custom p-8 flex space-x-32 text-heading w-fit'>
                            <button
                                className={`${itemQuantity === 1 ? 'text-button-light-deactivated cursor-not-allowed' : ''}`}
                                onClick={() => adjustQuantity(itemQuantity > 1 ? itemQuantity - 1 : 1, plan.id)}
                            >-</button>
                            <span>{itemQuantity}</span>
                            <button onClick={() => adjustQuantity(itemQuantity + 1, plan.id)}>+</button>
                        </div>
                    </div>
                </div>
                <div onClick={() => deleteOnClick(plan.id)}
                    className='border-alert rounded-custom border-custom w-48 h-48 mr-5 cursor-pointer flex items-center justify-center'>
                    <DeleteIcon style={{ color: '#AA4F4F' }} />
                </div>
            </div>
        </div>
    )
}

export default CartItem