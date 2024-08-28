'use client'
import React, { useState } from 'react'
import ButtonDark from '../ReusableComponents/ButtonDark'
import ButtonLight from '../ReusableComponents/ButtonLight'
import CartItem from './CartItem'
import Image from 'next/image'


const CartItems = () => {

    const [cartItemArray, setCartItemArray] = useState([
        {
            region: 'us',
            planName: 'eSIM Estados Unidos',
            planType: 'Plan básico',
            price: '$6,00'
        },
        {
            region: 'us',
            planName: 'eSIM Estados Unidos',
            planType: 'Plan básico',
            price: '$6,00'
        }
    ])

    const [isEmpty, setIsEmpty] = useState<boolean>(false);

    const deleteItem = (index: number) => {
        const updatedCartItemArray = [...cartItemArray];
        updatedCartItemArray.splice(index, 1);
        if (updatedCartItemArray.length === 0) {
            setIsEmpty(true);
        }
        setCartItemArray(updatedCartItemArray);
    };


    return (
        <div className='flex flex-col justify-between h-full'>
            {isEmpty ? <div className='border-t-custom mt-12 pt-32'>
                <Image className='mx-auto'
                    src='/media/carrito-vacio.png'
                    alt='carrito vacío'
                    width={300}
                    height={300}
                />
                <p className='text-subheading text-center pt-12'>No tienes ningun eSIM en tu carrito</p>
            </div> :
                    <div className='flex flex-col'>
                        {cartItemArray.map((item, index) => {
                            return (
                                <CartItem key={index} region={item.region} planName={item.planName} planType={item.planType}
                                    deleteOnClick={() => deleteItem(index)} price={item.price} />
                            )
                        })}
                    </div>}
                    <div className='flex flex-col border-t-custom space-y-16'>
                        <div className='flex justify-between pt-16'>
                            <p className='font-semibold text-subheading'>Total</p>
                            <div className='font-semibold text-subheading'>$6,00 <span className='text-small text-text-faded'>USD</span></div>
                        </div>
                        <ButtonDark extraClasses='py-8' deactivated={isEmpty}>Finalizar compra</ButtonDark>
                        <ButtonLight extraClasses='py-8'>Seguir comprando</ButtonLight>
                    </div>
        </div>
    )
}

export default CartItems
