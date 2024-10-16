import React, {  useState } from 'react';
import ButtonDark from '../components/ReusableComponents/ButtonDark';
import PaymentConfirmationEmailForm from './PaymentConfirmationEmailForm';
import { Close } from '@mui/icons-material';

interface Props {
    userFirstName: string,
    userLastName: string,
    orderNumber: number,
    email: string,
    regionName: string,
    data: string,
    duration: string,
    qrcode: string,
    iccid: string,
    close: () => void
}
const EmailSending = (props : Props) => {
    const [formState, setFormState] = useState('Enviar');
    const [formData, setFormData] = useState({
        userFirstName: props.userFirstName,
        userLastName: props.userLastName,
        orderNumber: props.orderNumber,
        email: props.email,
        regionName: props.regionName,
        data: props.data,
        duration: props.duration,
        qrcode: props.qrcode,
        smdpAddress: props.qrcode.split('$')[1],
        activationCodeIos: props.qrcode.split('$')[2],
        activationCodeAndroid: props.qrcode,
        iccid: props.iccid,
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
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-background p-12 rounded-custom">
            <form className='flex flex-col space-y-12' onSubmit={submitForm}>
            <Close onClick={props.close} className='ml-auto cursor-pointer'></Close>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-8'>
                    <input className='border-custom rounded-custom p-8' type='text' value={formData.userFirstName} name='userFirstName' placeholder='Nombre' onChange={handleInputChange} required />
                    <input className='border-custom rounded-custom p-8' type='text' value={formData.userLastName} name='userLastName' placeholder='Apellido' onChange={handleInputChange} required />
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-8 '>
                    <input className='border-custom rounded-custom p-8' type='text' value={formData.orderNumber} name='orderNumber' placeholder='Número de Orden' onChange={handleInputChange} required />
                    <input className='border-custom rounded-custom p-8' type='email' value={formData.email} name='email' placeholder='Correo Electrónico' onChange={handleInputChange} required />
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-8'>
                    <input className='border-custom rounded-custom p-8' type='text' value={formData.regionName} name='regionName' placeholder='Región' onChange={handleInputChange} required />
                    <input className='border-custom rounded-custom p-8' type='text' value={formData.data} name='data' placeholder='Datos' onChange={handleInputChange} required />
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-8'>
                    <input className='border-custom rounded-custom p-8' type='text' value={formData.duration} name='duration' placeholder='Duración (días)' onChange={handleInputChange} required />
                    <input className='border-custom rounded-custom p-8' type='text' value={formData.iccid} name='iccid' placeholder='ICCID' onChange={handleInputChange} required />
                </div>
                <input className='border-custom rounded-custom p-8' type='text' value={formData.activationCodeAndroid} name='activationCodeAndroid' placeholder='Código de Activación Android' onChange={handleInputChange} required />
                <input className='border-custom rounded-custom p-8' type='text' value={formData.smdpAddress} name='smdpAddress' placeholder='Dirección SMDP' onChange={handleInputChange} required />
                <input className='border-custom rounded-custom p-8' type='text' value={formData.activationCodeIos} name='activationCodeIos' placeholder='Código de Activación iOS' onChange={handleInputChange} required />
                <input className='border-custom rounded-custom p-8' type='text' value={formData.qrcode} name='qrcode' placeholder='Código QR' onChange={handleInputChange} required />
                <select className='border-custom rounded-custom p-8 ' name='idioma' onChange={handleInputChange} required>
                    <option value="">Idioma del cliente</option>
                    <option value="es">Español</option>
                    <option value="en">Inglés</option>
                    <option value="br">Portugues</option>
                </select>
                <ButtonDark extraClasses='px-32 py-8' type='submit'>{formState}</ButtonDark>
            </form>
        </div>
    );
};

export default EmailSending;