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
import { countryToCurrencyMap } from './CurrencyCodeMappings';
import { Currency } from '../Types/TCurrency';

interface ShoppingState {
  preferredCurrency: Currency;
  setPreferredCurrency: (currency: Currency) => void;
  cartItems: TCartItem[];
  setCartItems: (items: TCartItem[]) => void;
  openedSidebar: string;
  setOpenedSidebar: (opened: string) => void;
  appliedDiscount: Discount | undefined;           //tracks whether or not a discount has been applied irrespective of the discount %
  setAppliedDiscount: (discount: Discount) => void;
  total: number;
  resetAfterConfirmedPurchase: () => void; //resets cart and appliedDiscount
  switchCurrency: (newCurrency : string) => void
}
const DEFAULT_CURRENCY: Currency = {
  name: 'USD',
  tasa: 1,
  locale_format: 'en-US'
};

const defaultShoppingState: ShoppingState = {
  preferredCurrency: DEFAULT_CURRENCY,
  setPreferredCurrency: () => { },
  cartItems: [],
  setCartItems: () => { },
  openedSidebar: '',
  setOpenedSidebar: () => { },
  appliedDiscount: undefined,
  setAppliedDiscount: () => { },
  total: 0,
  resetAfterConfirmedPurchase: () => { },
  switchCurrency: () => { }
}

const ShoppingContext = createContext<ShoppingState>(defaultShoppingState);



export const ShoppingProvider = ({ children }: { children: React.ReactNode }) => {
  const [preferredCurrency, setPreferredCurrency] = useState<Currency>(DEFAULT_CURRENCY);
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

    const storedCurrency = localStorage.getItem('preferredCurrency');
    if (storedCurrency && storedCurrency !== '') {
      setPreferredCurrency(JSON.parse(storedCurrency));
    }
  }, [])

  useEffect(() => {
    const getUserCurrency = async () => {
      // Check stored preference first
      const storedCurrency = localStorage.getItem('preferredCurrency');
      if (storedCurrency && storedCurrency !== 'null' && storedCurrency !== '') {
        return;
      }

      try {
        const response = await fetch('https://get.geojs.io/v1/ip/country.json');
        if (!response.ok) {
          throw new Error('Failed to fetch country data');
        }
        const data = await response.json();
        const userCountryIsoCode = data.country;
        
        const userCurrencyName = countryToCurrencyMap.find(pair => 
          pair.country === userCountryIsoCode
        )?.currency || 'USD';
        
        // Fetch exchange rate after getting currency
        const userCurrency =  await fetchExchangeRate(userCurrencyName);
        setPreferredCurrency(userCurrency)
        localStorage.setItem('preferredCurrency', JSON.stringify(userCurrency))
      } catch (error) {
        console.error('Error setting user currency:', error);
        localStorage.setItem('preferredCurrency', '');
        setPreferredCurrency(DEFAULT_CURRENCY);
      }
    };

    getUserCurrency();
  }, []);


  useEffect(() => {     //update local storage objects and total whenever cartItems or appliedDiscount changes
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    calculateTotal();
  }, [cartItems, appliedDiscount])

  useEffect(() => { // update local storage appliedDiscount item whenever disountApplied changes
    localStorage.setItem('appliedDiscount', JSON.stringify(appliedDiscount));
  }, [appliedDiscount])

  const fetchExchangeRate = async (currency: string): Promise<Currency> => {
    try {
      const response = await fetch(`/api/conseguir-tasa-cambio/${currency}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const { data } = await response.json();
      
      if (!data?.[0]?.tasa || !data?.[0]?.locale_format) {
        console.error('Invalid exchange rate data format:', data);
        return DEFAULT_CURRENCY;
      }
  
      return {
        name: currency,
        tasa: data[0].tasa,
        locale_format: data[0].locale_format
      };
    } catch (error) {
      console.error('Error fetching exchange rate:', error);
      return DEFAULT_CURRENCY;
    }
  };

  const switchCurrency = async (newCurrency : string) => {
    const userCurrency =  await fetchExchangeRate(newCurrency);
      setPreferredCurrency(userCurrency)
      localStorage.setItem('preferredCurrency', JSON.stringify(userCurrency))
  }

  const calculateTotal = () => {
    let newTotal = cartItems.reduce((acc, item) => acc + item.plan.precio * item.quantity, 0);
    if (appliedDiscount) {
      newTotal *= ((100 - appliedDiscount.discountPercentage) / 100);
    }
    setTotal(newTotal);
  }

  const resetAfterConfirmedPurchase = () => {
    setCartItems([]);
    setAppliedDiscount(undefined);
    setTotal(0);
  }

  const value = {
    preferredCurrency,
    setPreferredCurrency,
    cartItems,
    setCartItems,
    openedSidebar,
    setOpenedSidebar,
    appliedDiscount,
    setAppliedDiscount,
    total,
    resetAfterConfirmedPurchase,
    switchCurrency
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
        <MobileMenu />
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