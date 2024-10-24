'use client'
import React, { useEffect, useState } from 'react'
import {
    useStripe,
    useElements,
    PaymentElement,
} from '@stripe/react-stripe-js';
import ButtonDark from '../components/ReusableComponents/ButtonDark';
import { useShopping } from '../components/ShoppingContext/ShoppingContext';
import { useTranslations } from 'next-intl';
import { getUserIpAddress } from '../components/MetaFunctions/GetUserIpAddress';
import { CURRENCY_CONFIG } from './PaymentConfig';

interface Props {
    amount: number
    nombre: string
    correo: string
    apellido: string
    celular: string
    tycAgreed: boolean
    countryCode: string
}


const CheckoutPage = ({ amount, nombre, correo, apellido, tycAgreed, celular, countryCode }: Props) => {

    const convertToSubcurrency = (amount: number, factor : number) => {
        return Math.round(amount * factor * preferredCurrency.tasa)
    }

    const translations = useTranslations('Pago')
    const stripe = useStripe();
    const elements = useElements();
    const [errorMessage, setErrorMessage] = useState<string>();
    const [clientSecret, setClientSecret] = useState("");
    const [loading, setLoading] = useState(false);
    const [planIdsAndQuantities, setPlanIdsAndQuantities] = useState<{ plan_id: number, quantity: number }[]>([]);
    const [formValidated, setFormValidated] = useState<boolean>(false);

    // Update latestFormData whenever the props change
    const { cartItems, appliedDiscount, preferredCurrency } = useShopping();


    useEffect(() => {
        if (nombre !== '' && correo !== '' && correo.includes('@') && apellido !== '' && tycAgreed && celular !== '') {
            setFormValidated(true);
        }
        else {
            setFormValidated(false);
        }
    }, [nombre, correo, apellido, tycAgreed, celular])


    useEffect(() => {
        const fetchClientSecret = async () => {
            try {
                const ipAddress = await getUserIpAddress();

                const response = await fetch('/api/crear-intento-de-pago', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        amount: convertToSubcurrency(amount, CURRENCY_CONFIG[preferredCurrency.name.toLowerCase()].subUnits),
                        currency: CURRENCY_CONFIG[preferredCurrency.name.toLowerCase()].code,
                        email: correo,
                        phone: `${countryCode} ${celular}`,
                        name: nombre,
                        clientIpAddress: ipAddress // This can be null if fetch fails
                    })
                });
                if (!response.ok) {
                    throw new Error('Failed to create payment intent');
                }
                const data = await response.json();
                setClientSecret(data.client_secret);
            } catch (error) {
                console.error('Error creating payment intent:', error);
                // Handle error (e.g., show error message to user)
            }
        };
        fetchClientSecret();
        setPlanIdsAndQuantities(cartItems.map(item => ({ plan_id: item.plan.id, quantity: item.quantity })));
    }, [amount, correo, celular, cartItems]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);

        if (!formValidated) {
            setErrorMessage('Por favor llena todos los campos');
            setLoading(false);
            return;
        }

        if (!stripe || !elements) {
            return;
        }

        const { error: submitError } = await elements.submit();
        if (submitError) {
            setErrorMessage(submitError.message);
            setLoading(false);
            return;
        }
        let redirectUrl: string = '';
        if (process.env.NEXT_PUBLIC_PAYMENT_REDIRECT_URL === undefined) {
            console.log("PAYMENT_REDIRECT_URL is not defined");
        } else {
            const params = new URLSearchParams({
                nombre: encodeURIComponent(nombre),
                apellido: encodeURIComponent(apellido),
                correo: encodeURIComponent(correo),
                celular: encodeURIComponent(`${countryCode} ${celular}`),
                descuentoAplicado: encodeURIComponent(`${appliedDiscount?.code}:${appliedDiscount?.discountPercentage}`),
                planes: encodeURIComponent(planIdsAndQuantities.map(plan => `${plan.plan_id}:${plan.quantity}`).join(','))
            });

            redirectUrl = `${process.env.NEXT_PUBLIC_PAYMENT_REDIRECT_URL}/pago-exitoso?${params.toString()}`;
        }
        const { error } = await stripe.confirmPayment({
            elements,
            clientSecret,
            confirmParams: {
                return_url: redirectUrl
            }
        })
        if (error) {
            //this will only happen when there's an immediate error when confirming the payment. Show error
            setErrorMessage(error.message);
        }
        setLoading(false);
    }


    if (!clientSecret || !stripe || !elements) {
        return <p>{translations('cargando')}</p>
    }

    return (
        <form onSubmit={handleSubmit}>
            {clientSecret && <PaymentElement />}
            {errorMessage && <p className='text-heading text-center my-12'>{errorMessage}</p>}
            <ButtonDark type='submit' extraClasses='py-8 w-full mt-12' deactivated={loading}>{translations('pagar')} {new Intl.NumberFormat(preferredCurrency.locale_format, {
                        style: 'currency',
                        currency: preferredCurrency.name,
                        minimumFractionDigits: 2
                    }).format(amount * preferredCurrency.tasa)}</ButtonDark>
            <div className='flex space-x-12 items-center'>
                <div className='bg-accent h-1 w-full'></div>
                <p className='text-small flex-grow text-text-faded text-center my-24 whitespace-nowrap'>{translations('oTambienPuedes')}</p>
                <div className='bg-accent h-1 w-full'></div>
            </div>
        </form>
    )
}

export default CheckoutPage