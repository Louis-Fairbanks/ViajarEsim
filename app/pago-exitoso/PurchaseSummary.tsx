'use client'
import React, { useEffect, useState } from 'react'
import { KeyboardArrowDown } from '@mui/icons-material';
import LineItem from '../pago/LineItem';
import { TCartItem } from '../components/Types/TCartItem';

type PurchaseInfo = {
    planes: string
    descuentoAplicado: string;
};

type PurchaseSummaryProps = {
    purchaseInfo: PurchaseInfo;
    orderId: string
};

type PurchaseOrderInformation = {
    cartItems: TCartItem[],
    appliedDiscount: boolean,
    total: number
}

const PurchaseSummary = ({ purchaseInfo, orderId }: PurchaseSummaryProps) => {
    const [purchaseOrderInformation, setPurchaseOrderInformation] = useState<PurchaseOrderInformation | null>(null);
    const [summaryOpened, setSummaryOpened] = useState<boolean>(false)

    useEffect(() => {
        const getPurchaseInformation = async () => {
            try {
                const response = await fetch('/api/calcular-compra', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(purchaseInfo)
                });

                if (!response.ok) {
                    throw new Error('Error generating purchase info');
                }

                const data: PurchaseOrderInformation = await response.json();
                setPurchaseOrderInformation(data);
                (window as any).dataLayer = (window as any).dataLayer || [];
                (window as any).dataLayer.push({
                    'event': 'compraExitosa',
                    'orderId': orderId,
                    'purchaseTotal': data.total,
                    'descuentoAplicado': data.appliedDiscount,
                    'items': data.cartItems.map((item: TCartItem) => {
                        return {
                            'planId': item.plan.id,
                            'quantity': item.quantity,
                            'price': item.plan.precio,
                            'region': item.plan.region_nombre,
                            'provider': item.plan.proveedor,
                            'lowCost': item.plan.is_low_cost,
                        }})
                });
            } catch (error) {
                console.error('Error generating purchase info:', error);
            }
        }
        getPurchaseInformation();
    }, [purchaseInfo])

    if (!purchaseOrderInformation) {
        return <div>Cargando Resúmen del Pedido...</div>;
    }

    return (
        <div className='flex flex-col py-24 px-24 sm:px-64 lg:px-0 lg:border-custom lg:rounded-custom w-full lg:w-1/3 h-fit
        bg-light-background lg:bg-background'>
            <div className={`flex transition-all duration-300 ease-linear lg:hidden ${summaryOpened ? 'mb-24' : ''} justify-between`}>
                <div className='flex space-x-8 cursor-pointer' onClick={() => setSummaryOpened(!summaryOpened)}>
                    <h2 className='font-semibold text-primary'>Mostrar resúmen de mi pedido</h2>
                    <KeyboardArrowDown className={`text-primary ${summaryOpened ? 'rotate-180' : ''}`}></KeyboardArrowDown>
                </div>
                <span className='font-medium text-heading'>${purchaseOrderInformation.total.toLocaleString('es-ES', { minimumFractionDigits: 2 })}<span className='text-small text-text-faded ml-6'>USD</span></span>
            </div>
            <div className={`transition-all duration-300 ease-linear ${summaryOpened ? 'max-h-[2000px]' : 'max-h-0'} 
            overflow-hidden lg:max-h-full flex flex-col lg:space-y-24`}>
                <h2 className='hidden lg:block font-medium text-heading leading-body pb-12 lg:mx-24 border-b-custom text-center'>Resúmen del pedido</h2>
                {purchaseOrderInformation.cartItems.map((item: TCartItem) => {
                    return <LineItem key={item.plan.id} plan={item.plan} quantity={item.quantity} />
                })}
                {purchaseOrderInformation.appliedDiscount && (
                    <div className='flex justify-between items-center lg:mx-24 py-12'>
                        <p className='font-medium text-text-faded'>Descuento aplicado</p>
                        <span className='font-medium text-heading'>15%</span>
                    </div>
                )}
                <div className='hidden lg:flex justify-between items-center lg:mx-24 py-12'>
                    <p className='font-medium text-text-faded'>Total</p>
                    <span className='font-medium text-heading'>${purchaseOrderInformation.total.toLocaleString('es-ES', { minimumFractionDigits: 2 })}<span className='text-small text-text-faded ml-6'>USD</span></span>
                </div>
            </div>
        </div>
    )
}

export default PurchaseSummary