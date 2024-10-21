'use client'
import React, { useEffect, useState } from 'react'
import { useShopping } from '../components/ShoppingContext/ShoppingContext'
import { TCartItem } from '../components/Types/TCartItem'
import { CountryCode } from './CountryCodes'
import CryptoInput from './CryptoInput'
import Image from 'next/image'
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useRouter } from '@/routing'

interface Props {
    total: number,
    formValidated: boolean,
    nombre: string,
    apellido: string,
    correo: string,
    countryCode: CountryCode,
    celular: string
}

const CryptoGateway = ({ total, formValidated, nombre, apellido, correo, countryCode, celular }: Props) => {
    const { cartItems, appliedDiscount } = useShopping();
    const [selectedCrypto, setSelectedCrypto] = useState<{ name: string, network: string } | null>(null)
    const [paymentData, setPaymentData] = useState<any>();
    const [timeLeft, setTimeLeft] = useState<string>('');
    const [copyMessage, setCopyMessage] = useState<string>('');
    const [paymentStatus, setPaymentStatus] = useState<string>('pending');

    const router = useRouter();

    useEffect(() => {
        const createCryptomusOrder = async () => {
            if (total === 0 || !formValidated || !selectedCrypto) {
                return;
            }
            const cartItemsString = cartItems.map((item: TCartItem) => `${item.plan.id}:${item.quantity}`).join(',');
            const discountString = appliedDiscount
                ? `${appliedDiscount.code}:${appliedDiscount.discountPercentage}`
                : 'undefined:undefined';

            const response = await fetch('/api/cryptomus/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: total,
                    currency: 'USD',
                    nombre,
                    apellido,
                    correo,
                    celular: `${countryCode.code} ${celular}`,
                    descuentoAplicado: discountString,
                    planes: cartItemsString,
                    network: selectedCrypto?.network,
                    to_currency: selectedCrypto?.name
                })
            });
            if (!response.ok) {
                console.log('Failure creating Cryptomus order');
            } else {
                const data = await response.json();
                setPaymentData(data.data.result)
            }
        }
        setPaymentData(null);
        createCryptomusOrder();
    }, [total, formValidated, cartItems, appliedDiscount, selectedCrypto]);

    useEffect(() => {
        if (paymentData && paymentData.order_id) {
            const checkPaymentStatus = async () => {
                try {
                    const response = await fetch('/api/cryptomus/check-status', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ order_id: paymentData.order_id }),
                    });
                    const data = await response.json();
                    if (data.paymentInfo.result.status === 'paid') {
                        const params = new URLSearchParams({
                            nombre: localStorage.getItem('nombre') || '',
                            apellido: localStorage.getItem('apellido') || '',
                            correo: localStorage.getItem('correo') || '',
                            celular: `${countryCode.code} ${celular}`,
                            descuentoAplicado: appliedDiscount
                                ? `${appliedDiscount.code}:${appliedDiscount.discountPercentage}`
                                : 'undefined:undefined',
                            planes: cartItems.map((item: TCartItem) => `${item.plan.id}:${item.quantity}`).join(','),
                            payment_intent: paymentData.order_id
                        });
            
                        // Construct the URL as a single string
                        const url = `/pago-exitoso?${params.toString()}`;
            
                        // Use Next.js router to navigate
                        router.push(url);
                    } else if (data.paymentInfo.result.status === 'cancel') {
                        // Handle cancelled payment
                    }
                } catch (error) {
                    console.error('Error checking payment status:', error);
                }
            };

            const statusInterval = setInterval(checkPaymentStatus, 5000); // Check every 5 seconds

            return () => clearInterval(statusInterval);
        }
    }, [paymentData, router]);

    useEffect(() => {
        if (paymentData && paymentData.expired_at) {
            const updateCountdown = () => {
                const now = Math.floor(Date.now() / 1000); // Current time in seconds
                const expireTime = parseInt(paymentData.expired_at); // Convert to number if it's a string
                const distance = expireTime - now;

                if (distance <= 0) {
                    setTimeLeft('EXPIRED');
                } else {
                    const minutes = Math.floor((distance % 3600) / 60);
                    const seconds = distance % 60;
                    setTimeLeft(`${minutes}m ${seconds}s`);
                }
            };

            updateCountdown(); // Call immediately to avoid delay
            const interval = setInterval(updateCountdown, 1000);

            return () => clearInterval(interval);
        }
    }, [paymentData]);

    const copyToClipboard = async () => {
        if (paymentData && paymentData.address) {
            try {
                await navigator.clipboard.writeText(paymentData.address);
                setCopyMessage('Address copied!');
                setTimeout(() => setCopyMessage(''), 3000); // Message fades after 3 seconds
            } catch (err) {
                console.error('Failed to copy: ', err);
                setCopyMessage('Failed to copy address');
            }
        }
    };

    return (
        <div className="w-full mx-auto border-custom rounded-custom p-24">
            <h2 className='font-semibold text-subheading leading-body text-start mb-12'>Pagar con criptomonedas</h2>
            <CryptoInput selectedCrypto={selectedCrypto} setSelectedCrypto={setSelectedCrypto}></CryptoInput>
            {!selectedCrypto && <div className="text-center p-4">Por favor, selecciona una moneda y red</div>}
            {selectedCrypto && !paymentData && <div className="text-center p-4">Cargando información de pago...</div>}
            {paymentData &&  <div className="flex flex-col space-y-12 pt-16">
                <div className='flex flex-col space-y-12'>
                    <p className="font-medium text-heading">A pagar: <span className='text-primary font-bold'>{paymentData.payer_amount} {selectedCrypto?.name}</span></p>
                    <p className="text-text-faded">${total.toLocaleString('es-ES', { minimumFractionDigits: 2 })} USD</p>
                </div>
                <div className='flex space-x-12 border-t-custom pt-12 items-center justify-center'>
                    <Image
                        src={paymentData.address_qr_code}
                        alt='Payment QR Code'
                        height={200}
                        width={200}
                    />
                    <div className='flex flex-col space-y-12'>
                        <h4>Paga usando el código qr o esta dirección:</h4>
                        <div className="relative">
                            <p className="border-custom rounded-custom bg-accent p-8 break-all">
                                {paymentData.address} 
                                <ContentCopyIcon className='cursor-pointer ml-12' onClick={copyToClipboard}></ContentCopyIcon>
                            </p>
                            {copyMessage && (
                                <div className="fixed bottom-12 left-1/2 p-12 -translate-x-1/2 bg-success text-white rounded-custom transition-opacity duration-300">
                                    {copyMessage}
                                </div>
                            )}
                        </div>
                        <div>
                            <p className="font-medium">Tiempo restante:</p>
                            <p className={`text-subheading ${timeLeft === 'EXPIRED' ? 'text-alert' : 'text-success'}`}>{timeLeft}</p>
                        </div>
                    </div>
                </div>
                <p className="text-center font-semibold">
                    Quedate en esta página mientras confirmamos la compra. Cuando esté validada, serás redireccionado automaticamente.
                </p>
            </div>}
        </div>
    )
}

export default CryptoGateway