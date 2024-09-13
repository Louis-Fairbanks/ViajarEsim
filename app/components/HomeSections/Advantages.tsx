'use client'
import React, { useState, useEffect } from 'react'
import AdvantageBlurb from '../ReusableComponents/AdvantageBlurb'
import { AdvantagesItems } from '../Beneficios'

const Advantages = () => {

    const [currentStep, setCurrentStep] = useState<number>(1);
    const [translateXPercentage, setTranslateXPercentage] = useState<number>(0);

    useEffect(() => {
        const viewportWidth = window.innerWidth;
        if (currentStep === 1) {
            setTranslateXPercentage(0)
        }
        else {
            setTranslateXPercentage((viewportWidth * (currentStep - 1)) - (24 * (currentStep - 1)))
        }
    }, [currentStep])

    return (
        <section className='overflow-hidden p-24 sm:p-64 space-y-24 mt-32'>
            <div className={`flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-24 md:gap-48 transition-all duration-300 ease-linear
            `} style={{ transform: `translateX(-${translateXPercentage}px)` }}>
                {AdvantagesItems.map((benefit, index) => (
                    <AdvantageBlurb
                        key={index}
                        heading={benefit.heading}
                        info={benefit.info}
                        imgPath={benefit.imgPath}
                    />
                ))}
            </div>
            <div className='flex flex-col items-center justify-center space-y-24 sm:hidden'>
                <div className='flex space-x-8'>
                    {
                        Array.from({ length: AdvantagesItems.length }).map((_, i) => (
                            <div
                                key={i}
                                className={`transition-all duration-400 ease-linear
                                bg-light-button-border h-12 w-12 rounded-full ${i === (currentStep - 1) ? 'w-24 bg-primary' : ''}`}
                            >
                            </div>
                        ))
                    }
                </div>
                <div className='flex space-x-12 transition-all duration-300 ease-linear'>
                    <div className={`rounded-full h-32 w-32 flex justify-center items-center border-custom cursor-pointer
                    text-heading  ${currentStep === 1 ? 'text-accent border-accent' : 'text-primary border-primary'}
                    `} onClick={() => setCurrentStep(prevState => {
                        if (prevState === 1) {
                            return 1
                        } else return prevState - 1
                    })}>{`<`}</div>
                    <div className={`rounded-full h-32 w-32 flex justify-center items-center cursor-pointer border-custom text-heading
                    ${currentStep === AdvantagesItems.length ? 'text-accent border-accent' : 'border-primary text-primary'}`}
                        onClick={() => setCurrentStep(prevState => {
                            if (prevState === AdvantagesItems.length) {
                                return AdvantagesItems.length
                            } else return prevState + 1
                        })}>{`>`}</div>
                </div>
            </div>
        </section>
    )
}

export default Advantages
