'use client'
import React, { useState } from 'react'
import Nav from './Nav'
import HeaderButtons from './HeaderButtons'
import MenuIcon from '@mui/icons-material/Menu';
import { useShopping } from '../ShoppingContext/ShoppingContext';


const NavAndHeaderButtons = () => {

  const { setOpenedSidebar } = useShopping();

  const [destinationsClicked, setDestinationsClicked] = useState<boolean>(false)

  return (
    <>
      <Nav destinationsClicked={destinationsClicked} />
      <HeaderButtons destinationsClicked={destinationsClicked} setDestinationsClicked={setDestinationsClicked} />
      <div className='lg:hidden'>
        <MenuIcon className="cursor-pointer" onClick={() => setOpenedSidebar('Mobile')}></MenuIcon>
      </div>
    </>
  )

}

export default NavAndHeaderButtons
