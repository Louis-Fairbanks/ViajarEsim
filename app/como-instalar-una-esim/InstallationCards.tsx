'use client'
import React, { useMemo, useState } from 'react'
import InstallationCard from './InstallationCard'
import { useInstallation } from './InstallationProvider'

const cardInformation = [
    {
        imageUrl: '/media/instalacion-imagen-1.png',
        imageAlt: 'hombre con reloj',
        text: 'Instala horas antes de tu viaje, y activa durante tu vuelo o al llegar a tu destino.'
    },
    {
        imageUrl: '/media/hombre-scrolleando-pantallas.png',
        imageAlt: 'hombre scrolleando pantallas',
        text: 'Selecciona el dispositivo en el que harás la instalación.'
    },
    {
        imageUrl: '/media/email/hombre-con-celular.png',
        imageAlt: 'hombre con celular',
        text: 'Selecciona "Instalar con QR" si tienes el código en otro dispositivo para escanearlo.'
    },
    {
        imageUrl: '/media/instalacion-imagen-2.png',
        imageAlt: 'hombre trabajando con llave francesa',
        text: 'Selecciona "Instalar Manualmente" si no puedes escanear el QR.'
    }
]

const InstallationCards = () => {
    const { selectedDevice } = useInstallation()
    const [currentCard, setCurrentCard] = useState<number>(0)

    const visibleCards = useMemo(() => {
        if (selectedDevice === 'iPhone') {
            return cardInformation.filter(card => card.imageUrl !== '/media/hombre-scrolleando-pantallas.png')
        }
        return cardInformation
    }, [selectedDevice])

    return (
        <div className={`flex flex-col lg:grid ${selectedDevice === 'iPhone' ? 'grid-cols-3 gap-x-48' : 'grid-cols-4 gap-x-32'}`}>
            {visibleCards.map((card, index) => (
                <InstallationCard 
                    key={`${selectedDevice}-${index}`} 
                    imageUrl={card.imageUrl} 
                    imageAlt={card.imageAlt} 
                    text={card.text} 
                />
            ))}
        </div>
    )
}

export default InstallationCards