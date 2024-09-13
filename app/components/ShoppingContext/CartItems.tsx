'use client'
import React, { useEffect, useState } from 'react'
import ButtonDark from '../ReusableComponents/ButtonDark'
import ButtonLight from '../ReusableComponents/ButtonLight'
import CartItem from './CartItem'
import Image from 'next/image'
import { useShopping } from './ShoppingContext'
import Link from 'next/link'
import { TCartItem } from '../Types/TCartItem'

const CartItems = () => {

    const { total, cartItems, setCartItems, setOpenedSidebar, resetAfterConfirmedPurchase } = useShopping();

    const [isEmpty, setIsEmpty] = useState<boolean>(false);

    useEffect(() => {
        if (cartItems.length === 0) {
            setIsEmpty(true);
        } else { setIsEmpty(false) }
    }, [cartItems]);


    const deleteItem = (index: number) => {
        const updatedCartItemArray = [...cartItems];
        updatedCartItemArray.splice(index, 1);
        setCartItems(updatedCartItemArray);
    };

    const adjustQuantity = (index: number, quantity: number) => {
        const updatedCartItemArray = [...cartItems];
        updatedCartItemArray[index].quantity = quantity;
        setCartItems(updatedCartItemArray);
    }

    return (
        <div className='flex flex-col justify-between h-full'>
            {isEmpty ? <div className='border-t-custom flex flex-col items-center justify-center mt-12 pt-32'>
                <Image className='mx-auto'
                    src='/media/carrito-vacio.png'
                    alt='carrito vacío'
                    width={300}
                    height={300}
                />
                <p className='text-subheading text-center pt-12'>No tienes ningun eSIM en tu carrito</p>
            </div> :

                <div className='flex flex-col overflow-y-scroll no-scrollbar mt-24'>
                    {cartItems.map((item, index) => {
                        return (
                            <CartItem key={index} plan={item.plan} deleteOnClick={() => deleteItem(index)}
                                adjustQuantity={(quantity) => adjustQuantity(index, quantity)} itemQuantity={item.quantity} />
                        )
                    })}
                </div>}
            <div>
                <div className='flex flex-col border-t-custom space-y-16'>
                    <div className='flex justify-between pt-16'>
                        <p className='font-semibold text-subheading'>Total</p>
                        <div className='font-semibold text-subheading'>${total.toLocaleString('es-ES', { minimumFractionDigits: 2 })} <span className='text-small text-text-faded'>USD</span></div>
                    </div>
                    <Link href='/pago'><ButtonDark extraClasses='py-8 w-full' deactivated={isEmpty} onClick={() => setOpenedSidebar('')}>
                        Finalizar compra</ButtonDark></Link>
                    <Link href='/destinos'><ButtonLight extraClasses='py-8 w-full' onClick={() => setOpenedSidebar('')}>Seguir comprando</ButtonLight></Link>
                    <button className='w-full py-8 px-24 border-alert border-custom rounded-custom font-medium transition-all duration-300 ease-linear
                hover:opacity-75 hover:text-opacity-75 active:opacity-50 active:text-opacity-50' onClick={() => resetAfterConfirmedPurchase()}>Vaciar Carrito</button>
                </div>
            </div>
        </div>
    )
}

export default CartItems
