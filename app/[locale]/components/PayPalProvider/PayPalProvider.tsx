'use client'

import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useShopping } from '../ShoppingContext/ShoppingContext';
import { useEffect, useState } from 'react';

type PayPalProviderProps = {
  children: React.ReactNode;
  options: {
    clientId: string;
    currency?: string;
    intent: 'capture';
  };
};

const PayPalProvider = ({ children, options }: PayPalProviderProps) => {
  const { preferredCurrency } = useShopping();
  const [scriptKey, setScriptKey] = useState(0);
  const [paypalOptions, setPaypalOptions] = useState(options);

  useEffect(() => {
    const supportedCurrencies = ['USD', 'EUR', 'BRL', 'MXN'];
    const newCurrency = supportedCurrencies.includes(preferredCurrency.name) 
      ? preferredCurrency.name 
      : 'USD';
    
    setPaypalOptions(prev => ({
      ...prev,
      currency: newCurrency
    }));
    // Force PayPal script to reload with new currency
    setScriptKey(prev => prev + 1);
  }, [preferredCurrency]);

  return (
    <PayPalScriptProvider options={paypalOptions} key={scriptKey}>
      {children}
    </PayPalScriptProvider>
  );
};

export default PayPalProvider;