'use client'
import React, { useEffect, useState } from 'react'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { useShopping } from '../components/ShoppingContext/ShoppingContext'
import CheckoutPage from './CheckoutPage'
import Link from 'next/link'
import ButtonLight from '../components/ReusableComponents/ButtonLight'

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
    throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY)

const DetailsForm = () => {

    const [nombre, setNombre] = useState<string>('');
    const [correo, setCorreo] = useState<string>('');
    const [apellido, setApellido] = useState<string>('');
    const [celular, setCelular] = useState<string>('');
    const [tycAgreed, setTycAgreed] = useState<boolean>(false);

    const { total } = useShopping();

    const convertToSubcurrency = (amount: number, factor = 100) => {
        return Math.round(amount * factor)
    }

    return (
        <>

            <div className='flex flex-col space-y-16 pt-16 border-t-custom'>
                <div className='flex flex-col sm:flex-row space-y-16 sm:space-y-0 sm:space-x-16 w-full'>
                    <input type='text' className='rounded-custom border-custom p-8 w-full sm:w-1/2' placeholder='Nombre *'
                        onChange={(e) => setNombre(e.target.value)} />
                    <input type='text' className='rounded-custom border-custom p-8 w-full sm:w-1/2' placeholder='Apellido *' 
                    onChange={(e) => setApellido(e.target.value)}/>
                </div>
                <div className='flex flex-col sm:flex-row space-y-16 sm:space-y-0 sm:space-x-16 w-full'>
                    <input type='email' className='rounded-custom border-custom p-8 w-full sm:w-1/2' placeholder='Correo electrónico *'
                        onChange={(e) => setCorreo(e.target.value)} />
                    <input type='text' className='rounded-custom border-custom p-8 w-full sm:w-1/2' placeholder='Teléfono *' 
                    onChange={(e) => setCelular(e.target.value)}/>
                </div>
                {/* <div className='flex flex-col sm:flex-row space-y-16 sm:space-y-0 sm:space-x-16 w-full'>
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
    </div> */}
                {/* <input type='text' className='rounded-custom border-custom p-8' placeholder='Código postal *' />
    <textarea className='rounded-custom border-custom p-8' placeholder='Notas adicionales' rows={2} /> */}
                <div>
                    <label className='flex items-center space-x-8'>
                        <input type='checkbox' className='rounded-full border-custom' onChange={(e) => setTycAgreed(e.target.checked)} />
                        <span>Estoy de acuerdo con los <Link href='/terminos-y-condiciones'><span className='font-medium text-primary underline'>
                            terminos y condiciónes.</span></Link></span>
                    </label>
                    {/* <label className='flex items-center space-x-8'>
                        <input type='checkbox' className='rounded-full border-custom' />
                        <span>Guardar mi información y consultar más rápidamente la próxima vez</span>
                    </label> */}
                </div>
                {total === 0 ?
                    <div>
                        <p>Tu carrito está vacío</p>
                        <Link href='/destinos'>
                            <ButtonLight extraClasses='w-full'>
                                Seguir comprando
                            </ButtonLight>
                        </Link>
                    </div> :
                    total && <Elements stripe={stripePromise} options={{
                        mode: "payment",
                        amount: convertToSubcurrency(total),
                        currency: "usd"
                    }}>
                        <CheckoutPage tycAgreed={tycAgreed} amount={total} correo={correo} nombre={nombre} apellido={apellido} celular={celular}/>
                    </Elements>
                }
            </div>
        </>
    )
}

export default DetailsForm
