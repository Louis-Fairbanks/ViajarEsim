import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';

interface Props {
    planType: string
    planName: string
    price: string
    region: string
    deleteOnClick : () => void
}

const CartItem = ({ planType, planName, price, region, deleteOnClick }: Props) => {
    return (
        <div className='py-24 mt-24 border-t-custom'>
            <div className='flex justify-between items-center'>
                <div className='flex space-x-12 items-center'>
                    <div className="relative w-65 h-65 overflow-hidden rounded-full border-custom">
                        <span className={`fi fi-${region} h-65 w-65 absolute -left-1 -top-6 scale-150`}></span>
                    </div>
                    <div className='flex flex-col'>
                        <p className='text-small font-semibold text-text-faded'>{planType}</p>
                        <h4 className="font-semibold text-subheading">{planName}</h4>
                        <p>{price} <span className='text-small text-text-faded'>USD</span></p>
                        <div className='border-custom rounded-custom p-8 flex space-x-32 w-fit'>
                            <button className='text-text-faded'>-</button>
                            <span>1</span>
                            <button>+</button>
                        </div>
                    </div>
                </div>
                <div onClick={deleteOnClick}
                className='border-alert rounded-custom border-custom w-48 h-48 cursor-pointer flex items-center justify-center'>
                    <DeleteIcon style={{ color: '#AA4F4F' }} />
                </div>
            </div>
        </div>
    )
}

export default CartItem
