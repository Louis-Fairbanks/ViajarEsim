'use client'
import React, { useEffect, useState } from 'react'
import {
    useStripe,
    useElements,
    PaymentElement,
} from '@stripe/react-stripe-js';
import ButtonDark from '../components/ReusableComponents/ButtonDark';
import { useShopping } from '../components/ShoppingContext/ShoppingContext';


interface Props {
    amount: number
    nombre: string
    correo: string
    apellido : string
}

const convertToSubcurrency = (amount: number, factor = 100) => {
    return Math.round(amount * factor)
}

const CheckoutPage = ({ amount, nombre, correo, apellido }: Props) => {
    const stripe = useStripe();
    const elements = useElements();
    const [errorMessage, setErrorMessage] = useState<string>();
    const [clientSecret, setClientSecret] = useState("");
    const [loading, setLoading] = useState(false);
    const [planIdsAndQuantities, setPlanIdsAndQuantities] = useState<{ plan_id: number, quantity: number }[]>([]);

    const { cartItems } = useShopping();

    useEffect(() => {
        const fetchClientSecret = async () => {
            fetch('/api/crear-intento-de-pago', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ amount: convertToSubcurrency(amount) })
            })
                .then(res => res.json())
                .then(data => setClientSecret(data.client_secret))
        }
        fetchClientSecret()
        setPlanIdsAndQuantities(cartItems.map(item => ({ plan_id: item.plan.id, quantity: item.quantity })))
    }, [amount])

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);

        if (nombre === '' || correo === '' || apellido === '') {
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

        const { error } = await stripe.confirmPayment({
            elements,
            clientSecret,
            confirmParams: {
                return_url: process.env.PAYMENT_REDIRECT_URL + '/pago-exitoso?nombre=' + nombre + '&apellido=' + apellido + '&correo=' + correo + '&planes=' + planIdsAndQuantities.map(plan => plan.plan_id + ':' + plan.quantity).join(',')
            }
        })
        if (error) {
            //this will only happen when there's an immediate error when confirming the payment. Show error
            setErrorMessage(error.message);
        } else {
            fetch('/api/crear-orden').then(response => response.json()). then(data => console.log(data))
            //The payment UI automatically closes with a success animation, customer is redirected to the return_url
        }
        setLoading(false);
    }

    if (!clientSecret || !stripe || !elements) {
        return <p>Cargando...</p>
    }

    return (
            <form onSubmit={handleSubmit}>
                {clientSecret && <PaymentElement />}
                {errorMessage && <p className='text-heading text-center my-12'>{errorMessage}</p>}
                <ButtonDark type='submit' extraClasses='py-8 w-full mt-12' deactivated={loading}>Pagar ahora ${amount}</ButtonDark>
            </form>
    )
}

export default CheckoutPage
