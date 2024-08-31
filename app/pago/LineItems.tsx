'use client'
import React, { useEffect, useState } from 'react'
import LineItem from './LineItem'
import ButtonDark from '../components/ReusableComponents/ButtonDark'
import Check from '@mui/icons-material/Check'
import { useShopping } from '../components/ShoppingContext/ShoppingContext'
import { TCartItem } from '../components/Types/TCartItem'


const LineItems = () => {

    const { cartItems } = useShopping();
    const [total, setTotal] = useState<number>();


    useEffect(() => {
        setTotal(cartItems.reduce((acc, item) => (acc + ( parseInt(item.plan.precio) * item.quantity)), 0));
    }, [])

    return (
        <div className='flex flex-col space-y-12'>
            {
                cartItems.map((item : TCartItem) => {
                    return <LineItem key={item.plan.id} plan={item.plan} quantity={item.quantity} />
                })
            }
            <div className='border-custom rounded-custom lg:flex justify-between lg:px-12 py-8 lg:mx-24 space-x-12 relative'>
                <input className='w-full rounded-custom p-12 lg:p-0 border-custom lg:border-none' placeholder='Código de descuento' />
                <ButtonDark extraClasses='absolute bottom-16 right-8 lg:-right-8 lg:bottom-0 lg:relative w-32 h-32'><Check style={{ color: '#FFFFFF' }} /></ButtonDark>
            </div>
            <div className='hidden lg:flex justify-between items-center lg:mx-24 py-12'>
                <p className='font-medium text-text-faded'>Total</p>
                <span className='font-medium text-heading'>${total}<span className='text-small text-text-faded ml-6'>USD</span></span>
            </div>
        </div>
    )
}

export default LineItems
