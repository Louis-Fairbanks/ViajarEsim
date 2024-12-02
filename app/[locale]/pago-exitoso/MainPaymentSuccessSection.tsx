'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { Link } from '@/routing'
import PurchaseSummary from './PurchaseSummary'
import { useShopping } from '../components/ShoppingContext/ShoppingContext'
import { useTranslations } from 'next-intl'
import { useLocale } from 'next-intl'
import { TCartItem } from '../components/Types/TCartItem'
import { Discount } from '../components/Types/TDiscount'
import { v4 as uuidv4 } from 'uuid';

type Props = {
  body: string
  planes: string
  descuentoAplicado: string
  correo: string
}

type PurchaseOrderInformation = {
  cartItems: TCartItem[],
  appliedDiscount: Discount,
  total: number
}

const MainPaymentSuccessSection = ({ body, planes, descuentoAplicado, correo }: Props) => {

  const uuid = uuidv4();
const firstSegment = uuid.split('-')[0]; // Get the first segment of the UUID
const randomNumber = parseInt(firstSegment, 16);

  const locale = useLocale()
  const translations = useTranslations('PaymentSuccess')
  const { resetAfterConfirmedPurchase } = useShopping();

  const [orderId, setOrderId] = useState<string>('');
  const [purchaseOrderInformation, setPurchaseOrderInformation] = useState<PurchaseOrderInformation | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {

        const storedCurrency = localStorage.getItem('preferredCurrency');
        const currency = storedCurrency ? JSON.parse(storedCurrency) : {
          name: 'USD',
          tasa: 1,
          locale_format: 'en-US'
        };
        // Fetch order ID
        const bodyObj = JSON.parse(body);
        const updatedBodyObj = {
          ...bodyObj,
          locale: locale,
          tasa_conversion: currency.tasa,
          moneda: currency.name,
          total_format: currency.locale_format
        };
        const updatedBody = JSON.stringify(updatedBodyObj);

        const orderResponse = await fetch('/api/enviar-esim', { 
          method: 'POST', 
          body: updatedBody 
        });
        const orderData = await orderResponse.json();
        setOrderId(orderData.orderId ?? randomNumber);

        // Fetch purchase summary
        const summaryResponse = await fetch('/api/calcular-compra', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ planes, descuentoAplicado })
        });
        const summaryData = await summaryResponse.json();
        setPurchaseOrderInformation(summaryData);

        resetAfterConfirmedPurchase();
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className='flex px-32 py-16 justify-center lg:justify-between items-center flex-shrink-0 border-b-custom border-accent'>
        <Link href='/'>
          <div className='flex space-x-8 items-center text-subheading'>
            <Image
              src='/img/favicon.png'
              alt='logo viajar esim'
              width={36}
              height={36}
            />
            <h1 className='font-semibold'>ViajareSIM</h1>
          </div>
        </Link>
      </div>
      <div className='flex flex-col-reverse lg:flex-row p-24 sm:p-64 lg:space-x-48'>
        <div className='flex flex-col h-fit p-24 border-custom rounded-custom space-y-16 items-center text-center w-full lg:w-2/3'>
          <div className='relative'>
            <div className='z-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
              <Image className='-mt-6 ml-6'
                src='/media/check.svg'
                alt='Check'
                width={40}
                height={30}
              />
            </div>
            <Image src='/media/compra-realizada.png'
              alt='Compra realizada'
              width={100}
              height={100}
            />
          </div>
          <h1 className='font-semibold text-heading'>{translations('gracias')}</h1>
          <p>{translations('enBreves')}</p>
          <Link href='/que-es-una-esim' className='underline text-primary text-bold'>{translations('noSabes')}</Link>
          <h2 className='font-semibold text-subheading'>{translations('datosFacturacion')}</h2>
          <div className='border-custom rounded-custom w-full px-24 py-12 text-start'>
            <span className='text-text-faded mr-12'>{translations('contacto')}</span> {correo}
          </div>
        </div>
        {!purchaseOrderInformation && <div>{translations('cargandoResumen')}</div>}
        {purchaseOrderInformation && <PurchaseSummary 
          data={purchaseOrderInformation}
          orderId={orderId}
          correo={correo}
        />}
      </div>
    </div>
  )
}

export default MainPaymentSuccessSection