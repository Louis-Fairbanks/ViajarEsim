'use client';
import React from 'react'
import { useState, useEffect, useRef } from 'react';
import styles from './Steps.module.css';


interface Props {
    activeStep: number;
    setActiveStep: React.Dispatch<React.SetStateAction<number>>;
}


const StepNumbers: React.FC<Props> = ({ activeStep, setActiveStep }) => {
    const stepOneColumn = useRef<HTMLDivElement>(null);
    const stepTwoColumn = useRef<HTMLDivElement>(null);
    const stepThreeColumn = useRef<HTMLDivElement>(null);
    const stepTwoCircle = useRef<HTMLDivElement>(null);
    const stepTwoBackground = useRef<HTMLDivElement>(null);
    const stepThreeCircle = useRef<HTMLDivElement>(null);
    const stepThreeBackground = useRef<HTMLDivElement>(null);

    const prevStepRef = useRef(activeStep);

    const [stepTwoBackgroundFillPercentage, setStepTwoBackgroundFillPercentage] = useState(0);
    const [stepThreeBackgroundFillPercentage, setStepThreeBackgroundFillPercentage] = useState(0);

    const animateFillCircle = (background: number, fillFunction: (value: number) => void, speed: number) => {
        if (background < 100) {
            const newValue = Math.min(background + speed, 100);
            fillFunction(newValue);
            requestAnimationFrame(() => animateFillCircle(newValue, fillFunction, speed));
        }
    };
    const reverseFillCircle = (background: number, fillFunction: (value: number) => void, speed: number) => {
        if (background > 0) {
            const newValue = Math.max(background + speed, 0);
            fillFunction(newValue);
            requestAnimationFrame(() => reverseFillCircle(newValue, fillFunction, speed));
        }
    };

    const animateStepChange = (stepColumn: HTMLDivElement, stepBackground: HTMLDivElement, stepCircle: HTMLDivElement,
        stepBackgroundFillPercentage: number, stepBackgroundFillPercentageFunction: any) => {
        const children = stepColumn.children;

        Array.from(children).forEach((child, index) => {
            setTimeout(() => {
                if (index === 1) {
                    stepBackground.classList.replace('-top-4', 'top-0');
                    stepCircle.classList.replace('text-accent', 'text-background');
                    stepCircle.classList.replace('border-custom', 'border-primary');
                    stepBackground.classList.replace('border-custom', 'border-primary');
                    animateFillCircle(stepBackgroundFillPercentage, stepBackgroundFillPercentageFunction, 4)
                }
                else {
                    if (child.classList.contains(styles.animateColorReverse)) {
                        child.classList.remove(styles.animateColorReverse);
                    }
                    child.classList.add(styles.animateColor);
                }
            }, index * 200);
        });
    }
    const reverseStepChange = (stepColumn: HTMLDivElement, stepBackground: HTMLDivElement, stepCircle: HTMLDivElement,
        stepBackgroundFillPercentage: number, stepBackgroundFillPercentageFunction: any) => {
        const children = stepColumn.children;

        Array.from(children).forEach((child, index) => {
            setTimeout(() => {
                if (index === 1) {
                    if(children.length === 3){
                        setTimeout(() => {
                            reverseFillCircle(stepBackgroundFillPercentage, stepBackgroundFillPercentageFunction, -4)
                            stepBackground.classList.replace('top-0', '-top-4');
                            stepCircle.classList.replace('text-background', 'text-accent');
                            stepCircle.classList.replace('border-primary', 'border-custom');
                            stepBackground.classList.replace('border-primary', 'border-custom');
                        }, 400);
                    } else {
                        reverseFillCircle(stepBackgroundFillPercentage, stepBackgroundFillPercentageFunction, -4)
                        stepBackground.classList.replace('top-0', '-top-4');
                        stepCircle.classList.replace('text-background', 'text-accent');
                        stepCircle.classList.replace('border-primary', 'border-custom');
                        stepBackground.classList.replace('border-primary', 'border-custom');
                    }
                }
                else {
                    child.classList.remove(styles.animateColor);
                    child.classList.add(styles.animateColorReverse);
                }
            }, index * -200);
            });
        }

    useEffect(() => {
            if (activeStep === 2 && stepTwoColumn.current && stepTwoBackground.current && stepTwoCircle.current) {
                if(prevStepRef.current === 3){
                    reverseStepChange(stepThreeColumn.current!, stepThreeBackground.current!, stepThreeCircle.current!,
                        stepThreeBackgroundFillPercentage, setStepThreeBackgroundFillPercentage);
                }
                else{
                animateStepChange(stepTwoColumn.current, stepTwoBackground.current, stepTwoCircle.current,
                    stepTwoBackgroundFillPercentage, setStepTwoBackgroundFillPercentage);}
            }
            if (activeStep === 3 && stepThreeColumn.current && stepThreeBackground.current && stepThreeCircle.current) {
                if (prevStepRef.current === 1) {
                    setTimeout(() => {
                        animateStepChange(stepThreeColumn.current!, stepThreeBackground.current!, stepThreeCircle.current!,
                            stepThreeBackgroundFillPercentage, setStepThreeBackgroundFillPercentage);
                    }, 700)

                    animateStepChange(stepTwoColumn.current!, stepTwoBackground.current!, stepTwoCircle.current!,
                        stepTwoBackgroundFillPercentage, setStepTwoBackgroundFillPercentage);
                }
                else {
                    animateStepChange(stepThreeColumn.current, stepThreeBackground.current, stepThreeCircle.current,
                        stepThreeBackgroundFillPercentage, setStepThreeBackgroundFillPercentage);
                }
            }
            if (activeStep === 1 && stepOneColumn.current) {
                if (prevStepRef.current === 2) {
                    reverseStepChange(stepTwoColumn.current!, stepTwoBackground.current!, stepTwoCircle.current!,
                        stepTwoBackgroundFillPercentage, setStepTwoBackgroundFillPercentage);
                }
                if (prevStepRef.current === 3) {
                    setTimeout(() => {
                        reverseStepChange(stepTwoColumn.current!, stepTwoBackground.current!, stepTwoCircle.current!,
                            stepTwoBackgroundFillPercentage, setStepTwoBackgroundFillPercentage);
                    }, 600)
                    reverseStepChange(stepThreeColumn.current!, stepThreeBackground.current!, stepThreeCircle.current!,
                        stepThreeBackgroundFillPercentage, setStepThreeBackgroundFillPercentage);

                }
            }
        }, [activeStep]);

        useEffect(() => {
            prevStepRef.current = activeStep;
        }, [activeStep]);

        // const backgroundFillDirection = window.innerWidth > 1024 
        // ? { maxHeight: stepTwoBackgroundFillPercentage } //needs to  be set to stepTwoBackgroundFillPercentage and 
        // : { maxWidth: stepTwoBackgroundFillPercentage }; //stepThreeBackgroundFillPercentage

        return (
            <div className='hidden lg:flex flex-row lg:flex-col px-18 h-100 mb-24 lg:mb-0 items-center justify-center
            scale-50 sm:scale-100' 
                  style={{ maxWidth: '100px' }}>
                <div ref={stepOneColumn} className='flex flex-row lg:flex-col items-center cursor-pointer' onClick={() => setActiveStep(1)}>
                    <div className='w-64 h-64 flex justify-center items-center rounded-full font-medium text-background bg-primary'>1</div>
                    <div className='bg-primary w-64 h-1 lg:w-1 lg:h-64'></div>
                </div>
                <div ref={stepTwoColumn} className='flex flex-row lg:flex-col items-center cursor-pointer relative' onClick={() => setActiveStep(2)}>
                    <div className='bg-accent w-64 h-1 lg:w-1 lg:h-64' data-animation=""></div>
                    <div ref={stepTwoCircle} className='border-custom w-64 h-64 flex justify-center items-center rounded-full 
                font-medium text-accent relative overflow-hidden'> <span className="relative z-10">2</span>
                        <div ref={stepTwoBackground} className='border-custom w-64 h-64 flex justify-center items-center 
                    rounded-full absolute -top-4 right-0 bg-primary font-medium'
                     style={{ maxHeight: stepTwoBackgroundFillPercentage }}></div>
                    </div>
                    <div className='bg-accent w-64 h-1 lg:w-1 lg:h-64' data-animation=""></div>
                </div>
                <div ref={stepThreeColumn} className='flex flex-row lg:flex-col items-center cursor-pointer relative' onClick={() => setActiveStep(3)}>
                    <div className='bg-accent w-64 h-1 lg:w-1 lg:h-64 ' data-animation=''></div>
                    <div ref={stepThreeCircle} className='border-custom w-64 h-64 flex justify-center items-center rounded-full 
                font-medium text-accent relative overflow-hidden'> <span className="relative z-10">3</span>
                        <div ref={stepThreeBackground} className='border-custom w-64 h-64 flex justify-center items-center 
                    rounded-full absolute -top-4 right-0 bg-primary font-medium' style={{ maxHeight: stepThreeBackgroundFillPercentage }}></div>
                    </div>
                </div>
            </div>
        )
    }

    export default StepNumbers