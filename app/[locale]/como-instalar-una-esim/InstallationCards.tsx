'use client'
import React, { useMemo, useState, useEffect, useRef } from 'react'
import InstallationCard from './InstallationCard'
import { useInstallation } from './InstallationProvider'
import { useTranslations } from 'next-intl'


const InstallationCards = () => {

    const translations = useTranslations('CardInformation')
    const cardInformation = translations.raw('items')

    const { selectedDevice } = useInstallation()
    const [activeStep, setActiveStep] = useState(1);
    const stepsContainer = useRef<HTMLDivElement>(null);

    const visibleCards = useMemo(() => {
        if (selectedDevice === 'iPhone') {
            return cardInformation.filter((card : any)=> card.imageUrl !== '/media/hombre-scrolleando-pantallas.png')
        }
        return cardInformation
    }, [selectedDevice])
    useEffect(() => {
        if (stepsContainer.current) {
            stepsContainer.current.style.transform = `translateX(calc(-1 * ${100 * (activeStep - 1)}% - ${48 * (activeStep - 1)}px))`;
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
            <div ref={stepsContainer} className={`flex items-stretch gap-x-48 relative max-w-full transition-all duration-1000 ease-in-out lg:transition-none
        lg:space-y-0 lg:grid ${selectedDevice === 'iPhone' ? 'grid-cols-3 gap-x-48' : 'grid-cols-4 gap-x-32'}`}>
                {visibleCards.map((card : any, index : number) => (
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