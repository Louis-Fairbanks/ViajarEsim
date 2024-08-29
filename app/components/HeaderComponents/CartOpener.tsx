'use client'
import React from 'react'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useShopping } from '../ShoppingContext/ShoppingContext';


const CartOpener = () => {

    const { setOpenedSidebar } = useShopping();

    return (
        <div className='lg:hidden'>
            <ShoppingCartOutlinedIcon className='cursor-pointer' style={{ fill: '#121212' }} 
            onClick={() => setOpenedSidebar('Carrito')}/>
        </div>
    )
}

export default CartOpener
