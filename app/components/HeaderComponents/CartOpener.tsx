'use client'
import React, { useState } from 'react'
import Sidebar from '../ShoppingContext/Sidebar'
import CartItems from '../ShoppingContext/CartItems'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';


const CartOpener = () => {

    const [cartMenuOpened, setCartMenuOpened] = useState<boolean>(false)

    return (
        <div className='lg:hidden'>
            <div className={`fixed top-0 left-0 w-screen h-screen bg-text bg-opacity-60 transition-all duration-1000 ease-in-out
            ${cartMenuOpened ? 'z-50 opacity-100' : '-z-10 opacity-0'}`} onClick={() => setCartMenuOpened(false)}></div>
            <ShoppingCartOutlinedIcon className='cursor-pointer' style={{ fill: '#121212' }} onClick={() => {setCartMenuOpened(true)}}/>
            <Sidebar header='Carrito' selected={cartMenuOpened} setOverlayActivated={setCartMenuOpened}>
                <CartItems />
            </Sidebar>
        </div>
    )
}

export default CartOpener
