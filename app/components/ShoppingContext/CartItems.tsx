'use client'
import React, { useEffect, useState } from 'react'
import ButtonDark from '../ReusableComponents/ButtonDark'
import ButtonLight from '../ReusableComponents/ButtonLight'
import CartItem from './CartItem'
import Image from 'next/image'
import { useShopping } from './ShoppingContext'

const CartItems = () => {

    const { cartItems, setCartItems } = useShopping();

    const [isEmpty, setIsEmpty] = useState<boolean>(false);
    const [total, setTotal] = useState<number>(
        cartItems.reduce((acc, item) => ((acc + item.selectedPlan.priceInDollars) * item.quantity), 0)
    );

    useEffect(() => {
        setTotal(cartItems.reduce((acc, item) => ((acc + item.selectedPlan.priceInDollars) * item.quantity), 0));
    }, [cartItems])

    useEffect(() => {
        if (cartItems.length === 0) {
            setIsEmpty(true);
        } else {setIsEmpty(false)}
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
            {isEmpty ? <div className='border-t-custom mt-12 pt-32'>
                <Image className='mx-auto'
                    src='/media/carrito-vacio.png'
                    alt='carrito vacío'
                    width={300}
                    height={300}
                />
                <p className='text-subheading text-center pt-12'>No tienes ningun eSIM en tu carrito</p>
            </div> :
                <div className='flex flex-col overflow-y-scroll no-scrollbar'>
                    {cartItems.map((item, index) => {
                        return (
                            <CartItem key={index} regionIsocode={item.selectedPlan.destinationIsocode} itemQuantity={item.quantity}
                                planName={item.selectedPlan.planName} regionName={item.selectedPlan.destinationName}
                                price={item.selectedPlan.priceInDollars} deleteOnClick={() => deleteItem(index)}
                                adjustQuantity={(quantity) => adjustQuantity(index, quantity)} id={item.selectedPlan.id} />
                        )
                    })}
                </div>}
            <div className='flex flex-col border-t-custom space-y-16'>
                <div className='flex justify-between pt-16'>
                    <p className='font-semibold text-subheading'>Total</p>
                    <div className='font-semibold text-subheading'>${total},00 <span className='text-small text-text-faded'>USD</span></div>
                </div>
                <ButtonDark extraClasses='py-8' deactivated={isEmpty}>Finalizar compra</ButtonDark>
                <ButtonLight extraClasses='py-8'>Seguir comprando</ButtonLight>
            </div>
        </div>
    )
}

export default CartItems
