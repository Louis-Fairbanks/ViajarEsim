'use client';
import React, { useState, createContext, useContext, useEffect } from 'react'
import Sidebar from './Sidebar';
import CartItems from './CartItems';
import LanguageAndCurrency from '../HeaderComponents/LanguageAndCurrency';
import MobileMenu from '../HeaderComponents/MobileMenu';
import Image from 'next/image';
import Link from 'next/link';
import { Plan } from '../Types/TPlan';
import { TCartItem } from '../Types/TCartItem';

interface ShoppingState {
  preferredCurrency: string;
  setPreferredCurrency: (currency: string) => void;
  preferredLanguage: string;
  setPreferredLanguage: (language: string) => void;
  cartItems: TCartItem[];
  setCartItems: (items: TCartItem[]) => void;
  openedSidebar: string;
  setOpenedSidebar: (opened: string) => void;
}

const defaultShoppingState: ShoppingState = {
  preferredCurrency: 'USD',
  setPreferredCurrency: () => { },
  preferredLanguage: 'es',
  setPreferredLanguage: () => { },
  cartItems: [],
  setCartItems: ()  => { },
  openedSidebar: '',
  setOpenedSidebar: () => { }
}

const ShoppingContext = createContext<ShoppingState>(defaultShoppingState);

export const ShoppingProvider = ({ children }: { children: React.ReactNode }) => {
  const [preferredCurrency, setPreferredCurrency] = useState<string>('USD');
  const [preferredLanguage, setPreferredLanguage] = useState<string>('es');
  const [cartItems, setCartItems] = useState<TCartItem[]>([]);
  const [openedSidebar, setOpenedSidebar] = useState<string>('');

  useEffect(() => {
    const cartItems = localStorage.getItem('cartItems');
    if (cartItems) {
      setCartItems(JSON.parse(cartItems));
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems])

  const value = {
    preferredCurrency,
    setPreferredCurrency,
    preferredLanguage,
    setPreferredLanguage,
    cartItems,
    setCartItems,
    openedSidebar,
    setOpenedSidebar
  };

  //render header for mobile
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
    <ShoppingContext.Provider value={value}>
      <div className={`fixed top-0 left-0 w-screen h-screen bg-text bg-opacity-60 transition-all duration-1000 ease-in-out
            ${openedSidebar === '' ? '-z-[1] opacity-0' : 'z-10 opacity-100'}`}
        onClick={() => {
          setOpenedSidebar('')
        }}></div>
      <Sidebar header='Carrito' setOpenedSidebar={setOpenedSidebar}
        selected={openedSidebar === 'Carrito'}>
        <CartItems />
      </Sidebar>
      <Sidebar header='Selecciona tu lenguaje' selected={openedSidebar === 'Selecciona tu lenguaje'}
        setOpenedSidebar={setOpenedSidebar}>
        <LanguageAndCurrency />
      </Sidebar>
      <Sidebar header={renderHeader} selected={openedSidebar === 'Mobile'} setOpenedSidebar={setOpenedSidebar}>
        <MobileMenu/>
      </Sidebar>
      {children}
    </ShoppingContext.Provider>
  )
}

export const useShopping = () => {
  const context = useContext(ShoppingContext);
  if (context === undefined) {
    throw new Error('useShopping must be used within a ShoppingProvider');
  }
  return context;
}
