'use client';
import React, { useState, createContext, useContext } from 'react'

type ShoppingState = {
  preferredCurrency: string;
  setPreferredCurrency: (currency: string) => void;
  preferredLanguage: string;
  setPreferredLanguage: (language: string) => void;
  cartItems: any[];
  setCartItems: (items: any[]) => void;
  savedItems: any[];
  setSavedItems: (items: any[]) => void;
  sidebarOpened: boolean;
  setSidebarOpened: (opened: boolean) => void;
}

const defaultShoppingState: ShoppingState = {
  preferredCurrency: 'USD',
  setPreferredCurrency: () => {},
  preferredLanguage: 'es',
  setPreferredLanguage: () => {},
  cartItems: [],
  setCartItems: () => {},
  savedItems: [],
  setSavedItems: () => {},
  sidebarOpened: false,
  setSidebarOpened: () => {}
}

const ShoppingContext = createContext<ShoppingState>(defaultShoppingState);

const ShoppingProvider = ({ children }: { children: React.ReactNode }) => {
  const [preferredCurrency, setPreferredCurrency] = useState<string>('USD');
  const [preferredLanguage, setPreferredLanguage] = useState<string>('es');
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [savedItems, setSavedItems] = useState<any[]>([]);
  const [sidebarOpened, setSidebarOpened] = useState<boolean>(false);

  const value = {
    preferredCurrency,
    setPreferredCurrency,
    preferredLanguage,
    setPreferredLanguage,
    cartItems,
    setCartItems,
    savedItems,
    setSavedItems,
    sidebarOpened,
    setSidebarOpened
  };

  return (
    <ShoppingContext.Provider value={value}>
      {children}
    </ShoppingContext.Provider>
  )
}

const useShopping = () => {
  const context = useContext(ShoppingContext);
  if (context === undefined) {
    throw new Error('useShopping must be used within a ShoppingProvider');
  }
  return context;
}

export { ShoppingProvider, useShopping };