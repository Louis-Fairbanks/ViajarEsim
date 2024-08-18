'use client';
import { useState, useEffect, useRef } from 'react';
import React from 'react'
import StepNumbers from './StepNumbers'
import InfoSection from './InfoSection';
import Image from 'next/image';

const Steps = () => {
    const [activeStep, setActiveStep] = useState(1);
    const stepsContainer = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (stepsContainer.current) {
            let translateYValue = '0%';
            if (activeStep === 2) {
                translateYValue = '-100%';
            } else if (activeStep === 3) {
                translateYValue = '-200%';
            }
            stepsContainer.current.style.transform = `translateY(${translateYValue})`;
        }
    }, [activeStep]);

    return (

        <div className='flex p-64 space-x-48 items-center relative overflow-y-hidden'>
            <StepNumbers activeStep={activeStep} setActiveStep={setActiveStep} />
            <div ref={stepsContainer} style={{transition : 'transform 1.25s ease-in-out'}}>
                <div className='flex p-24 items-center gap-x-90 min-h-full'>
                    <Image
                        src='/media/paso1.png'
                        alt='paso uno'
                        width={450}
                        height={450}
                    />
                    <InfoSection
                        header="Verifica que tu dispositivo sea compatible con eSIM y adquiere tu plan de datos."
                        info="Una vez confirmado que tu móvil es compatible, selecciona el plan con el destino y la duración que mejor se ajuste a tu viaje."
                        cta="Verificar compatibilidad"
                    />
                </div>
                <div className='flex p-24 items-center gap-x-90 absolute top-full min-h-full'>
                    <Image
                        src='/media/que-es-una-sim2.png'
                        alt='paso uno'
                        width={450}
                        height={450}
                    />
                    <InfoSection
                        header="Sigue los pasos indicados para la instalación del eSIM"
                        info="Tras completar la compra, recibirás por email los detalles para instalar y activar tu eSIM. En pocos minutos todo estará listo."
                    />
                </div>
                <div className='flex p-24 items-center gap-x-90 absolute top-fullx2 min-h-full'>
                    <Image
                        src='/media/que-es-una-sim3.png'
                        alt='paso uno'
                        width={450}
                        height={450}
                    />
                    <div>
                        <InfoSection
                            header="¡Conéctate al aterrizar! Usa tu plan de datos al llegar a tu destino"
                            info="Tu teléfono se conectará automáticamente a internet al llegar. ¡Disfruta de tu viaje!"
                        />
                        <button className='bg-primary px-48 py-9 text-background font-semibold rounded-custom'>Ver todos los destinos</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Steps
