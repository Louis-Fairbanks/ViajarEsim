'use client'
import React, { useEffect, useState, useMemo, useRef } from 'react'
import "/node_modules/flag-icons/css/flag-icons.min.css"
import { KeyboardArrowDown } from '@mui/icons-material';
import LineItems from './LineItems';
import { useShopping } from '../components/ShoppingContext/ShoppingContext';
import { TCartItem } from '../components/Types/TCartItem';
import { useSearchParams } from 'next/navigation';
import { Plan } from '../components/Types/TPlan';
import { useFacebookPixel } from '../components/Hooks/useFacebookPixel';
import { v4 as uuidv4 } from 'uuid';
import { getUserIpAddress } from '../components/MetaFunctions/GetUserIpAddress';
import { Discount } from '../components/Types/TDiscount';
import { useTranslations } from 'next-intl';

type PlanReceivedFromUrl = {
    region: string;
    dias: string;
    data: string;
    cantidad: string;
}

const CartSummary = () => {

    const translations = useTranslations('Pago')

    const [summaryOpened, setSummaryOpened] = useState<boolean>(false)
    const [plansReceivedFromUrl, setPlansReceivedFromUrl] = useState<PlanReceivedFromUrl[]>([])
    const { total, appliedDiscount, cartItems, setCartItems } = useShopping()
    const { event } = useFacebookPixel()
    const searchParams = useSearchParams()

    const prevCartItemsRef = useRef<TCartItem[]>([])
    const prevTotalRef = useRef<number>(0)
    const prevAppliedDiscountRef = useRef<Discount | undefined>(appliedDiscount)

    const memoizedEcommerce = useMemo(() => ({
        value: total,
        currency: 'USD',
        discount: appliedDiscount ? `DISCOUNT_APPLIED_${appliedDiscount.discountPercentage}%` : undefined,
        items: cartItems.map((item: TCartItem, index: number) => ({
            item_id: item.plan.id,
            item_name: item.plan.plan_nombre,
            affiliation: item.plan.proveedor,
            index: index,
            item_category: 'Plan',
            item_category2: item.plan.region_nombre,
            item_variant: item.plan.is_low_cost ? 'low_cost' : 'normal',
            price: item.plan.precio,
            quantity: item.quantity
        }))
    }), [cartItems, total, appliedDiscount])

    useEffect(() => {
        //if redirected from the bot get all the plans from the query parameters and map them
        const plans = searchParams.getAll('plan');

        const parsedPlans = plans.map(plan => {
            const [region, dias, data, cantidad] = plan.split(',').map(parameter => parameter);
            return { region, dias, data, cantidad };
        });

        setPlansReceivedFromUrl(parsedPlans);
    }, [searchParams]);

    useEffect(() => {
        //if redirected from the bot fetch the plans from the database
        const fetchPlansFromDatabase = async () => {
            const plansToAddToCart: (TCartItem | null)[] = await Promise.all(plansReceivedFromUrl.map(async plan => {
                const response = await fetch('/api/planes/' + plan.region);
                const allPlansForRegion = await response.json();

                const requestedPlanForRegion: Plan = allPlansForRegion.data.find((planFromDb: any) => {
                    const isDurationMatch = planFromDb.duracion === plan.dias.split('-')[0];
                    const isDataMatch = (plan.data === 'datos-ilimitados' && planFromDb.data === 'unlimited') || plan.data.split('-')[0] === planFromDb.data;

                    return isDurationMatch && isDataMatch;
                });

                if (!requestedPlanForRegion || !requestedPlanForRegion.id) {
                    return null;
                }
                else {
                    return { plan: requestedPlanForRegion, quantity: parseInt(plan.cantidad) };
                }
            }));

            // Filter out any null values from the array
            const validPlansToAddToCart: TCartItem[] = plansToAddToCart.filter(plan => plan !== null) as TCartItem[];

            setCartItems([...cartItems, ...validPlansToAddToCart]);
        }
        fetchPlansFromDatabase();
    }, [plansReceivedFromUrl]);

    useEffect(() => {
        const hasCartItemsChanged = JSON.stringify(cartItems) !== JSON.stringify(prevCartItemsRef.current)
        const hasTotalChanged = total !== prevTotalRef.current
        const hasDiscountChanged = appliedDiscount !== prevAppliedDiscountRef.current

        if (cartItems.length === 0 || (!hasCartItemsChanged && !hasTotalChanged && !hasDiscountChanged)) {
            return
        }

        // Update refs for next comparison
        prevCartItemsRef.current = cartItems
        prevTotalRef.current = total
        prevAppliedDiscountRef.current = appliedDiscount

        // Trigger DataLayer event
        ;(window as any).dataLayer = (window as any).dataLayer || []
        ;(window as any).dataLayer.push({ ecommerce: null })
        ;(window as any).dataLayer.push({
            event: 'begin_checkout',
            ecommerce: memoizedEcommerce
        })

        // Trigger Facebook pixel event
        const uuid = uuidv4()
        const eventId = parseInt(uuid.split('-')[0])
        event('InitiateCheckout', memoizedEcommerce, { eventID: eventId })
        facebookInitiateCheckout(memoizedEcommerce, eventId)
    }, [memoizedEcommerce, cartItems, total, appliedDiscount])

    const facebookInitiateCheckout = async (ecommerce: any, eventId: number) => {
        const userIpAddress = await getUserIpAddress()
        await fetch('/api/facebook/initiate-checkout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ecommerce, eventId, userIpAddress })
        })
    }

    return (
        <div className='flex flex-col py-24 px-24 sm:px-64 lg:px-0 lg:border-custom lg:rounded-custom w-full lg:w-1/3 h-fit bg-light-background lg:bg-background'>
            <div className={`flex transition-all duration-300 ease-linear lg:hidden ${summaryOpened ? 'mb-24' : ''} justify-between`}>
                <div className='flex space-x-8 cursor-pointer' onClick={() => setSummaryOpened(!summaryOpened)}>
                    <h2 className='font-semibold text-primary'>{translations('mostrarResumen')}</h2>
                    <KeyboardArrowDown className={`text-primary ${summaryOpened ? 'rotate-180' : ''}`}></KeyboardArrowDown>
                </div>
                <span className='font-medium text-heading'>${parseFloat(total?.toFixed(2)).toLocaleString('es-ES', { minimumFractionDigits: 2 })}<span className='text-small text-text-faded ml-6'>USD</span></span>
            </div>
            <div className={`transition-all duration-300 ease-linear ${summaryOpened ? 'max-h-[2000px]' : 'max-h-0'} overflow-hidden lg:max-h-full flex flex-col lg:space-y-24`}>
                <h2 className='hidden lg:block font-medium text-heading leading-body pb-12 lg:mx-24 border-b-custom text-center'>{translations('resumenPedido')}</h2>
                {searchParams.getAll('plan').length > 0 && plansReceivedFromUrl.length === 0 && <p className='text-heading text-center'>{translations('cargandoPlanes')}</p>}
                <LineItems />
            </div>
        </div>
    )
}

export default CartSummary