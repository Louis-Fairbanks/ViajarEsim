'use client'
import React, { useMemo, useState, useEffect, useRef } from 'react'
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
    const [activeStep, setActiveStep] = useState(1);
    const stepsContainer = useRef<HTMLDivElement>(null);

    const visibleCards = useMemo(() => {
        if (selectedDevice === 'iPhone') {
            return cardInformation.filter(card => card.imageUrl !== '/media/hombre-scrolleando-pantallas.png')
        }
        return cardInformation
    }, [selectedDevice])
    useEffect(() => {
        if (stepsContainer.current) {
            let translateXValue = `-${((activeStep - 1) * 100)}%`
            stepsContainer.current.style.transform = `translateX(${translateXValue})`;
        }
    }, [activeStep]);

    useEffect(() => {
        if(stepsContainer.current){
            stepsContainer.current.style.transform = 'translateX(0%)';
        }
        setActiveStep(1)
    }, [visibleCards])

    return (
        <div className='flex flex-col items-center space-y-12 overflow-hidden max-w-full'>
            <div ref={stepsContainer} className={`flex items-stretch relative max-w-full transition-all duration-1000 ease-in-out lg:transition-none
        lg:space-y-0 lg:grid ${selectedDevice === 'iPhone' ? 'grid-cols-3 gap-x-48' : 'grid-cols-4 gap-x-32'}`}>
                {visibleCards.map((card, index) => (
                    <InstallationCard
                        key={`${selectedDevice}-${index}`}
                        imageUrl={card.imageUrl}
                        imageAlt={card.imageAlt}
                        text={card.text}
                    />
                ))}
            </div>
            <div className='lg:hidden -mt-12 flex space-x-12 transition-all duration-300 ease-linear'>
                <div className={`rounded-full h-32 w-32 flex justify-center items-center border-custom cursor-pointer
                    text-heading  ${activeStep === 1 ? 'text-accent border-accent' : 'text-primary border-primary'}
                    `} onClick={() => setActiveStep(prevState => {
                    if (prevState === 1) {
                        return 1
                    } else return prevState - 1
                })}>{`<`}</div>
                <div className={`rounded-full h-32 w-32 flex justify-center items-center cursor-pointer border-custom text-heading
                    ${activeStep === visibleCards.length ? 'text-accent border-accent' : 'border-primary text-primary'}`}
                    onClick={() => setActiveStep(prevState => {
                        if (prevState === visibleCards.length) {
                            return visibleCards.length
                        } else return prevState + 1
                    })}>{`>`}</div>
            </div>
        </div>
    )
}

export default InstallationCards