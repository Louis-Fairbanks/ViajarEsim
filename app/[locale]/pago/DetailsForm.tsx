'use client'
import React, { useEffect, useState } from 'react'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { useShopping } from '../components/ShoppingContext/ShoppingContext'
import CheckoutPage from './CheckoutPage'
import { Link } from '@/routing'
import ButtonLight from '../components/ReusableComponents/ButtonLight'
import { PayPalButtons } from '@paypal/react-paypal-js';
import { v4 as uuidv4 } from 'uuid';
import { TCartItem } from '../components/Types/TCartItem'
import { useTranslations } from 'next-intl'
import PhoneInput from './PhoneInput'
import { countryCodes, CountryCode } from './CountryCodes'
import { useRouter } from '@/routing'
import ButtonDark from '../components/ReusableComponents/ButtonDark'
import CryptoGateway from './CryptoGateway'


if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
    throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY)

const DetailsForm = () => {

    const translations = useTranslations('Pago')
    const router = useRouter();

    const [nombre, setNombre] = useState('');
    const [correo, setCorreo] = useState('');
    const [apellido, setApellido] = useState('');
    const [celular, setCelular] = useState('');
    const [countryCode, setCountryCode] = useState<CountryCode>(countryCodes[0]);
    const [tycAgreed, setTycAgreed] = useState<boolean>(false);
    const [payPalError, setPayPalError] = useState<string>('')
    const [formValidated, setFormValidated] = useState<boolean>(false);
    const [planIdsAndQuantities, setPlanIdsAndQuantities] = useState<{ plan_id: number, quantity: number }[]>([]);
    const [payPalTotal, setPayPalTotal] = useState<number>(0);
    const [cryptoOpened, setCryptoOpened] = useState<boolean>(false)

    useEffect(() => {
        setNombre(localStorage.getItem('nombre') || '');
        setCorreo(localStorage.getItem('correo') || '');
        setApellido(localStorage.getItem('apellido') || '');
        const storedCelular = localStorage.getItem('celular') || '';
        const storedCountryCode = localStorage.getItem('countryCode') || countryCodes[0].code;
        if (storedCelular) {
            setCelular(storedCelular);
        }
        setCountryCode(countryCodes.find(c => c.code === storedCountryCode) || countryCodes[0]);
    }, []);

    useEffect(() => {
        if (nombre) localStorage.setItem('nombre', nombre);
        if (correo) localStorage.setItem('correo', correo);
        if (apellido) localStorage.setItem('apellido', apellido);
        if (celular) localStorage.setItem('celular', celular);
        localStorage.setItem('countryCode', countryCode.code);
    }, [nombre, correo, apellido, celular, countryCode]);
    const referenceId = uuidv4();

    useEffect(() => {
        if (
            nombre !== '' &&
            correo !== '' &&
            correo.includes('@') &&
            apellido !== '' &&
            tycAgreed &&
            celular !== '' &&
            celular.length >= 5  // Minimum length for a valid phone number
        ) {
            setFormValidated(true);
        } else {
            setFormValidated(false);
        }
    }, [nombre, correo, apellido, tycAgreed, celular]);

    const { total, cartItems, appliedDiscount } = useShopping();

    useEffect(() => {
        setPayPalTotal(total)
    }, [total, appliedDiscount, cartItems])

    useEffect(() => {
        setPlanIdsAndQuantities(cartItems.map(item => ({ plan_id: item.plan.id, quantity: item.quantity })))
    }, [total])

    const convertToSubcurrency = (amount: number, factor = 100) => {
        return Math.round(amount * factor)
    }

    async function createOrder() {
        try {
            console.log(payPalTotal)
            const purchaseUnit = {
                reference_id: referenceId,
                amount: {
                    currency_code: 'USD',
                    value: payPalTotal.toString()
                }
            };
            const response = await fetch('/api/crear-compra-paypal', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ purchase_units: [purchaseUnit] })
            });
            if (!response.ok) {
                throw new Error('Failed to create PayPal order');
            }
            const data = await response.json();
            return data.orderId;
        } catch (error) {
            console.error('Error creating PayPal order:', error);
            setPayPalError(translations('payPalFailOrder'));
            throw error;
        }
    }

    async function onApprove(data: { orderID: string }) {
        try {
            console.log('PayPal onApprove data:', data);
            const response = await fetch('/api/verificar-compra-paypal', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ orderId: data.orderID, referenceId: referenceId })
            });
            if (!response.ok) {
                const errorText = await response.text();
                console.error('Error response:', response.status, errorText);
                throw new Error(`Failed to complete PayPal order: ${response.status} ${errorText}`);
            }
            const responseData = await response.json();
            console.log('Verify PayPal purchase response:', responseData);

            // Safely parse localStorage items
            let cartItems = [];
            let appliedDiscount = null;

            try {
                cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
            } catch (error) {
                console.error('Error parsing cartItems:', error);
                cartItems = [];
            }

            try {
                appliedDiscount = JSON.parse(localStorage.getItem('appliedDiscount') || 'null');
            } catch (error) {
                console.error('Error parsing appliedDiscount:', error);
                appliedDiscount = null;
            }

            const storedCountryCode = localStorage.getItem('countryCode') || countryCode.code;
            const storedCelular = localStorage.getItem('celular') || celular;

            const params = new URLSearchParams({
                nombre: localStorage.getItem('nombre') || '',
                apellido: localStorage.getItem('apellido') || '',
                correo: localStorage.getItem('correo') || '',
                celular: `${storedCountryCode} ${storedCelular}`,
                descuentoAplicado: appliedDiscount
                    ? `${appliedDiscount.code}:${appliedDiscount.discountPercentage}`
                    : 'undefined:undefined',
                planes: cartItems.map((item: TCartItem) => `${item.plan.id}:${item.quantity}`).join(','),
                paypal_order_id: data.orderID
            });

            console.log(params.get('nombre'), params.get('apellido'), params.get('correo'), params.get('celular'));

            // Construct the URL as a single string
            const url = `/pago-exitoso?${params.toString()}`;

            // Use Next.js router to navigate
            router.push(url);
        } catch (error) {
            console.error('Error completing PayPal order:', error);
            setPayPalError(translations('payPalFailCompleteOrder'));
        }
    }
    return (
        <>
            
            <div className='flex flex-col space-y-16 pt-16 border-t-custom'>
            <div className='flex flex-col sm:flex-row space-y-16 sm:space-y-0 sm:space-x-16 w-full'>
                    <input type='text' className='rounded-custom border-custom p-8 w-full sm:w-1/2' placeholder={`${translations('nombre')} *`}
                        onChange={(e) => setNombre(e.target.value)} value={nombre} />
                    <input type='text' className='rounded-custom border-custom p-8 w-full sm:w-1/2' placeholder={`${translations('apellido')} *`}
                        onChange={(e) => setApellido(e.target.value)} value={apellido} />
                </div>
                <div className='flex flex-col sm:flex-row space-y-16 sm:space-y-0 sm:space-x-16 w-full'>
                    <input type='email' className='rounded-custom border-custom p-8 w-full sm:w-1/2' placeholder={`${translations('correo')} *`}
                        onChange={(e) => setCorreo(e.target.value)} value={correo} />
                    <PhoneInput 
                        celular={celular} 
                        setCelular={setCelular} 
                        countryCode={countryCode}
                        setCountryCode={setCountryCode}
                        placeholder={`${translations('telefono')} *`}
                    />
                </div>
                <label className='flex items-center space-x-8'>
                        <input type='checkbox' className='rounded-full border-custom' onChange={(e) => setTycAgreed(e.target.checked)} />
                        <span>{translations('tyc')} <Link href='/terminos-y-condiciones'><span className='font-medium text-primary underline'>
                            {translations('terminosCondiciones')}</span></Link></span>
                    </label>
                {total === 0 ?
                    <div>
                        <p>{translations('carritoVacio')}</p>
                        <Link href='/destinos'>
                            <ButtonLight extraClasses='w-full py-8 px-32 mt-8'>
                                {translations('seguirComprando')}
                            </ButtonLight>
                        </Link>
                    </div> :
                    total && <><Elements stripe={stripePromise} options={{
                        mode: "payment",
                        amount: convertToSubcurrency(total),
                        currency: "usd"
                    }}>
                        <CheckoutPage countryCode={countryCode.code} tycAgreed={tycAgreed} amount={total} correo={correo} nombre={nombre} apellido={apellido} celular={celular} />
                    </Elements>
                        {!formValidated && <p className='text-text-faded text-center my-12'>{translations('paypalLlenar')}</p>}
                        <PayPalButtons disabled={!formValidated}
                            key={payPalTotal}
                            style={{ layout: 'horizontal', tagline: false }}
                            className='rounded-custom'
                            createOrder={createOrder}
                            onApprove={(data) => onApprove(data)}
                            onError={(err) => {
                                console.error('PayPal error:', err);
                                setPayPalError(translations('payPalFailCompletePayment'));
                            }}
                        />
                        {payPalError != '' && <p className='text-alert text-center my-12'>{payPalError}</p>}
                        {!formValidated && <p className='text-text-faded text-center my-12'>{translations('cryptomusLlenar')}</p>}
                        <ButtonDark deactivated={!formValidated} onClick={() => {if(formValidated){setCryptoOpened(true)}}}
                            extraClasses={`px-32 py-12 w-full ${!formValidated ? 
                        '' : 'bg-black active:bg-accent hover:bg-black'}`}>{translations('pagarConCriptomonedas')} ${total.toLocaleString('es-ES', {minimumFractionDigits : 2})}</ButtonDark>
                        {cryptoOpened && <CryptoGateway total={total} formValidated={formValidated} nombre={nombre} apellido={apellido} correo={correo}
                        celular={celular} countryCode={countryCode}/>}
                    </>
                }
            </div>
        </>
    )
}

export default DetailsForm
