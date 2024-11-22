'use client'
import React, { useEffect, useState } from 'react'
import PricingCard from '../../[...region]/PricingCard'
import ButtonDark from './ButtonDark'
import { useShopping } from '../ShoppingContext/ShoppingContext'
import { Plan } from '../Types/TPlan'
import { TCartItem } from '../Types/TCartItem'
import CoveredCountries from '../../[...region]/CoveredCountries'
import { useFacebookPixel } from '../Hooks/useFacebookPixel'
import { v4 as uuidv4 } from 'uuid'
import { getUserIpAddress } from '../MetaFunctions/GetUserIpAddress'
import { useTranslations } from 'next-intl'
import { useSearchParams } from 'next/navigation'

interface Props {
    plans: Plan[]
}

const AllPlans = ({ plans }: Props) => {

    const searchParams : any = useSearchParams();
    const translations = useTranslations('PricingSection')
    const headerTranslations = useTranslations('Header')

    const [selectedPlan, setSelectedPlan] = useState<Plan>();
    const [quantity, setQuantity] = useState<number>(1);
    const [currentRegion, setCurrentRegion] = useState<string>('');
    const {event} = useFacebookPixel();

    useEffect(() => {
        const planFromSearchParams = plans.find(plan => {
            const dias = searchParams.get('dias');
            const datos = searchParams.get('datos');
            return (plan.duracion === dias && plan.data === 'unlimited' ? datos === 'ilimitados' : datos === plan.data)
        })
        if(planFromSearchParams){
            setSelectedPlan(planFromSearchParams)
        }
    }, [searchParams])

    useEffect(() => {
        switch (plans[0].region_isocode) {
            case 'eu':
                setCurrentRegion('europa');
                break;
            case 'af':
                setCurrentRegion('africa');
                break;
            case 'as':
                setCurrentRegion('asia');
                break;
            case 'cb':
                setCurrentRegion('caribe');
                break;
            case 'un':
                setCurrentRegion('elMundo');
                break;
            case 'na':
                setCurrentRegion('norteamerica');
                break;
            case 'id':
                if (plans[0].is_low_cost) {
                    setCurrentRegion('sudesteAsiatico');
                }
                else {
                    setCurrentRegion('');
                }
                break;
            default: setCurrentRegion('');
        }
    }, [plans]);

    const { cartItems, setCartItems, setOpenedSidebar, preferredCurrency } = useShopping();

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
            setOpenedSidebar(headerTranslations('carrito'));

            //google analytics info
            const ecommerce = {
                currency: preferredCurrency.name,
                value: selectedPlan.precio * quantity,
                items: [
                  {
                    item_id: selectedPlan.id,
                    item_name: selectedPlan.plan_nombre,
                    affiliation: selectedPlan.proveedor,
                    item_category: 'Plan',
                    item_category2: selectedPlan.region_nombre,
                    item_variant: selectedPlan.is_low_cost ? 'low_cost' : 'normal',
                    price: selectedPlan.precio,
                    quantity: quantity
                  }
                ]
            };
            (window as any).dataLayer = (window as any).dataLayer || [];
            (window as any).dataLayer.push({ ecommerce: null });
            (window as any).dataLayer.push({
              event: 'add_to_cart',
              ecommerce: ecommerce
            });
            //add facebook tracking pixel add to cart
            const uuid = uuidv4();
            const eventId = parseInt(uuid.split('-')[0]);
           event('AddToCart', {ecommerce}, {eventID : eventId});
           facebookInitiateCheckout(ecommerce, eventId);
        }
    }
    const facebookInitiateCheckout = async (ecommerce : any, eventId : number) => {
        const userIpAddress = await getUserIpAddress();
        await fetch('/api/facebook/add-to-cart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ecommerce, eventId, userIpAddress})
        })
    }


    const sortPlans = (a: Plan, b: Plan) => {
        // Check if plan names contain 'VIP'
        const aIsVip = a.plan_nombre.toLowerCase().includes('vip');
        const bIsVip = b.plan_nombre.toLowerCase().includes('vip');

        // Handle low-cost VIP plans (always last)
        if (a.is_low_cost && aIsVip) return 1;
        if (b.is_low_cost && bIsVip) return -1;

        // Handle regular low-cost plans (second to last)
        if (a.is_low_cost) return 1;
        if (b.is_low_cost) return -1;

        // For non-low-cost plans, sort by price
        return a.precio - b.precio;
    }

    return (
        <>
            <div>
                <h3 className='mb-12'>{translations('seleccionaTu')}</h3>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-12'>
                    {plans && [...plans].sort(sortPlans).map((plan: Plan) => {
                        return <PricingCard key={plan.id} plan={plan}
                            selectedPlan={selectedPlan}
                            setSelectedPlan={setSelectedPlan} />
                    })}
                </div>
            </div>
            {currentRegion != '' && <CoveredCountries currentRegion={currentRegion} />}
            <div className='fixed flex flex-col space-y-16 mt-16 sm:w-full px-8 pt-12 sm:p-0 z-[1] -ml-[7%] sm:ml-0 bg-background h-fit w-[100%] bottom-0 sm:static'>
                <h3 className='text-subheading leading-body'>{translations('cuantos')}</h3>
                <div className='flex space-x-4'>
                    <div className='border-custom rounded-custom p-8 flex space-x-32 text-heading'>
                        <button className={`${quantity === 1 ? 'text-button-light-deactivated cursor-not-allowed' : ''}`}
                            onClick={() => setQuantity(prevQuantity => prevQuantity > 1 ? prevQuantity - 1 : 1)}>-</button>
                        <span className='w-12'>{quantity}</span>
                        <button onClick={() => setQuantity(prevQuantity => prevQuantity + 1)}>+</button>
                    </div>
                    <ButtonDark extraClasses='px-8 sm:px-32 py-9 w-full' deactivated={selectedPlan === undefined}
                        onClick={() => addToCart()}>{translations('agregar')}</ButtonDark>
                </div>
            </div>
        </>
    )
}

export default AllPlans