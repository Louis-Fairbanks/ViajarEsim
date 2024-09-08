import React from 'react'
import InstallationCard from './InstallationCard'

const cardInformation = [
    {
        imageUrl: '/media/instalacion-imagen-1.png',
        imageAlt: 'hombre con reloj',
        text: 'Instala horas antes de tu viaje, y activa durante tu vuelo o al llegar a tu destino.'
    },
    {
        imageUrl: '/media/email/hombre-con-celular.png',
        imageAlt: 'hombre con celular',
        text: 'Selecciona “Instalar con QR” si tienes el código en otro dispositivo para escanearlo.'
    },
    {
        imageUrl: '/media/instalacion-imagen-2.png',
        imageAlt: 'hombre trabajando con llave francesa',
        text: 'Selecciona “Instalar Manualmente” si no puedes escanear el QR.'
    }
]
const InstallationCards = () => {
    return (
        <div className='grid grid-cols-3 gap-x-48'>
            {cardInformation.map((card, index) => {
                return <InstallationCard key={index} imageUrl={card.imageUrl} imageAlt={card.imageAlt} text={card.text} />
            })
            }
        </div>
    )
}

export default InstallationCards
