import React, { useState } from 'react';
import ButtonDark from '../components/ReusableComponents/ButtonDark';
import ButtonLight from '../components/ReusableComponents/ButtonLight';

const PaymentConfirmationEmailForm = () => {
    const [formState, setFormState] = useState('Enviar');
    const [formData, setFormData] = useState({
        email: '',
        orderNumber: '',
        firstName: '',
        lastName: '',
        total: '',
        paymentMethod: '',
        datePaid: '',
        appliedDiscount: '',
        discountName: '',
        purchasedPlans: [{
            regionName: '',
            duration: '',
            salePrice: '',
            data: '',
            iccid: ''
        }],
        idioma: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handlePlanInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const { name, value } = e.target;
        const updatedPlans = [...formData.purchasedPlans];
        updatedPlans[index] = { ...updatedPlans[index], [name]: value };
        setFormData(prevState => ({
            ...prevState,
            purchasedPlans: updatedPlans
        }));
    };

    const addPlan = () => {
        setFormData(prevState => ({
            ...prevState,
            purchasedPlans: [...prevState.purchasedPlans, { regionName: '', duration: '', salePrice: '', data: '', iccid: '' }]
        }));
    };

    const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFormState('Enviando...');
        try {
            const response = await fetch('/api/mandar-email-confirmacion-compra', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
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
        <div className="w-full mx-auto mt-24">
            <h1 className='text-subheading leading-body text-center w-full mb-6'>Enviar email de confirmación de pago:</h1>
            <form className='flex flex-col' onSubmit={submitForm}>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8'>
                    <input className='border-custom rounded-custom p-8' type='text' name='firstName' placeholder='Nombre' onChange={handleInputChange} required />
                    <input className='border-custom rounded-custom p-8' type='text' name='lastName' placeholder='Apellido' onChange={handleInputChange} required />
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8'>
                    <input className='border-custom rounded-custom p-8' type='text' name='orderNumber' placeholder='Número de Orden' onChange={handleInputChange} required />
                    <input className='border-custom rounded-custom p-8' type='email' name='email' placeholder='Correo Electrónico' onChange={handleInputChange} required />
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8'>
                    <input className='border-custom rounded-custom p-8' type='text' name='total' placeholder='Total' onChange={handleInputChange} required />
                    <select className='border-custom rounded-custom p-8 mb-8' name='paymentMethod' onChange={handleInputChange} required>
                    <option value="">Método de pago</option>
                    <option value="Tarjeta de Crédito/Débito">Tarjeta de Crédito/Débito</option>
                    <option value="PayPal">PayPal</option>
                </select>
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8'>
                    <input className='border-custom rounded-custom p-8' type='text' name='datePaid' placeholder='Fecha de Pago (DD/MM/AAAA)' onChange={handleInputChange} required />
                    <input className='border-custom rounded-custom p-8' type='text' name='appliedDiscount' placeholder='Descuento Aplicado' onChange={handleInputChange} required />
                </div>
                <div className='w-1/2 ml-auto text-text-faded text-small'>El monto que fue restado por el descuento</div>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8'>
                    <input className='border-custom rounded-custom p-8' type='text' name='discountName' placeholder='Nombre Descuento' onChange={handleInputChange} required />
                </div>
                {formData.purchasedPlans.map((plan, index) => (
                    <div key={index} className='border-2 border-gray-300 p-4 mb-4 rounded-lg'>
                        <h3 className='text-lg font-semibold mb-2'>Plan {index + 1}</h3>
                        <div className='grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8'>
                            <input className='border-custom rounded-custom p-8' type='text' name='regionName' placeholder='Región' onChange={(e) => handlePlanInputChange(e, index)} required />
                            <input className='border-custom rounded-custom p-8' type='text' name='duration' placeholder='Duración' onChange={(e) => handlePlanInputChange(e, index)} required />
                        </div>
                        <div className='grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8'>
                            <input className='border-custom rounded-custom p-8' type='text' name='salePrice' placeholder='Precio de Venta' onChange={(e) => handlePlanInputChange(e, index)} required />
                            <input className='border-custom rounded-custom p-8' type='text' name='data' placeholder='Datos' onChange={(e) => handlePlanInputChange(e, index)} required />
                        </div>
                        <input className='border-custom rounded-custom p-8 w-full' type='text' name='iccid' placeholder='ICCID' onChange={(e) => handlePlanInputChange(e, index)} required />
                    </div>
                ))}
                <ButtonLight onClick={addPlan} extraClasses='px-32 py-8 mb-8'>Agregar Otro Plan</ButtonLight>
                <select className='border-custom rounded-custom p-8 mb-8' name='idioma' onChange={handleInputChange} required>
                    <option value="">Seleccionar Idioma</option>
                    <option value="es">Español</option>
                    <option value="en">Inglés</option>
                    <option value="br">Portugues</option>
                </select>
                <ButtonDark extraClasses='px-32 py-8' type='submit'>{formState}</ButtonDark>
            </form>
        </div>
    );
};

export default PaymentConfirmationEmailForm;