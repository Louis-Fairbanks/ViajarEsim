import React from 'react'
import ButtonDark from '../components/ReusableComponents/ButtonDark'
import { KeyboardArrowDown } from '@mui/icons-material'
import { KeyboardArrowUp } from '@mui/icons-material'
import Image from 'next/image'

const FinalizePayment = () => {
    return (
        <div className='flex flex-col space-y-12 p-24 lg:border-custom rounded-custom'>
            <h2 className='font-medium text-heading leading-body text-center border-b-custom pb-16'>Elige tu método de pago</h2>
            <div className='border-custom rounded-custom px-24 pb-24 pt-6'>
                <div className='flex justify-between items-center py-6'>
                    <div className='flex space-x-12'>
                    <Image
                        src='/media/visa.svg'
                        alt='Visa'
                        width={42}
                        height={17}
                    />
                    <Image 
                        src='/media/mastercard.svg'
                        alt='Mastercard'
                        width={42}
                        height={17}
                    />
                    </div>
                    <KeyboardArrowUp />
                </div>
                <form className='flex flex-col space-y-16'>
                    <input type='text' className='rounded-custom border-custom p-8' placeholder='Número de la tarjeta' />
                    <div className='flex flex-col md:flex-row space-y-16 md:space-y-0 md:space-x-16 w-full'>
                        <input type='text' className='rounded-custom border-custom p-8 w-full md:w-1/2' placeholder='Fecha de vencimiento' />
                        <input type='text' className='rounded-custom border-custom p-8 w-full md:w-1/2' placeholder='CCV' />
                    </div>
                    <input type='text' className='rounded-custom border-custom p-8' placeholder='Nombre del titular' />
                    <ButtonDark type='submit' extraClasses='py-8'>Completar pedido</ButtonDark>
                </form>
            </div>
            <div className='border-custom rounded-custom flex justify-between items-center py-6 px-24'>
                <Image
                    src='/media/gPay.svg'
                    alt='Google Pay'
                    width={42}
                    height={17}
                />
                <KeyboardArrowDown />
            </div>
            <div className='border-custom rounded-custom flex justify-between items-center pl-32 pr-24'>
                <Image className='scale-125'
                    src='/media/paypal.svg'
                    alt='Paypal'
                    width={61}
                    height={25}
                />
                <KeyboardArrowDown />
            </div>
            <div className='border-custom rounded-custom flex justify-between items-center py-6 px-24'>
                <Image
                    src='/media/applePay.svg'
                    alt='Apple Pay'
                    width={42}
                    height={17}
                />
                <KeyboardArrowDown />
            </div>
        </div>
    )
}

export default FinalizePayment
