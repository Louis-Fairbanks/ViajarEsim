'use client'
import React, { useState } from 'react'
import Nav from './Nav'
import HeaderButtons from './HeaderButtons'
import MenuIcon from '@mui/icons-material/Menu';
import Sidebar from '../ShoppingContext/Sidebar';
import MobileMenu from './MobileMenu';
import Link from 'next/link';
import Image from 'next/image';
import SavedItems from '../ShoppingContext/SavedItems';
import LanguageAndCurrency from './LanguageAndCurrency';

const NavAndHeaderButtons = () => {

  const [destinationsClicked, setDestinationsClicked] = useState<boolean>(false)
  const [mobileMenuActivated, setMobileMenuActivated] = useState<boolean>(false)
  const [activatedSidebar, setActivatedSidebar] = useState<string>('');

  const renderHeader = () => {
    return <Link href='/'>
      <div className='flex space-x-8 items-center text-subheading'>
        <Image
          src='/media/favicon.png'
          alt='logo viajar esim'
          width={36}
          height={36}
        />
        <h1 className='font-semibold'>ViajareSIM</h1>
      </div>
    </Link>
  }

  return (
    <>
      <Nav destinationsClicked={destinationsClicked} />
      <HeaderButtons destinationsClicked={destinationsClicked} setDestinationsClicked={setDestinationsClicked} />
      <div className='lg:hidden'>
        <div className={`fixed top-0 left-0 w-screen h-screen bg-text bg-opacity-60 transition-all duration-1000 ease-in-out
            ${mobileMenuActivated ? 'z-50 opacity-100' : '-z-10 opacity-0'}`} 
            onClick={() => {
              setMobileMenuActivated(false)
              setActivatedSidebar('')
            }}></div>
        <MenuIcon className="cursor-pointer" onClick={() => setMobileMenuActivated(true)}></MenuIcon>
      </div>
      <Sidebar header={renderHeader} selected={mobileMenuActivated} setOverlayActivated={setMobileMenuActivated}>
        <MobileMenu setActivatedSidebar={setActivatedSidebar}/>
      </Sidebar>
      <Sidebar header='Lista de deseados' setActivatedSidebar={setActivatedSidebar}
                selected={activatedSidebar === 'Lista de deseados'} setOverlayActivated={setMobileMenuActivated}>
                <SavedItems />
      </Sidebar>
      <Sidebar header='Selecciona tu lenguaje' selected={activatedSidebar === 'Selecciona tu lenguaje'}
                setActivatedSidebar={setActivatedSidebar} setOverlayActivated={setMobileMenuActivated}>
                <LanguageAndCurrency />
      </Sidebar>
    </>
  )

}

export default NavAndHeaderButtons
