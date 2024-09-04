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
            const cartItem: TCartItem = { plan: selectedPlan, quantity: quantity };
            if (cartItems.some(item => { return item.plan.id === selectedPlan.id })) {
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
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-12'>
                    {plans && [...plans].sort((a, b) => {
                        // Check if plan names contain 'VIP'
                        const aIsVip = a.plan_nombre.includes('VIP');
                        const bIsVip = b.plan_nombre.includes('VIP');

                        // Prioritize non-VIP plans
                        if (aIsVip && !bIsVip) {
                            return 1;
                        } else if (!aIsVip && bIsVip) {
                            return -1;
                        }

                        // If both plans are either VIP or non-VIP, prioritize non-low-cost plans
                        return a.is_low_cost === b.is_low_cost ? 0 : a.is_low_cost ? 1 : -1;
                    }).map((plan: Plan) => {
                        return <PricingCard key={plan.id} plan={plan}
                            selectedPlan={selectedPlan}
                            setSelectedPlan={setSelectedPlan} />
                    })}
                </div>
            </div>
            <div className='fixed flex flex-col space-y-16 mt-16 sm:w-full px-8 pt-12 sm:p-0 z-[1] -ml-[7%] bg-background h-fit w-[100%] bottom-32 sm:static'>
                <h3 className='text-subheading leading-body'>¿Cuantos eSIMS necesitas?</h3>
                <div className='flex space-x-4'>
                    <div className='border-custom rounded-custom p-8 flex space-x-32 text-heading'>
                        <button className={`${quantity === 1 ? 'text-button-light-deactivated cursor-not-allowed' : ''}`}
                            onClick={() => setQuantity(prevQuantity => prevQuantity > 1 ? prevQuantity - 1 : 1)}>-</button>
                        <span className='w-12'>{quantity}</span>
                        <button onClick={() => setQuantity(prevQuantity => prevQuantity + 1)}>+</button>
                    </div>
                    <ButtonDark extraClasses='px-8 sm:px-32 py-9 w-full' deactivated={selectedPlan === undefined}
                        onClick={() => addToCart()}>Agregar al carrito</ButtonDark>
                </div>
            </div>
        </>
    )
}

export default AllPlans
