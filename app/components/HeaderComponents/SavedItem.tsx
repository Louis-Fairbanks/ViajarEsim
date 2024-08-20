import React from 'react'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

interface Props {
    planName: string,
    price: string,
    region: string,
}

const SavedItem = ({ planName, price, region }: Props) => {
    return (
        <div className='py-24 border-t-custom'>
            <div className='flex justify-between items-center'>
                <div className='flex space-x-12 items-center'>
                    <div className="relative w-65 h-65 overflow-hidden rounded-full border-custom">
                        <span className={`fi fi-${region} h-65 w-65 absolute -left-1 -top-6 scale-150`}></span>
                    </div>
                    <div className='flex flex-col'>
                        <h4 className="font-semibold text-subheading">{planName}</h4>
                        <p>{price} <span className='text-small text-text-faded'>USD</span></p>
                    </div>
                </div>
                <div className='border-primary rounded-custom border-custom w-48 h-48 flex items-center justify-center'>
                    <ShoppingCartOutlinedIcon style={{ color: '#6C85FF'}}/>
                </div>
            </div>
        </div>
    )
}

export default SavedItem
