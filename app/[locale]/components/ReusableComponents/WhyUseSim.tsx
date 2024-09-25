import React from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'


interface Props {
    backgroundColor: string
}

const WhyUseSim = ({ backgroundColor }: Props) => {

    const translations = useTranslations('WhyUseSim')

    return (
        <div className='flex flex-col p-24 sm:p-64 space-y-48'>
            <div className={`flex flex-col rounded-2xl bg-${backgroundColor}-gradient items-center text-center 
                space-y-8 lg:space-y-16 p-24 lg:p-48 relative overflow-hidden`}>
                <h1 className='font-semibold text-heading sm:text-large-heading w-full sm:w-1/2 leading-body'>
                    {translations('heading')}</h1>
                <p className='w-full lg:w-1/2'>{translations('sabemosLo')}</p>
                <Image className='absolute hidden sm:block -top-16 -left-64 lg:left-0'
                    src='/media/nube.png'
                    alt=''
                    height={156}
                    width={227}
                />
                <Image className='absolute hidden sm:block -top-16 -right-64 lg:right-0 scale-x-[-1]'
                    src='/media/nube.png'
                    alt=''
                    height={156}
                    width={227}
                />
                <div className='grid grid-cols-1 md:grid-cols-3 md:gap-x-32 lg:gap-x-64'>
                <div className='p-12 sm:p-0 flex flex-col items-center text-center gap-x-12 sm:gap-x-0 sm:gap-y-12 relative'>
                        <Image
                            src='/media/avioncito-negro.svg'
                            alt='mobius'
                            height={66}
                            width={66}
                        />
                        <div className='flex flex-col gap-y-12'>
                            <h4 className='font-semibold'>{translations('reduceLos')}</h4>
                            <p className='text-text'>
                                {translations('losCargos')}
                            </p>
                        </div>
                    </div>
                    <div className='p-12 sm:p-0 flex flex-col items-center text-center gap-x-12 sm:gap-x-0 sm:gap-y-12 relative'>
                        <Image
                            src='/media/rayo-negro.svg'
                            alt='mobius'
                            height={66}
                            width={66}
                        />
                        <div className='flex flex-col gap-y-12'>
                            <h4 className='font-semibold'>{translations('conexionInmediata')}</h4>
                            <p className='text-text'>
                            {translations('activaTu')}
                            </p>
                        </div>
                    </div>
                    <div className='p-12 sm:p-0 flex flex-col items-center text-center gap-x-12 sm:gap-x-0 sm:gap-y-12 relative'>
                        <Image
                            src='/media/persona-saltando.svg'
                            alt='mobius'
                            height={66}
                            width={66}
                        />
                        <div className='flex flex-col gap-y-12'>
                            <h4 className='font-semibold'>{translations('disfrutaDe')}</h4>
                            <p className='text-text'>
                            {translations('eligeEl')}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WhyUseSim
