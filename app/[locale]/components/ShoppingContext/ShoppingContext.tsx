'use client';
import React, { useState, createContext, useContext, useEffect } from 'react'
import Sidebar from './Sidebar';
import CartItems from './CartItems';
import LanguageAndCurrency from '../HeaderComponents/LanguageAndCurrency';
import MobileMenu from '../HeaderComponents/MobileMenu';
import Image from 'next/image';
import { Link } from '@/routing';
import { TCartItem } from '../Types/TCartItem';
import { Discount } from '../Types/TDiscount';
import { useTranslations } from 'next-intl';

interface ShoppingState {
  preferredCurrency: string;
  setPreferredCurrency: (currency: string) => void;
  preferredLanguage: string;
  setPreferredLanguage: (language: string) => void;
  cartItems: TCartItem[];
  setCartItems: (items: TCartItem[]) => void;
  openedSidebar: string;
  setOpenedSidebar: (opened: string) => void;
  appliedDiscount: Discount | undefined;           //tracks whether or not a discount has been applied irrespective of the discount %
  setAppliedDiscount: (discount: Discount) => void;  
  total: number;
  // applyDiscount: () => void;  
  resetAfterConfirmedPurchase: () => void; //resets cart and appliedDiscount
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
  appliedDiscount: undefined,
  setAppliedDiscount: () => { },
  total: 0,
  // applyDiscount: () => { },
  resetAfterConfirmedPurchase: () => { },
}

const ShoppingContext = createContext<ShoppingState>(defaultShoppingState);

export const ShoppingProvider = ({ children }: { children: React.ReactNode }) => {
  const [preferredCurrency, setPreferredCurrency] = useState<string>('USD');
  const [preferredLanguage, setPreferredLanguage] = useState<string>('es');
  const [cartItems, setCartItems] = useState<TCartItem[]>([]); 
  const [openedSidebar, setOpenedSidebar] = useState<string>(''); // string controls which type of sidebar should be opened
  const [appliedDiscount, setAppliedDiscount] = useState<Discount | undefined>(undefined);
  const [total, setTotal] = useState<number>(0);
  const translations = useTranslations('Header')

  useEffect(() => {
    const cartItems = localStorage.getItem('cartItems'); //set local storage once per load so that items can be stored across sessions
    if (cartItems) {
      setCartItems(JSON.parse(cartItems));
    }

    const discount = localStorage.getItem('appliedDiscount'); //same thing for whether or not a discount was applied
    if (discount && discount != 'undefined') {  //this needs to modified to add or parse a json discount object
      setAppliedDiscount(JSON.parse(discount));
    }
  }, [])

  useEffect(() => {     //update local storage objects and total whenever cartItems or appliedDiscount changes
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    calculateTotal();
  }, [cartItems, appliedDiscount])

  useEffect(() => { // update local storage appliedDiscount item whenever disountApplied changes
    localStorage.setItem('appliedDiscount', JSON.stringify(appliedDiscount));
  }, [appliedDiscount])

  const calculateTotal = () => {
    let newTotal = cartItems.reduce((acc, item) => acc + item.plan.precio * item.quantity, 0);
    if (appliedDiscount) {
      newTotal *= ((100 - appliedDiscount.discountPercentage) / 100);
    }
    setTotal(newTotal);
  }

  // const applyDiscount = (discount : Discount) => {
  //   //solo se puede usar un descuento por compra por eso appliedDiscount puede ser un boolean
  //   if (appliedDiscount === undefined) { //check only if discount hasn't been set
  //     setAppliedDiscount(discount);
  //   }
  // }

  const resetAfterConfirmedPurchase = () => {
    setCartItems([]);
    setAppliedDiscount(undefined);
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
    appliedDiscount,
    setAppliedDiscount,
    total,
    // applyDiscount,
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
      <div className={`fixed top-0 left-0 w-screen h-screen bg-text bg-opacity-60 transition-all duration-500 ease-in-out
            ${openedSidebar === '' ? '-z-10 opacity-0' : 'z-20 opacity-100'}`}
        onClick={() => {
          setOpenedSidebar('')
        }}></div>
      <Sidebar header={translations('carrito')} setOpenedSidebar={setOpenedSidebar}
        selected={openedSidebar === translations('carrito')}>
        <CartItems />
      </Sidebar>
      <Sidebar header={translations('seleccionaTuLenguaje')} selected={openedSidebar === translations('seleccionaTuLenguaje')}
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