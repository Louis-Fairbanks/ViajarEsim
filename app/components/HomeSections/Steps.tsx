'use client';
import { useState, useEffect, useRef } from 'react';
import React from 'react'
import StepNumbers from './StepNumbers'
import InfoSection from './InfoSection';
import Image from 'next/image';
import ButtonDark from '../ReusableComponents/ButtonDark';

const Steps = () => {
    const [activeStep, setActiveStep] = useState(1);
    const stepsContainer = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (stepsContainer.current && window.innerWidth > 1024) {
            let translateYValue = '0%';
            if (activeStep === 2) {
                translateYValue = '-100%';
            } else if (activeStep === 3) {
                translateYValue = '-200%';
            }
            stepsContainer.current.style.transform = `translateY(${translateYValue})`;
        }
        else if(stepsContainer.current){
            let translateXValue = '0%';
            if (activeStep === 2) {
                translateXValue = '-100%';
            } else if (activeStep === 3) {
                translateXValue = '-200%';
            }
            stepsContainer.current.style.transform = `translateX(${translateXValue})`;
        }
    }, [activeStep]);

    return (

        <div className='flex flex-col lg:flex-row lg:space-x-48 items-center relative overflow-hidden'>
            <StepNumbers activeStep={activeStep} setActiveStep={setActiveStep} />
            <div ref={stepsContainer} className='transition-all duration-1000 ease-in-out'>
                <div className='flex flex-col-reverse lg:flex-row  items-center lg:gap-x-12 xl:gap-x-90 min-h-full'>
                    <Image
                        src='/media/paso1.png'
                        alt='paso uno'
                        width={450}
                        height={450}
                    />
                    <InfoSection extraClasses='text-center lg:text-start items-center lg:items-start'
                        header="Verifica que tu dispositivo sea compatible con eSIM y adquiere tu plan de datos."
                        info="Una vez confirmado que tu móvil es compatible, selecciona el plan con el destino y la duración que mejor se ajuste a tu viaje."
                        cta="Verificar compatibilidad"
                    />
                </div>
                <div className='flex flex-col-reverse justify-end lg:flex-row items-center lg:gap-x-12 xl:gap-x-90 
                absolute top-0 lg:top-full min-h-full left-full lg:left-0 w-full'>
                    <Image
                        src='/media/que-es-una-sim2.png'
                        alt='paso uno'
                        width={450}
                        height={450}
                    />
                    <InfoSection extraClasses='text-center lg:text-start'
                        header="Sigue los pasos indicados para la instalación del eSIM"
                        info="Tras completar la compra, recibirás por email los detalles para instalar y activar tu eSIM. En pocos minutos todo estará listo."
                    />
                </div>
                <div className='flex flex-col-reverse justify-end lg:flex-row items-center lg:gap-x-12 xl:gap-x-90 
                absolute top-0 lg:top-fullx2 left-fullx2 lg:left-0 min-h-full w-full'>
                    <Image
                        src='/media/que-es-una-sim3.png'
                        alt='paso uno'
                        width={450}
                        height={450}
                    />
                    <div className='flex flex-col justify-center'>
                        <InfoSection extraClasses='text-center lg:text-start'
                            header="¡Conéctate al aterrizar! Usa tu plan de datos al llegar a tu destino"
                            info="Tu teléfono se conectará automáticamente a internet al llegar. ¡Disfruta de tu viaje!"
                        />
                        <ButtonDark extraClasses='px-48 py-9 mt-8 whitespace-nowrap w-fit mx-auto lg:mx-0'>Ver todos los destinos</ButtonDark>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Steps
