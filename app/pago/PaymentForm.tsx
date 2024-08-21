import React from 'react'
import ButtonDark from '../components/ReusableComponents/ButtonDark'
import { KeyboardArrowDown } from '@mui/icons-material'

const PaymentForm = () => {
    return (
        <div className='flex flex-col space-y-12 p-24 border-custom rounded-custom'>
            <h2 className='font-medium text-heading leading-body text-center'>Datos personales</h2>
            <form className='flex flex-col space-y-16 pt-16 border-t-custom'>
                <div className='flex space-x-16 w-full'>
                    <input type='text' className='rounded-custom border-custom p-8 w-1/2' placeholder='Nombre *' />
                    <input type='text' className='rounded-custom border-custom p-8 w-1/2' placeholder='Apellido *' />
                </div>
                <div className='flex space-x-16 w-full'>
                    <input type='text' className='rounded-custom border-custom p-8 w-1/2' placeholder='Correo electrónico *' />
                    <input type='text' className='rounded-custom border-custom p-8 w-1/2' placeholder='Teléfono *' />
                </div>
                <div className='flex space-x-16 w-full'>
                    <div className='relative w-1/2'>
                        <input className='border-custom rounded-custom w-full p-8' type='text' placeholder='País *' />
                        <KeyboardArrowDown className='absolute right-8 top-8' />
                    </div>
                    <div className='relative w-1/2'>
                        <input className='border-custom rounded-custom w-full p-8' type='text' placeholder='Estado *' />
                        <KeyboardArrowDown className='absolute right-8 top-8' />
                    </div>
                </div>
                <div className='flex space-x-16 w-full'>
                    <input type='text' className='rounded-custom border-custom p-8 w-1/2' placeholder='Ciudad *' />
                    <input type='text' className='rounded-custom border-custom p-8 w-1/2' placeholder='Dirección *' />
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
                <ButtonDark type='submit' extraClasses='py-8'>Completar pedido</ButtonDark>
            </form>
        </div>
    )
}

export default PaymentForm