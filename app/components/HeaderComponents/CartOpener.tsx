'use client'
import React from 'react'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useShopping } from '../ShoppingContext/ShoppingContext';


const CartOpener = () => {

    const { cartItems, setOpenedSidebar } = useShopping();
    const totalItems = cartItems.length;

    return (
        <div className='lg:hidden relative cursor-pointer' onClick={() => setOpenedSidebar('Carrito')}>
            <ShoppingCartOutlinedIcon style={{ fill: '#121212' }}/>
            {totalItems && totalItems > 0 ? <div className='absolute rounded-full h-12 w-12 flex items-center justify-center
                bg-alert right-2 top-2 text-[8px] font-semibold text-background'>
                        {totalItems}</div> : ''}
        </div>
    )
}

export default CartOpener
