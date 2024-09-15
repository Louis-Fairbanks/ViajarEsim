'use client'
import React, { useEffect, useState } from 'react'
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

type PlanReceivedFromUrl = {
    region: string;
    dias: string;
    data: string;
    cantidad: string;
}

const CartSummary = () => {
    const [summaryOpened, setSummaryOpened] = useState<boolean>(false);
    const [plansReceivedFromUrl, setPlansReceivedFromUrl] = useState<PlanReceivedFromUrl[]>([]);
    const { total, discountApplied, cartItems, setCartItems } = useShopping();
    const { event } = useFacebookPixel();
    const searchParams = useSearchParams();

    useEffect(() => {
        const plans = searchParams.getAll('plan');
        console.log('Raw plans from URL:', plans);

        const parsedPlans = plans.map(plan => {
            const [region, dias, data, cantidad] = plan.split(',').map(parameter => parameter);
            return { region, dias, data, cantidad };
        });

        setPlansReceivedFromUrl(parsedPlans);
    }, [searchParams]);

    useEffect(() => {
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
        const ecommerce = {
            value: total,
            currency: 'USD',
            discount: discountApplied ? 'DISCOUNT_APPLIED_15%' : undefined,
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
        }

        if (cartItems.length === 0) {
            return
        }
        (window as any).dataLayer = (window as any).dataLayer || [];
        (window as any).dataLayer.push({ ecommerce: null });
        (window as any).dataLayer.push({
            event: 'begin_checkout',
            ecommerce: ecommerce
        });
        const uuid = uuidv4();
        const eventId = parseInt(uuid.split('-')[0]);
        event('InitiateCheckout', {ecommerce}, {eventID : eventId});
        facebookInitiateCheckout(ecommerce, eventId);
    }, [cartItems, total, discountApplied]);

    const facebookInitiateCheckout = async (ecommerce : any, eventId : number) => {
        const userIpAddress = await getUserIpAddress();
        await fetch('/api/facebook/initiate-checkout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ecommerce, eventId, userIpAddress})
        })
    }

    return (
        <div className='flex flex-col py-24 px-24 sm:px-64 lg:px-0 lg:border-custom lg:rounded-custom w-full lg:w-1/3 h-fit bg-light-background lg:bg-background'>
            <div className={`flex transition-all duration-300 ease-linear lg:hidden ${summaryOpened ? 'mb-24' : ''} justify-between`}>
                <div className='flex space-x-8 cursor-pointer' onClick={() => setSummaryOpened(!summaryOpened)}>
                    <h2 className='font-semibold text-primary'>Mostrar resúmen de mi pedido</h2>
                    <KeyboardArrowDown className={`text-primary ${summaryOpened ? 'rotate-180' : ''}`}></KeyboardArrowDown>
                </div>
                <span className='font-medium text-heading'>${parseFloat(total?.toFixed(2)).toLocaleString('es-ES', { minimumFractionDigits: 2 })}<span className='text-small text-text-faded ml-6'>USD</span></span>
            </div>
            <div className={`transition-all duration-300 ease-linear ${summaryOpened ? 'max-h-[2000px]' : 'max-h-0'} overflow-hidden lg:max-h-full flex flex-col lg:space-y-24`}>
                <h2 className='hidden lg:block font-medium text-heading leading-body pb-12 lg:mx-24 border-b-custom text-center'>Resúmen del pedido</h2>
                {searchParams.getAll('plan').length > 0 && plansReceivedFromUrl.length === 0 && <p className='text-heading text-center'>Cargando planes...</p>}
                <LineItems />
            </div>
        </div>
    )
}

export default CartSummary