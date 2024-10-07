import React, { useState } from 'react';
import ButtonDark from '../components/ReusableComponents/ButtonDark';
import PaymentConfirmationEmailForm from './PaymentConfirmationEmailForm';

const EmailSending = () => {
    const [formState, setFormState] = useState('Enviar');
    const [formData, setFormData] = useState({
        userFirstName: '',
        userLastName: '',
        orderNumber: '',
        email: '',
        regionName: '',
        data: '',
        duration: '',
        qrcode: '',
        smdpAddress: '',
        activationCodeIos: '',
        activationCodeAndroid: '',
        iccid: '',
        idioma: ''
    });

    const handleInputChange = (e : any) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const submitForm = async (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFormState('Enviando...');
        try {
            const response = await fetch('/api/mandar-email-orden', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...formData }),
            });
            if (response.ok) {
                setFormState('Enviado!');
            } else {
                setFormState('Error al enviar');
            }
        } catch (error) {
            console.error('Error:', error);
            setFormState('Error al enviar');
        }
    };

    return (
        <div className="w-3/4 mx-auto">
            <h1 className='text-subheading leading-body text-center w-full mb-6'>Para usar cuando las eSIMs fueron compradas y creadas correctamente, pero no llegaron al cliente:</h1>
            <form className='flex flex-col' onSubmit={submitForm}>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8'>
                    <input className='border-custom rounded-custom p-8' type='text' name='userFirstName' placeholder='Nombre' onChange={handleInputChange} required />
                    <input className='border-custom rounded-custom p-8' type='text' name='userLastName' placeholder='Apellido' onChange={handleInputChange} required />
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8'>
                    <input className='border-custom rounded-custom p-8' type='text' name='orderNumber' placeholder='Número de Orden' onChange={handleInputChange} required />
                    <input className='border-custom rounded-custom p-8' type='email' name='email' placeholder='Correo Electrónico' onChange={handleInputChange} required />
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-8'>
                    <input className='border-custom rounded-custom p-8' type='text' name='regionName' placeholder='Región' onChange={handleInputChange} required />
                    <input className='border-custom rounded-custom p-8' type='text' name='data' placeholder='Datos' onChange={handleInputChange} required />
                </div>
                <div className='w-1/2 ml-auto text-text-faded text-small'>O "Datos ilimitados" o "Número de gigas + GB", ejemplo: 2GB</div>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-8'>
                    <input className='border-custom rounded-custom p-8' type='text' name='duration' placeholder='Duración (días)' onChange={handleInputChange} required />
                    <input className='border-custom rounded-custom p-8' type='text' name='iccid' placeholder='ICCID' onChange={handleInputChange} required />
                </div>
                <div className='w-1/2 text-text-faded text-small'>Acá se pone solo el número de días del plan</div>
                <input className='border-custom rounded-custom p-8' type='text' name='activationCodeAndroid' placeholder='Código de Activación Android' onChange={handleInputChange} required />
                <div className='w-full text-text-faded text-small'>Se encuentra en el panel del proveedor, tiene el formato: LPA:1$ + dirección smdp + $ + código de activación</div>
                <div className='w-full text-text-faded text-small'>Ejemplo: LPA:1$ecprsp.eastcompeace.com$262B377231A540C38EF80040DAFA575B</div>
                <input className='border-custom rounded-custom p-8' type='text' name='smdpAddress' placeholder='Dirección SMDP' onChange={handleInputChange} required />
                <div className='w-full text-text-faded text-small'>El servidor donde se creó la eSIM, es parte del código de activación de Android, ejemplo: ecprsp.eastcompeace.com</div>
                <input className='border-custom rounded-custom p-8' type='text' name='activationCodeIos' placeholder='Código de Activación iOS' onChange={handleInputChange} required />
                <div className='w-full text-text-faded text-small'>Última parte de código de activación de Android, ejemplo: 262B377231A540C38EF80040DAFA575B</div>
                <input className='border-custom rounded-custom p-8' type='text' name='qrcode' placeholder='Código QR' onChange={handleInputChange} required />
                <div className='w-1/2 text-text-faded text-small'>IGUAL a código de activación de Android</div>
                <select className='border-custom rounded-custom p-8 mb-8' name='idioma' onChange={handleInputChange} required>
                    <option value="">Idioma del cliente</option>
                    <option value="es">Español</option>
                    <option value="en">Inglés</option>
                    <option value="br">Portugues</option>
                </select>
                <ButtonDark extraClasses='px-32 py-8' type='submit'>{formState}</ButtonDark>
            </form> 
            <PaymentConfirmationEmailForm/>
        </div>
    );
};

export default EmailSending;