'use client'
import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';

interface Props {
    id: number
    planName: string
    price: number
    regionName: string
    regionIsocode: string
    itemQuantity: number
    deleteOnClick: (id : number) => void
    adjustQuantity: (id : number , quantity: number) => void
}

const CartItem = ({ id, planName, regionName, price, regionIsocode, itemQuantity, deleteOnClick,
    adjustQuantity }: Props) => {
    return (
        <div className='py-24 mt-24 border-t-custom'>
            <div className='flex justify-between items-center'>
                <div className='flex space-x-12 items-center'>
                    <div className="relative w-65 h-65 overflow-hidden rounded-full border-custom">
                        <span className={`fi fi-${regionIsocode} h-65 w-65 absolute -left-1 -top-6 scale-150`}></span>
                    </div>
                    <div className='flex flex-col'>
                        <p className='text-small font-semibold text-text-faded'>{planName}</p>
                        <h4 className='font-semibold text-subheading'>eSIM {regionName}</h4>
                        <p>{price} <span className='text-small text-text-faded'>USD</span></p>
                        <div className='border-custom rounded-custom p-8 flex space-x-32 text-heading w-fit'>
                            <button
                                className={`${itemQuantity === 1 ? 'text-button-light-deactivated cursor-not-allowed' : ''}`}
                                onClick={() => adjustQuantity((itemQuantity > 1 ? itemQuantity - 1 : 1), id)}
                            >-</button>
                            <span>{itemQuantity}</span>
                            <button onClick={() => adjustQuantity((itemQuantity + 1), id)}>+</button>
                        </div>
                    </div>
                </div>
                <div onClick={() => deleteOnClick(id)}
                    className='border-alert rounded-custom border-custom w-48 h-48 mr-5 cursor-pointer flex items-center justify-center'>
                    <DeleteIcon style={{ color: '#AA4F4F' }} />
                </div>
            </div>
        </div>
    )
}

export default CartItem
