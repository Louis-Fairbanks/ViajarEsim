'use client'
import React, { useEffect, useState } from 'react'
import PricingCard from '../../[...region]/PricingCard'
import ButtonDark from './ButtonDark'
import { useShopping } from '../ShoppingContext/ShoppingContext'
import { Plan } from '../Types/TPlan'
import { TCartItem } from '../Types/TCartItem'

interface Props {
    plans: Plan[]
}

const AllPlans = ({ plans }: Props) => {


    const [selectedPlan, setSelectedPlan] = useState<Plan>();
    const [quantity, setQuantity] = useState<number>(1);

    const { cartItems, setCartItems, setOpenedSidebar } = useShopping();

    const addToCart = () => {
        if (selectedPlan) {
            let updatedCartItemArray;
            const cartItem: TCartItem = { plan : selectedPlan, quantity : quantity };
            console.log(selectedPlan);
            console.log(cartItem)
            if (cartItems.some(item => {return item.plan.id === selectedPlan.id})) {
                console.log('found a match')
                updatedCartItemArray = cartItems.map(item => {
                    if (item.plan.id === cartItem.plan.id) {
                        item.quantity += cartItem.quantity;
                    }
                    return item;
                });
            } else {
                updatedCartItemArray = [...cartItems, cartItem];
            }
            setCartItems(updatedCartItemArray);
            setOpenedSidebar('Carrito');
        }
    }

    return (
        <>
            <div>
                <h3 className='mb-12'>Selecciona tu plan</h3>
                <div className='grid grid-cols-2 gap-12'>
                    {plans && plans.map((plan: Plan) => {
                        return <PricingCard key={plan.id} plan={plan}
                            selectedPlan={selectedPlan}
                            setSelectedPlan={setSelectedPlan} />
                    })}
                </div>
            </div>
            <div className='flex flex-col space-y-16 mt-16 w-full'>
                <h3 className='text-subheading leading-body'>¿Cuantos eSIMS necesitas?</h3>
                <div className='flex space-x-4'>
                    <div className='border-custom rounded-custom p-8 flex space-x-32 text-heading'>
                        <button className={`${quantity === 1 ? 'text-button-light-deactivated cursor-not-allowed' : ''}`}
                            onClick={() => setQuantity(prevQuantity => prevQuantity > 1 ? prevQuantity - 1 : 1)}>-</button>
                        <span className='w-12'>{quantity}</span>
                        <button onClick={() => setQuantity(prevQuantity => prevQuantity + 1)}>+</button>
                    </div>
                    <ButtonDark extraClasses='px-32 py-9 w-full' deactivated={selectedPlan === undefined}
                        onClick={() => addToCart()}>Agregar al carrito</ButtonDark>
                </div>
            </div>
        </>
    )
}

export default AllPlans
