import React from 'react'
import Image from 'next/image'
import { useInstallation } from './InstallationProvider'
import { useTranslations } from 'next-intl'

const KeepInMind = () => {

    const translations = useTranslations('KeepInMind')
    const {installationType} = useInstallation()
    const QRSteps = translations.raw('QRSteps')
    const manualSteps = translations.raw('manualSteps')

    return (
        <div className='bg-yellow-gradient flex justify-between p-32 sm:p-48 rounded-2xl relative w-full overflow-hidden'>
            <div className='flex flex-col space-y-16 w-full lg:w-2/3'>
                <h2 className='font-semibold text-heading'>{installationType === 'QR' ? translations('QRHeader') : translations('manualHeader')}</h2>
                <ul className='list-disc list-inside pl-12'>
                    {installationType === 'QR' ? QRSteps.map((item : any, index : number) => {
                        return <li key={index}>{item}</li>
                    }) : manualSteps.map((item : any, index : number) => {return <li key={index}>{item}</li>})}
                </ul>
                {installationType === 'Manual' && <p>{translations('teRecomendamos')}</p>}
            </div>
            <Image className='absolute hidden lg:block -right-32 -top-165'
                src='/media/hombre-con-celular-grande.png'
                alt='hombre con celular grande'
                width={410}
                height={430}
            />
            <Image className='absolute -top-8 right-0 scale-x-[-1] lg:hidden'
                src='/media/nube.png'
                alt='puntitos'
                width={100}
                height={60}
            />
        </div>
    )
}

export default KeepInMind
