import React, { useState } from 'react';
import ButtonDark from '../components/ReusableComponents/ButtonDark';
import { Close } from '@mui/icons-material';
import ButtonLight from '../components/ReusableComponents/ButtonLight';

interface Props {
    userFirstName: string;
    userLastName: string;
    orderNumber: number;
    email: string;
    regionName: string;
    data: string;
    duration: string;
    qrcode: string;
    iccid: string;
    close: () => void;
}

const EmailSending = (props: Props) => {
    const [formState, setFormState] = useState('Enviar con mail.viajaresim.com (preferido)');
    const [formStateAlternative, setFormStateAlternative] = useState('Enviar con viajaresim.com dominio (alternativa)');

    const [formData, setFormData] = useState({
        userFirstName: props.userFirstName,
        userLastName: props.userLastName,
        orderNumber: props.orderNumber,
        email: props.email,
        regionName: props.regionName,
        data: props.data,
        duration: props.duration,
        qrcode: props.qrcode,
        iccid: props.iccid,
        idioma: '',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const submitForm = async (method: 'preferred' | 'alternative') => {
        let sendingDomain = ''
        if (method === 'preferred') {
            sendingDomain = 'mail.viajaresim.com';
            setFormState('Enviando...');
        } else {
            sendingDomain = 'viajaresim.com'
            setFormStateAlternative('Enviando...');
        }
        try {
            const response = await fetch('/api/mandar-email-orden', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...formData, method, sendingDomain : sendingDomain }),
            });
            if (response.ok) {
                if (method === 'preferred') {
                    setFormState('Enviado!');
                } else {
                    setFormStateAlternative('Enviado!');
                }
            } else {
                if (method === 'preferred') {
                    setFormState('Error al enviar');
                } else {
                    setFormStateAlternative('Error al enviar');
                }
            }
        } catch (error) {
            console.error('Error:', error);
            if (method === 'preferred') {
                setFormState('Error al enviar');
            } else {
                setFormStateAlternative('Error al enviar');
            }
        }
    };

    return (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-background p-12 rounded-custom">
            <form className="flex flex-col space-y-12">
                <Close onClick={props.close} className="ml-auto cursor-pointer" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <input
                        className="border-custom rounded-custom p-8"
                        type="text"
                        value={formData.userFirstName}
                        name="userFirstName"
                        placeholder="Nombre"
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        className="border-custom rounded-custom p-8"
                        type="text"
                        value={formData.userLastName}
                        name="userLastName"
                        placeholder="Apellido"
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 ">
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
                        value={formData.regionName}
                        name="regionName"
                        placeholder="Región"
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        className="border-custom rounded-custom p-8"
                        type="text"
                        value={formData.data}
                        name="data"
                        placeholder="Datos"
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <input
                        className="border-custom rounded-custom p-8"
                        type="text"
                        value={formData.duration}
                        name="duration"
                        placeholder="Duración (días)"
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        className="border-custom rounded-custom p-8"
                        type="text"
                        value={formData.iccid}
                        name="iccid"
                        placeholder="ICCID"
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <input
                    className="border-custom rounded-custom p-8"
                    type="text"
                    value={formData.qrcode}
                    name="qrcode"
                    placeholder="Código QR"
                    onChange={handleInputChange}
                    required
                />
                <select
                    className="border-custom rounded-custom p-8"
                    name="idioma"
                    value={formData.idioma}
                    onChange={handleInputChange}
                    required
                >
                    <option value="">Idioma del cliente</option>
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
                    {formState}
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

export default EmailSending;