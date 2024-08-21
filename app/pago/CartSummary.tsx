import React from 'react'
import "/node_modules/flag-icons/css/flag-icons.min.css"
import ButtonDark from '../components/ReusableComponents/ButtonDark'
import CheckIcon from '@mui/icons-material/Check';

const CartSummary = () => {
    return (
        <div className='flex flex-col space-y-24 py-24 border-custom rounded-custom w-1/3 h-fit'>
            <h2 className='font-medium text-heading leading-body pb-12 mx-24 border-b-custom text-center'>Resúmen del pedido</h2>
            <div className='flex flex-col space-y-12'>
                <div className='flex justify-between items-center border-b-custom mx-24 pb-12'>
                    <p className='font-medium text-text-faded'>País</p>
                    <div className='flex items-center space-x-12'>
                        <div className="relative w-32 h-32 overflow-hidden rounded-full border-custom">
                            <span className={`fi fi-us h-32 w-32 absolute left-0 -top-6 scale-200`}></span>
                        </div>
                        <span className='font-medium text-subheading'>Estados Unidos</span>
                    </div>
                </div>
                <div className='flex justify-between items-center border-b-custom mx-24 pb-12'>
                    <p className='font-medium text-text-faded'>Datos</p>
                    <span className='font-medium text-subheading'>1 GB</span>
                </div>
                <div className='flex justify-between items-center border-b-custom mx-24 pb-12'>
                    <p className='font-medium text-text-faded'>Duración</p>
                    <span className='font-medium text-subheading'>7 días</span>
                </div>
                <div className='flex justify-between items-center py-12 px-24 bg-payment-methods'>
                    <p className='font-medium text-text-faded'>Precio</p>
                    <span className='font-medium text-heading'>$4.50<span className='text-small text-text-faded ml-6'>USD</span></span>
                </div>
                <div className='border-custom rounded-custom flex justify-between px-12 py-8 mx-24 space-x-12'>
                    <input className='w-full' placeholder='Código de descuento'/>
                    <ButtonDark extraClasses='w-32 h-32'><CheckIcon style={{ color : '#FFFFFF'}}/></ButtonDark>
                </div>
                <div className='flex justify-between items-center mx-24 py-12'>
                    <p className='font-medium text-text-faded'>Precio</p>
                    <span className='font-medium text-heading'>$4.50<span className='text-small text-text-faded ml-6'>USD</span></span>
                </div>
            </div>
        </div>
    )
}

export default CartSummary
