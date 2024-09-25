'use client'
import React, { useEffect, useState } from 'react'
import GettingStartedStep from './GettingStartedStep'
import { useInstallation } from './InstallationProvider'
import { useTranslations } from 'next-intl'

type CardInfo = {
  number: string
  title: string
  text: string
}


const GettingStartedSteps = () => {

  const translations = useTranslations('LetsStart')
  const { installationType, selectedDevice } = useInstallation()

  const [gettingStartTextsToUse, setGettingStartTextsToUse] = useState<CardInfo[]>([])

  useEffect(() => {
    if(selectedDevice === 'iPhone'){
      if(installationType === 'QR'){
        setGettingStartTextsToUse(translations.raw('iPhoneQRCards'))
      }
      else if(installationType === 'Manual'){
        setGettingStartTextsToUse(translations.raw('iPhoneManualCards'))
      }
    }
    else if(selectedDevice ==='Samsung'){
      if(installationType === 'QR'){
        setGettingStartTextsToUse(translations.raw('samsungQRCards'))
      }
      else if(installationType === 'Manual'){
        setGettingStartTextsToUse(translations.raw('samsungManualCards'))
      }
    }
    else if(selectedDevice === 'Google Pixel'){
      if(installationType === 'QR'){
        setGettingStartTextsToUse(translations.raw('pixelQRCards'))
      }
      else if(installationType === 'Manual'){
        setGettingStartTextsToUse(translations.raw('pixelManualCards'))
      }
    }
  }, [selectedDevice, installationType])

  return (
    <div className='flex flex-col space-y-12 lg:space-y-0 lg:grid grid-cols-3 gap-x-48'>
      {
        gettingStartTextsToUse.map((cardInfo, index) => (
          <GettingStartedStep 
            key={index}
            stepNumber={cardInfo.number}
            title={cardInfo.title}
            text={cardInfo.text}
          />
        ))
      }
    </div>
  )
}


export default GettingStartedSteps
