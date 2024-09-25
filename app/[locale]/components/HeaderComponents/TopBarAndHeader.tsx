'use client'
import React from 'react'
import TopBar from './TopBar'
import Header from './Header'
import { useShopping } from '../ShoppingContext/ShoppingContext'

const TopBarAndHeader = () => {

    const {openedSidebar} = useShopping()

    return (
        <div className={`min-h-[110px] ${openedSidebar === '' ? 'z-[2]' : 'z-[1]'} bg-background`}>
            <div className={`fixed w-full ${openedSidebar === '' ? 'z-[2]' : 'z-[1]'}  bg-background`}>
                <TopBar />
                <Header />
            </div>
        </div>
    )
}

export default TopBarAndHeader
