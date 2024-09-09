import React, { useEffect, useState } from 'react'
import NumberAndStepName from './NumberAndStepName'
import { stepNamesAndNumbers } from './Info'

type Props = {
    currentStep: number
    selectedDevice : string
    installationType: string
    isInstallOrActivateSteps: string
}

const InstallationSteps = ({currentStep, installationType, selectedDevice, isInstallOrActivateSteps} : Props) => {

    const [stepNamesAndNumbersToUse, setStepNamesAndNumbersToUse] = useState(stepNamesAndNumbers.iPhoneQRInstall)

    useEffect(() => {
        console.log('these are the steps', currentStep, installationType, selectedDevice, isInstallOrActivateSteps)
        if(isInstallOrActivateSteps === 'install'){
            console.log('were changing because its the install section')
            if(selectedDevice === 'iPhone'){
                if(installationType === 'QR'){
                    setStepNamesAndNumbersToUse(stepNamesAndNumbers.iPhoneQRInstall)
                }
                else if(installationType === 'Manual'){
                    setStepNamesAndNumbersToUse(stepNamesAndNumbers.iPhoneManualInstall)
                }
            }
            else if(selectedDevice ==='Samsung'){
                if(installationType === 'QR'){
                    setStepNamesAndNumbersToUse(stepNamesAndNumbers.samsungQRInstall)
                }
                else if(installationType === 'Manual'){
                    setStepNamesAndNumbersToUse(stepNamesAndNumbers.samsungManualInstall)
                }
            }
            else if(selectedDevice === 'Google Pixel'){
                if(installationType === 'QR'){
                    setStepNamesAndNumbersToUse(stepNamesAndNumbers.pixelQRInstall)
                }
                else if(installationType === 'Manual'){
                    setStepNamesAndNumbersToUse(stepNamesAndNumbers.pixelManualInstall)
                }
            }
        }
        else if(isInstallOrActivateSteps === 'activate'){
            console.log('were part of the activate section')
            if(selectedDevice === 'iPhone'){
                setStepNamesAndNumbersToUse(stepNamesAndNumbers.iPhoneActivate)
            }
            else if(selectedDevice ==='Samsung'){
                setStepNamesAndNumbersToUse(stepNamesAndNumbers.samsungActivate)
            }
            else if(selectedDevice === 'Google Pixel'){
                setStepNamesAndNumbersToUse(stepNamesAndNumbers.pixelActivate)
            }
        }
    }, [isInstallOrActivateSteps, selectedDevice, installationType])

  return (
    <div className='border-custom rounded-custom p-24'>
      {
        stepNamesAndNumbersToUse.map((step, index) => {
            return <NumberAndStepName key={index} stepReached={currentStep < parseInt(step.stepNumber)}
            stepChecked={currentStep > parseInt(step.stepNumber)} stepName={step.stepName} stepNumber={step.stepNumber} lastStep={stepNamesAndNumbersToUse.length}/>
        })
      }
    </div>
  )
}

export default InstallationSteps