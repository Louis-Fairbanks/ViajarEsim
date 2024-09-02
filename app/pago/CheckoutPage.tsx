'use client'
import React, { useEffect, useState } from 'react'
import {
    useStripe,
    useElements,
    PaymentElement,
    Elements,
} from '@stripe/react-stripe-js';


interface Props {
    amount: number
}

const convertToSubcurrency = (amount: number, factor = 100) => {
    return Math.round(amount * factor)
}

const CheckoutPage = ({ amount }: Props) => {
    const stripe = useStripe();
    const elements = useElements();
    const [errorMessage, setErrorMessage] = useState<string>();
    const [clientSecret, setClientSecret] = useState("");
    const [loading, setLoading] = useState(false);

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
    }, [amount])

    const handleSubmit = async (event : React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);

        if (!stripe || !elements){
            return;
        }

        const { error: submitError} = await elements.submit();
        if (submitError){
            setErrorMessage(submitError.message);
            setLoading(false);
            return;
        }

        const { error } = await stripe.confirmPayment({
            elements,
            clientSecret,
            confirmParams: {
                return_url :'http://www.localhost:3000/destinos'
            }
        })

        if(error){
            //this will only happen when there's an immediate error when confirming the payment. Show error
            setErrorMessage(error.message);
        } else{
            //The payment UI automatically closes with a success animation, customer is redirected to the return_url
        }
        setLoading(false);
    }

    if (!clientSecret || !stripe || !elements){
        return <p>Cargando...</p>
    }

return (
    <form onSubmit={handleSubmit}>
        {clientSecret && <PaymentElement/>}
        {errorMessage && <p>{errorMessage}</p>}
        <button type='submit' disabled={loading}>Pagar</button>
    </form>
)
}

export default CheckoutPage
