'use client'
import React, { Suspense, useState, useEffect } from 'react'
import SectionHeader from './SectionHeader'
import Image from 'next/image'
import Link from 'next/link'
import CompatibilityModal from './CompatibilityModal'

const HowToActivate = () => {
    const [modalClicked, setModalClicked] = useState<boolean>(false)

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
    <div className="flex flex-col p-24 sm:p-64 space-y-48 overflow-hidden">
        <Suspense>
        <CompatibilityModal setModalClicked={setModalClicked} modalClicked={modalClicked}/>
        </Suspense>
                <SectionHeader title="paso a paso" header="Conocé como activar tu eSIM fácilmente" />
                <div className={`flex sm:grid md:grid-cols-3 gap-24 md:gap-48 transition-all duration-500 ease-linear
            `} style={{ transform: `translateX(-${translateXPercentage}px)` }}>
                    <div className='min-w-full sm:min-w-fit flex flex-col rounded-custom border-custom p-24 xl:space-y-32 items-center'>
                        <div className='flex flex-col gap-12 justify-center text-center'>
                            <p className='font-extrabold text-hero leading-body text-accent'>1.</p>
                            <h2 className='font-semibold'>Verifica que tu teléfono sea compatible.</h2>
                            <div className='text-text-faded'>Verifica si tu smartphone es compatible 
                            <span className='font-bold text-primary cursor-pointer' onClick={() => setModalClicked(true)}> aquí.</span></div>
                        </div>
                        <div className="border-t border-custom h-2 w-full"></div>
                        <div className='relative'>
                            <Image
                                src='/media/paso1.png'
                                alt='celular con esim'
                                height={332}
                                width={292}
                            />
                            <Image className='absolute top-64 right-32'
                                src='/media/puntitos.svg'
                                alt=''
                                height={24}
                                width={60}
                            />
                        </div>
                    </div>
                    <div className='min-w-full sm:min-w-fit flex flex-col justify-between rounded-custom border-custom p-24 xl:space-y-32 items-center'>
                        <div className='flex flex-col gap-12 justify-center text-center'>
                            <p className='font-extrabold text-hero leading-body text-accent'>2.</p>
                            <h2 className='font-semibold'>Adquiere tu eSIM prepago.</h2>
                            <div className='text-text-faded'>Elige el plan de datos móviles que necesites.</div>
                        </div>
                        <div className="border-t border-custom h-2 w-full"></div>
                        <div className='relative'>
                            <Image
                                src='/media/que-es-una-sim2.png'
                                alt='celular con esim'
                                height={332}
                                width={292}
                            />
                        </div>
                    </div>
                    <div className='min-w-full sm:min-w-fit flex flex-col justify-between rounded-custom border-custom p-24 xl:space-y-32 items-center'>
                        <div className='flex flex-col gap-12 justify-center text-center'>
                            <p className='font-extrabold text-hero leading-body text-accent'>3.</p>
                            <h2 className='font-semibold'>Sigue las instrucciones enviadas por correo.</h2>
                            <div className='text-text-faded'>Te enviaremos un correo con las instrucciones.</div>
                        </div>
                        <div className="border-t border-custom h-2 w-full"></div>
                        <div className='relative'>
                            <Image
                                src='/media/que-es-una-sim3.png'
                                alt='celular con esim'
                                height={332}
                                width={292}
                            />
                        </div>
                    </div>
                </div>
                <div className='mx-auto flex space-x-12 transition-all duration-300 ease-linear'>
                    <div className={`rounded-full h-32 w-32 flex justify-center items-center border-custom cursor-pointer
                    text-heading  ${currentStep === 1 ? 'text-accent border-accent': 'text-primary border-primary'}
                    `} onClick={() => setCurrentStep(prevState => {
                        if(prevState === 1){
                            return 1
                        }else return prevState - 1
                        })}>{`<`}</div>
                    <div className={`rounded-full h-32 w-32 flex justify-center items-center cursor-pointer border-custom text-heading
                    ${ currentStep === 3 ? 'text-accent border-accent' : 'border-primary text-primary'}`}
                        onClick={() => setCurrentStep(prevState => {
                            if (prevState === 3) {
                                return 3
                            } else return prevState + 1
                        })}>{`>`}</div>
                </div>
            </div>
  )
}

export default HowToActivate
