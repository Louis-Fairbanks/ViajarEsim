'use client'
import React, { useEffect, useState } from 'react'
import { KeyboardArrowDown } from '@mui/icons-material';
import LineItem from '../pago/LineItem';
import { TCartItem } from '../components/Types/TCartItem';
import { useFacebookPixel } from '../components/Hooks/useFacebookPixel';
import { v4 as uuidv4 } from 'uuid'
import { getUserIpAddress } from '../components/MetaFunctions/GetUserIpAddress';
import { Discount } from '../components/Types/TDiscount';
import useTwitterConversionTracker from '../components/Hooks/useTwitterConversionTracker';
import { useTranslations } from 'next-intl';
import { useShopping } from '../components/ShoppingContext/ShoppingContext';

type PurchaseSummaryProps = {
    data: {
        cartItems: TCartItem[],
        appliedDiscount: Discount,
        total: number
    };
    orderId: string;
    correo: string;
};

const PurchaseSummary: React.FC<PurchaseSummaryProps> = ({ data, orderId, correo }) => {
    const translations = useTranslations('Pago')
    const discountTranslations = useTranslations('Discounts')
    const paymentSuccessTranslations = useTranslations('PaymentSuccess')

    const { preferredCurrency } = useShopping();

    const [summaryOpened, setSummaryOpened] = useState<boolean>(false);
    const { event } = useFacebookPixel();
    const trackTwitterEvent = useTwitterConversionTracker();

    useEffect(() => {
        const trackPurchase = async () => {
            try {
                const ecommerce = {
                    transaction_id: orderId,
                    value: data.total,
                    currency: preferredCurrency.name, 
                    coupon: data.appliedDiscount ? `DISCOUNT_APPLIED_${data.appliedDiscount.discountPercentage}%` : undefined,
                    items: data.cartItems.map((item: TCartItem, index: number) => ({
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
                };

                // Google Analytics
                (window as any).dataLayer = (window as any).dataLayer || [];
                // (window as any).dataLayer.push({ ecommerce: null });
                (window as any).dataLayer.push({
                    event: 'purchase',
                    ecommerce: ecommerce
                });

                // Facebook Pixel
                const uuid = uuidv4();
                const eventId = parseInt(uuid.split('-')[0]);
                event('Purchase', ecommerce, { eventID: eventId });
                await facebookInitiateCheckout(ecommerce, eventId);

                // Twitter Conversion
                trackTwitterEvent('tw-onqav-onuul', {
                    value: ecommerce.value,
                    currency: ecommerce.currency,
                    contents: ecommerce.items.map(item => ({
                        content_type: 'product',
                        content_id: item.item_id,
                        content_name: item.item_name,
                        content_price: item.price,
                        num_items: item.quantity,
                        content_group_id: item.item_category
                    })),
                    conversion_id: orderId,
                    email_address: correo
                });
            } catch (error) {
                console.error('Error tracking purchase:', error);
            }
        };

        if (data && orderId) {
            trackPurchase();
        }
    }, [data, orderId, correo, event, trackTwitterEvent]);

    const facebookInitiateCheckout = async (ecommerce: any, eventId: number) => {
        const userIpAddress = await getUserIpAddress();
        await fetch('/api/facebook/purchase', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ecommerce, eventId, userIpAddress})
        });
    };

    if (!data) {
        return <div>{paymentSuccessTranslations('cargandoResumen')}</div>;
    }

    return (
        <div className='flex flex-col py-24 px-24 sm:px-64 lg:px-0 lg:border-custom lg:rounded-custom w-full lg:w-1/3 h-fit
        bg-light-background lg:bg-background'>
            <div className={`flex transition-all duration-300 ease-linear lg:hidden ${summaryOpened ? 'mb-24' : ''} justify-between`}>
                <div className='flex space-x-8 cursor-pointer' onClick={() => setSummaryOpened(!summaryOpened)}>
                    <h2 className='font-semibold text-primary'>{translations('mostrarResumen')}</h2>
                    <KeyboardArrowDown className={`text-primary ${summaryOpened ? 'rotate-180' : ''}`}></KeyboardArrowDown>
                </div>
                <span className='font-medium text-heading'>{new Intl.NumberFormat(preferredCurrency.locale_format, {
                        style: 'currency',
                        currency: preferredCurrency.name,
                        minimumFractionDigits: 2
                    }).format(data.total * preferredCurrency.tasa)}</span>
            </div>
            <div className={`transition-all duration-300 ease-linear ${summaryOpened ? 'max-h-[2000px]' : 'max-h-0'} 
            overflow-hidden lg:max-h-full flex flex-col lg:space-y-24`}>
                <h2 className='hidden lg:block font-medium text-heading leading-body pb-12 lg:mx-24 border-b-custom text-center'>{translations('resumenPedido')}</h2>
                {data.cartItems.map((item: TCartItem) => {
                    return <LineItem key={item.plan.id} plan={item.plan} quantity={item.quantity} />
                })}
                {data.appliedDiscount.discountPercentage > 0 && (
                    <div className='flex justify-between items-center lg:mx-24 py-12'>
                        <p className='font-medium text-text-faded'>{discountTranslations('descuentoAplicado')}</p>
                        <span className='font-medium text-heading'>{data.appliedDiscount.discountPercentage}%</span>
                    </div>
                )}
                <div className='hidden lg:flex justify-between items-center lg:mx-24 py-12'>
                    <p className='font-medium text-text-faded'>{discountTranslations('total')}</p>
                    <span className='font-medium text-heading'>{new Intl.NumberFormat(preferredCurrency.locale_format, {
                        style: 'currency',
                        currency: preferredCurrency.name,
                        minimumFractionDigits: 2
                    }).format(data.total * preferredCurrency.tasa)}</span>
                </div>
            </div>
        </div>
    )
}

export default PurchaseSummary