'use client';
import React, { useState, createContext, useContext, useEffect } from 'react'
import Sidebar from './Sidebar';
import CartItems from './CartItems';
import LanguageAndCurrency from '../HeaderComponents/LanguageAndCurrency';
import MobileMenu from '../HeaderComponents/MobileMenu';
import Image from 'next/image';
import Link from 'next/link';
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
  discountApplied: boolean;
  setDiscountApplied: (discount: boolean) => void;
  total: number;
  applyDiscount: () => void;
  resetAfterConfirmedPurchase: () => void;
}

const defaultShoppingState: ShoppingState = {
  preferredCurrency: 'USD',
  setPreferredCurrency: () => { },
  preferredLanguage: 'es',
  setPreferredLanguage: () => { },
  cartItems: [],
  setCartItems: () => { },
  openedSidebar: '',
  setOpenedSidebar: () => { },
  discountApplied: false,
  setDiscountApplied: () => { },
  total: 0,
  applyDiscount: () => { },
  resetAfterConfirmedPurchase: () => { },
}

const ShoppingContext = createContext<ShoppingState>(defaultShoppingState);

export const ShoppingProvider = ({ children }: { children: React.ReactNode }) => {
  const [preferredCurrency, setPreferredCurrency] = useState<string>('USD');
  const [preferredLanguage, setPreferredLanguage] = useState<string>('es');
  const [cartItems, setCartItems] = useState<TCartItem[]>([]);
  const [openedSidebar, setOpenedSidebar] = useState<string>('');
  const [discountApplied, setDiscountApplied] = useState<boolean>(false);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    const cartItems = localStorage.getItem('cartItems');
    if (cartItems) {
      setCartItems(JSON.parse(cartItems));
    }

    const discount = localStorage.getItem('discountApplied');
    if (discount) {
      setDiscountApplied(JSON.parse(discount));
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    calculateTotal();
  }, [cartItems, discountApplied])

  useEffect(() => {
    localStorage.setItem('discountApplied', JSON.stringify(discountApplied));
  }, [discountApplied])

  const calculateTotal = () => {
    let newTotal = cartItems.reduce((acc, item) => acc + item.plan.precio * item.quantity, 0);
    if (discountApplied) {
      newTotal *= 0.85; // 15% discount
    }
    setTotal(newTotal);
  }

  const applyDiscount = () => {
    if (!discountApplied) {
      setDiscountApplied(true);
    }
  }

  const resetAfterConfirmedPurchase = () => {
    setCartItems([]);
    setDiscountApplied(false);
    setTotal(0);
  }

  const value = {
    preferredCurrency,
    setPreferredCurrency,
    preferredLanguage,
    setPreferredLanguage,
    cartItems,
    setCartItems,
    openedSidebar,
    setOpenedSidebar,
    discountApplied,
    setDiscountApplied,
    total,
    applyDiscount,
    resetAfterConfirmedPurchase,
  };

  // render header for mobile
  const renderHeader = () => {
    return <Link href='/'>
      <div className='flex space-x-8 items-center text-subheading'>
        <Image
          src='/img/favicon.png'
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