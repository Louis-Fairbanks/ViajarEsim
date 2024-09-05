'use client'
import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import { Plan } from '../Types/TPlan';

interface Props {
    plan : Plan
    itemQuantity : number
    deleteOnClick: (id : number) => void
    adjustQuantity: (id : number , quantity: number) => void
}

const CartItem = ({ plan, itemQuantity,  deleteOnClick, adjustQuantity }: Props) => {

    const precioNoZeros = Number(plan.precio).toLocaleString('ES-es', { minimumFractionDigits: 2, maximumFractionDigits: 2});
    const dataNoGB = plan.data.replace('GB' , '');

    return (
        <div className='py-16 border-t-custom'>
            <div className='flex justify-between items-center'>
                <div className='flex space-x-12 items-center'>
                    <div className="relative w-65 h-65 overflow-hidden rounded-full border-custom">
                        <span className={`fi fi-${plan.region_isocode} h-65 w-65 absolute -left-1 -top-6 scale-150`}></span>
                    </div>
                    <div className='flex flex-col'>
                        <p className='text-small font-semibold text-text-faded'>{plan.plan_nombre}</p>
                        <h4 className='font-semibold text-subheading'>eSIM {plan.region_nombre}</h4>
                        <p className='text-small text-text-faded'>{plan.duracion === '1' ? '1 día ' : `${plan.duracion} días `}
                        {plan.data === 'unlimited' ? 'datos ilimitados' : dataNoGB + ' GB'}</p>
                        <p>{precioNoZeros} <span className='text-small text-text-faded'>USD</span></p>
                        <div className='border-custom rounded-custom p-8 flex space-x-32 text-heading w-fit'>
                            <button
                                className={`${itemQuantity === 1 ? 'text-button-light-deactivated cursor-not-allowed' : ''}`}
                                onClick={() => adjustQuantity((itemQuantity > 1 ? itemQuantity - 1 : 1), plan.id)}
                            >-</button>
                            <span>{itemQuantity}</span>
                            <button onClick={() => adjustQuantity((itemQuantity + 1), plan.id)}>+</button>
                        </div>
                    </div>
                </div>
                <div onClick={() => deleteOnClick(plan.id)}
                    className='border-alert rounded-custom border-custom w-48 h-48 mr-5 cursor-pointer flex items-center justify-center'>
                    <DeleteIcon style={{ color: '#AA4F4F' }} />
                </div>
            </div>
        </div>
    )
}

export default CartItem
