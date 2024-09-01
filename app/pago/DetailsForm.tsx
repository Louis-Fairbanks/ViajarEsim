'use client'
import React, { useEffect, useState } from 'react'
import { KeyboardArrowDown } from '@mui/icons-material'
import ButtonDark from '../components/ReusableComponents/ButtonDark'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { useShopping } from '../components/ShoppingContext/ShoppingContext'
import CheckoutPage from './CheckoutPage'

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined){
    throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY)

const DetailsForm = () => {

   const [total, setTotal] = useState<number>();

   const { cartItems } = useShopping();

   useEffect(() => {
    setTotal(cartItems.reduce((acc, item) => (acc + ( parseInt(item.plan.precio) * item.quantity)), 0));
    }, [])

    const convertToSubcurrency = (amount : number, factor = 100) => {
        return Math.round(amount * factor)
    }

  return (
    <>
    {total && <Elements stripe={stripePromise} options={{
        mode: "payment",
        amount: convertToSubcurrency(total),
        currency: "usd"
    }}>
        <CheckoutPage amount={total}>

        </CheckoutPage>
    </Elements>}

    <form className='flex flex-col space-y-16 pt-16 border-t-custom'>
    <div className='flex flex-col sm:flex-row space-y-16 sm:space-y-0 sm:space-x-16 w-full'>
        <input type='text' className='rounded-custom border-custom p-8 w-full sm:w-1/2' placeholder='Nombre *' />
        <input type='text' className='rounded-custom border-custom p-8 w-full sm:w-1/2' placeholder='Apellido *' />
    </div>
    <div className='flex flex-col sm:flex-row space-y-16 sm:space-y-0 sm:space-x-16 w-full'>
        <input type='text' className='rounded-custom border-custom p-8 w-full sm:w-1/2' placeholder='Correo electrónico *' />
        <input type='text' className='rounded-custom border-custom p-8 w-full sm:w-1/2' placeholder='Teléfono *' />
    </div>
    <div className='flex flex-col sm:flex-row space-y-16 sm:space-y-0 sm:space-x-16 w-full'>
        <div className='relative w-full sm:w-1/2'>
            <input className='border-custom rounded-custom w-full p-8' type='text' placeholder='País *' />
            <KeyboardArrowDown className='absolute right-8 top-8' />
        </div>
        <div className='relative w-full sm:w-1/2'>
            <input className='border-custom rounded-custom w-full p-8' type='text' placeholder='Estado *' />
            <KeyboardArrowDown className='absolute right-8 top-8' />
        </div>
    </div>
    <div className='flex flex-col sm:flex-row space-y-16 sm:space-y-0 sm:space-x-16 w-full'>
        <input type='text' className='rounded-custom border-custom p-8 w-full sm:w-1/2' placeholder='Ciudad *' />
        <input type='text' className='rounded-custom border-custom p-8 w-full sm:w-1/2' placeholder='Dirección *' />
    </div>
    <input type='text' className='rounded-custom border-custom p-8' placeholder='Código postal *' />
    <textarea className='rounded-custom border-custom p-8' placeholder='Notas adicionales' rows={2} />
    <div>
        <label className='flex items-center space-x-8'>
            <input type='checkbox' className='rounded-full border-custom' />
            <span>Estoy de acuerdo con los <span className='font-medium text-primary underline'>
                terminos y condiciónes.</span></span>
        </label>
        <label className='flex items-center space-x-8'>
            <input type='checkbox' className='rounded-full border-custom' />
            <span>Guardar mi información y consultar más rápidamente la próxima vez</span>
        </label>
    </div>
    <ButtonDark type='submit' extraClasses='py-8'>Continuar con el pago</ButtonDark>
</form>
</>
  )
}

export default DetailsForm
