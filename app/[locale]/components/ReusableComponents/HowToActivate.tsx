'use client'
import React, { Suspense, useState, useEffect } from 'react'
import SectionHeader from './SectionHeader'
import Image from 'next/image'
import CompatibilityModal from './CompatibilityModal'
import { useTranslations } from 'next-intl'

const HowToActivate = () => {

    const translations = useTranslations('HowToActivate')

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
                <SectionHeader title={translations('title')} header={translations('heading')} />
                <div className={`flex md:grid md:grid-cols-3 gap-24 md:gap-48 transition-all duration-500 ease-linear
            `} style={{ transform: `translateX(-${translateXPercentage}px)` }}>
                    <div className='min-w-full md:min-w-fit flex flex-col rounded-custom border-custom p-24 xl:space-y-32 items-center'>
                        <div className='flex flex-col gap-12 justify-center text-center'>
                            <p className='font-extrabold text-hero leading-body text-accent'>1.</p>
                            <h2 className='font-semibold'>{translations('verificaQue')}</h2>
                            <div className='text-text-faded'>{translations('verificaSi')} 
                            <span className='font-bold text-primary cursor-pointer' onClick={() => setModalClicked(true)}> {translations('aqui')}</span></div>
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
                    <div className='min-w-full md:min-w-fit flex flex-col justify-between rounded-custom border-custom p-24 xl:space-y-32 items-center'>
                        <div className='flex flex-col gap-12 justify-center text-center'>
                            <p className='font-extrabold text-hero leading-body text-accent'>2.</p>
                            <h2 className='font-semibold'>{translations('adquiereTu')}</h2>
                            <div className='text-text-faded'>{translations('eligeEl')}</div>
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
                    <div className='min-w-full md:min-w-fit flex flex-col justify-between rounded-custom border-custom p-24 xl:space-y-32 items-center'>
                        <div className='flex flex-col gap-12 justify-center text-center'>
                            <p className='font-extrabold text-hero leading-body text-accent'>3.</p>
                            <h2 className='font-semibold'>{translations('sigueLas')}</h2>
                            <div className='text-text-faded'>{translations('teEnviaremos')}</div>
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
                <div className='md:hidden mx-auto flex space-x-12 transition-all duration-300 ease-linear'>
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
