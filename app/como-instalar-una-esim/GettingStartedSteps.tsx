'use client'
import React, { useEffect, useState } from 'react'
import GettingStartedStep from './GettingStartedStep'
import { useInstallation } from './InstallationProvider'
import { gettingStartedTexts } from './GettingStartedTexts'

type CardInfo = {
  number: string
  title: string
  text: string
}


const GettingStartedSteps = () => {
  const { installationType, selectedDevice } = useInstallation()

  const [gettingStartTextsToUse, setGettingStartTextsToUse] = useState<CardInfo[]>([])

  useEffect(() => {
    if(selectedDevice === 'iPhone'){
      if(installationType === 'QR'){
        setGettingStartTextsToUse(gettingStartedTexts.iPhoneQRCards)
      }
      else if(installationType === 'Manual'){
        setGettingStartTextsToUse(gettingStartedTexts.iPhoneManualCards)
      }
    }
    else if(selectedDevice ==='Samsung'){
      if(installationType === 'QR'){
        setGettingStartTextsToUse(gettingStartedTexts.samsungQRCards)
      }
      else if(installationType === 'Manual'){
        setGettingStartTextsToUse(gettingStartedTexts.samsungManualCards)
      }
    }
    else if(selectedDevice === 'Google Pixel'){
      if(installationType === 'QR'){
        setGettingStartTextsToUse(gettingStartedTexts.pixelQRCards)
      }
      else if(installationType === 'Manual'){
        setGettingStartTextsToUse(gettingStartedTexts.pixelManualCards)
      }
    }
  }, [selectedDevice, installationType])

  return (
    <div className='grid grid-cols-3 gap-x-48'>
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
