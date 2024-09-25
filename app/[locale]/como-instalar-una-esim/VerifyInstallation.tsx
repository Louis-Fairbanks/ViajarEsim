'use client'
import React, { useEffect, useState } from 'react'
import { useInstallation } from './InstallationProvider'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

const VerifyInstallation = () => {
  
    const translations = useTranslations('VerifyInstallation')
    const {selectedDevice} = useInstallation()

    const [imagePath, setImagePath]= useState<string>('')
    const [firstMethod, setFirstMethod] = useState<string>('')
    const [secondMethod, setSecondMethod] = useState<string>('')

    useEffect(() => {
        if(selectedDevice === 'iPhone'){
            setImagePath('/media/installationSteps/iphone-active-verify.png')
            setFirstMethod(translations('iPhoneVerify1'))
            setSecondMethod(translations('iPhoneVerify2'))
        }
        else{
            setImagePath('/media/installationSteps/android-active-verify.png')
            setFirstMethod(translations('androidVerify1'))
            setSecondMethod(translations('androidVerify2'))
        }
    }, [selectedDevice])
  
    return (
    <div className='my-32 rounded-2xl bg-gray-gradient p-24 sm:p-48 mx-24 md:mx-64 flex justify-center lg:justify-end space-x-0 lg:space-x-48 relative'>
      <Image className={`hidden lg:block absolute ${selectedDevice === 'iPhone' ? 'left-0' : 'left-64'} bottom-0`}
        src={imagePath}
        alt='pantalla de celular'
        height={selectedDevice === 'iPhone' ? 700 : 350}
        width={selectedDevice === 'iPhone'? 400 : 200}  
    />
      <div className='flex flex-col space-y-16 p-24 rounded-custom bg-background w-full lg:w-3/4'>
        <h2 className='font-semibold text-heading'>{translations('comoSaber')}</h2>
        <p>{translations('puedesRevisar')}</p>
        <p>{firstMethod}</p>
        <p>{secondMethod}</p>
      </div>
    </div>
  )
}

export default VerifyInstallation
