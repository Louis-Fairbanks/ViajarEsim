import React, { useState } from 'react';
import ButtonDark from '../components/ReusableComponents/ButtonDark';
import ButtonLight from '../components/ReusableComponents/ButtonLight';
import { Close } from '@mui/icons-material';
import { OrderObject } from '../components/Types/TOrderObject';

interface Props {
    order: OrderObject;
    close: () => void;
}

const PaymentConfirmationEmailForm: React.FC<Props> = ({ order, close }) => {
    const [formStatePreferred, setFormStatePreferred] = useState('Enviar con mail.viajaresim.com (preferido)');
    const [formStateAlternative, setFormStateAlternative] = useState('Enviar con viajaresim.com dominio (alternativa)');

    const [formData, setFormData] = useState({
        email: order.correo,
        orderNumber: order.numeroOrden,
        firstName: order.nombre,
        lastName: order.apellido,
        total: order.total,
        paymentMethod: order.metodoPago,
        datePaid: new Date(order.fecha).toLocaleDateString('es-ES'),
        appliedDiscount: order.porcentajeDescuento ? ((order.porcentajeDescuento / 100) * order.total).toFixed(2) : '0',
        discountName: order.codigoDescuento || '',
        purchasedPlans: order.planes.map((plan: any) => ({
            regionName: plan.region,
            duration: plan.duration,
            salePrice: plan.precio,
            data: plan.data,
            iccid: plan.iccid,
        })),
        idioma: order.locale,
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handlePlanInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const { name, value } = e.target;
        const updatedPlans = [...formData.purchasedPlans];
        updatedPlans[index] = { ...updatedPlans[index], [name]: value };
        setFormData(prevState => ({
            ...prevState,
            purchasedPlans: updatedPlans,
        }));
    };

    const addPlan = () => {
        setFormData(prevState => ({
            ...prevState,
            purchasedPlans: [...prevState.purchasedPlans, { regionName: '', duration: '', salePrice: '', data: '', iccid: '' }],
        }));
    };

    const removePlan = (index: number) => {
        setFormData(prevState => ({
            ...prevState,
            purchasedPlans: prevState.purchasedPlans.filter((_, i) => i !== index),
        }));
    };

    const formatNumber = (value: string | number): string => {
        const number = typeof value === 'string' ? parseFloat(value.replace(/[^\d.,]/g, '').replace(',', '.')) : value;
        return isNaN(number) ? '0' : number.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    };

    const submitForm = async (method: 'preferred' | 'alternative') => {
        const sendingDomain = method === 'preferred' ? 'mail.viajaresim.com' : 'viajaresim.com';
        if (method === 'preferred') {
            setFormStatePreferred('Enviando...');
        } else {
            setFormStateAlternative('Enviando...');
        }

        // Format the data before sending
        const formattedData = {
            ...formData,
            method,
            sendingDomain,
            total: formatNumber(formData.total),
            appliedDiscount: formatNumber(formData.appliedDiscount),
            purchasedPlans: formData.purchasedPlans.map(plan => ({
                ...plan,
                salePrice: formatNumber(plan.salePrice),
                data:
                    plan.data.toLowerCase() === 'unlimited' || plan.data.toLowerCase() === 'datos ilimitados'
                        ? 'Datos ilimitados'
                        : `${plan.data}${plan.data.toLowerCase().includes('gb') ? '' : ' GB'}`,
            })),
        };

        try {
            const response = await fetch('/api/mandar-email-confirmacion-compra', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formattedData),
            });
            if (response.ok) {
                if (method === 'preferred') {
                    setFormStatePreferred('Enviado!');
                } else {
                    setFormStateAlternative('Enviado!');
                }
            } else {
                if (method === 'preferred') {
                    setFormStatePreferred('Error al enviar');
                } else {
                    setFormStateAlternative('Error al enviar');
                }
            }
        } catch (error) {
            console.error('Error:', error);
            if (method === 'preferred') {
                setFormStatePreferred('Error al enviar');
            } else {
                setFormStateAlternative('Error al enviar');
            }
        }
    };

    return (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-background p-12 rounded-custom">
            <form className="flex flex-col space-y-12 max-h-512 overflow-y-scroll p-24">
                <Close onClick={close} className="ml-auto cursor-pointer" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <input
                        className="border-custom rounded-custom p-8"
                        type="text"
                        value={formData.firstName}
                        name="firstName"
                        placeholder="Nombre"
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        className="border-custom rounded-custom p-8"
                        type="text"
                        value={formData.lastName}
                        name="lastName"
                        placeholder="Apellido"
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <input
                        className="border-custom rounded-custom p-8"
                        type="text"
                        value={formData.orderNumber}
                        name="orderNumber"
                        placeholder="Número de Orden"
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        className="border-custom rounded-custom p-8"
                        type="email"
                        value={formData.email}
                        name="email"
                        placeholder="Correo Electrónico"
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <input
                        className="border-custom rounded-custom p-8"
                        type="text"
                        value={formData.total}
                        name="total"
                        placeholder="Total"
                        onChange={handleInputChange}
                        required
                    />
                    <select
                        className="border-custom rounded-custom p-8"
                        name="paymentMethod"
                        value={formData.paymentMethod}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="Tarjeta">Tarjeta de Crédito/Débito</option>
                        <option value="PayPal">PayPal</option>
                        <option value="Criptomonedas">Criptomonedas</option>
                    </select>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <input
                        className="border-custom rounded-custom p-8"
                        type="text"
                        value={formData.datePaid}
                        name="datePaid"
                        placeholder="Fecha de Pago (DD/MM/AAAA)"
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        className="border-custom rounded-custom p-8"
                        type="text"
                        value={formData.appliedDiscount}
                        name="appliedDiscount"
                        placeholder="Descuento Aplicado"
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <input
                    className="border-custom rounded-custom p-8"
                    type="text"
                    value={formData.discountName === '' ? '-' : formData.discountName}
                    name="discountName"
                    placeholder="Nombre Descuento"
                    onChange={handleInputChange}
                    required
                />

                {formData.purchasedPlans.map((plan, index) => (
                    <div key={index} className="border-2 border-gray-300 p-4 rounded-lg relative">
                        <h3 className="text-lg font-semibold mb-2">Plan {index + 1}</h3>
                        <ButtonDark
                            onClick={() => removePlan(index)}
                            extraClasses="absolute p-8 right-2 top-2 cursor-pointer"
                        >
                            Sacar plan
                        </ButtonDark>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
                            <input
                                className="border-custom rounded-custom p-8"
                                type="text"
                                value={plan.regionName}
                                name="regionName"
                                placeholder="Región"
                                onChange={(e) => handlePlanInputChange(e, index)}
                                required
                            />
                            <input
                                className="border-custom rounded-custom p-8"
                                type="text"
                                value={plan.duration}
                                name="duration"
                                placeholder="Duración"
                                onChange={(e) => handlePlanInputChange(e, index)}
                                required
                            />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
                            <input
                                className="border-custom rounded-custom p-8"
                                type="text"
                                value={plan.salePrice}
                                name="salePrice"
                                placeholder="Precio de Venta"
                                onChange={(e) => handlePlanInputChange(e, index)}
                                required
                            />
                            <input
                                className="border-custom rounded-custom p-8"
                                type="text"
                                value={plan.data}
                                name="data"
                                placeholder="Datos"
                                onChange={(e) => handlePlanInputChange(e, index)}
                                required
                            />
                        </div>
                        <input
                            className="border-custom rounded-custom p-8 w-full"
                            type="text"
                            value={plan.iccid}
                            name="iccid"
                            placeholder="ICCID"
                            onChange={(e) => handlePlanInputChange(e, index)}
                            required
                        />
                    </div>
                ))}

                <ButtonLight onClick={addPlan} extraClasses="px-32 py-8">
                    Agregar Otro Plan
                </ButtonLight>

                <select
                    className="border-custom rounded-custom p-8"
                    name="idioma"
                    value={formData.idioma}
                    onChange={handleInputChange}
                    required
                >
                    <option value="es">Español</option>
                    <option value="en">Inglés</option>
                    <option value="br">Portugués</option>
                    <option value="de">Alemán</option>
                    <option value="fr">Francés</option>
                    <option value="it">Italiano</option>
                </select>

                <ButtonDark
                    extraClasses="px-32 py-8"
                    type="button"
                    onClick={() => submitForm('preferred')}
                >
                    {formStatePreferred}
                </ButtonDark>
                <ButtonLight
                    extraClasses="px-32 py-8"
                    type="button"
                    onClick={() => submitForm('alternative')}
                >
                    {formStateAlternative}
                </ButtonLight>
            </form>
        </div>
    );
};

export default PaymentConfirmationEmailForm;