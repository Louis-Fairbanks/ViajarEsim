'use client'
import React, { useEffect, useState} from 'react'
import Image from 'next/image'
import Link from 'next/link'
import PurchaseSummary from './PurchaseSummary'
import { useShopping } from '../components/ShoppingContext/ShoppingContext'

type PurchaseInfo = {
    planes: string
    descuentoAplicado : string;
  };

type Props = {
    body: string
    planes: string
    descuentoAplicado: string
    correo: string
}


const MainPaymentSuccessSection = ({body, planes, descuentoAplicado, correo} : Props) => {
    const { resetAfterConfirmedPurchase } = useShopping();

    const [orderId, setOrderId] = useState<string>('');
    useEffect(() => {
        const postData = async () => {
            const data = await fetch('/api/enviar-esim', {
                method: 'POST',
                body: body,
            })
            if(!data){
                console.log('Error confirming the purchase but it probably went through')
            } else{
                const response = await data.json();
                setOrderId(response.orderId);
                console.log('Purchase confirmed')
            }
        }
        postData();
        resetAfterConfirmedPurchase();
    }, [])
  
  
    const generatePurchaseInfo : PurchaseInfo = {
      planes: planes, 
      descuentoAplicado: descuentoAplicado   
    }


  return (
    <div >
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
        <h1 className='font-semibold text-heading'>¡Muchas gracias!</h1>
        <p>En breves recibiras nuestro correo electronico, entregandote toda la información necesaria para que puedas instalar y activar tu eSIM en el momento que la necesites.</p>
        <Link href='/que-es-una-esim' className='underline text-primary text-bold'>¿No sabes instalar/activar tu eSIM?</Link>
        <h2 className='font-semibold text-subheading'>Datos de facturación</h2>
        <div className='border-custom rounded-custom w-full px-24 py-12 text-start'>
          <span className='text-text-faded mr-12'>Contacto</span> {correo}
        </div>
      </div>
      {orderId === '' && <div>Cargando Resúmen del Pedido...</div>}
      {orderId != '' && <PurchaseSummary orderId={orderId} purchaseInfo={generatePurchaseInfo}/>}
    </div>
  </div>
  )
}

export default MainPaymentSuccessSection
