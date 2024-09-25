import React, { useMemo } from 'react'
import NumberAndStepName from './NumberAndStepName'
import { useInstallation } from './InstallationProvider'
import { useTranslations } from 'next-intl'

type Props = {
    isInstallOrActivateSteps: 'install' | 'activate'
}

const InstallationSteps: React.FC<Props> = ({ isInstallOrActivateSteps }) => {

    const translations = useTranslations('InstallationSteps')
    const { selectedDevice, installationType, currentInstallationStep, currentActivationStep } = useInstallation();

    const currentStep = isInstallOrActivateSteps === 'install' ? currentInstallationStep : currentActivationStep;

    const stepNamesAndNumbersToUse = useMemo(() => {
        if (isInstallOrActivateSteps === 'install') {
            if (selectedDevice === 'iPhone') {
                return installationType === 'QR' ? translations.raw('iPhoneQRInstall') : translations.raw('iPhoneManualInstall');
            } else if (selectedDevice === 'Samsung') {
                return installationType === 'QR' ? translations.raw('samsungQRInstall') : translations.raw('samsungManualInstall');
            } else if (selectedDevice === 'Google Pixel') {
                return installationType === 'QR' ? translations.raw('pixelQRInstall') : translations.raw('pixelManualInstall');
            }
        } else if (isInstallOrActivateSteps === 'activate') {
            if (selectedDevice === 'iPhone') {
                return translations.raw('iPhoneActivate');
            } else if (selectedDevice === 'Samsung') {
                return translations.raw('samsungActivate');
            } else if (selectedDevice === 'Google Pixel') {
                return translations.raw('pixelActivate');
            }
        }
        
        // Default case
        return translations.raw('iPhoneQRInstall');
    }, [isInstallOrActivateSteps, selectedDevice, installationType]);

    return (
        <div className='border-none justify-center md:border-custom flex md:block rounded-custom md:p-24'>
            {stepNamesAndNumbersToUse.map((step : any, index : number) => (
                <NumberAndStepName 
                    key={index} 
                    stepReached={currentStep < parseInt(step.stepNumber)}
                    stepChecked={currentStep > parseInt(step.stepNumber)} 
                    stepName={step.stepName} 
                    stepNumber={step.stepNumber} 
                    lastStep={stepNamesAndNumbersToUse.length}
                />
            ))}
        </div>
    )
}

export default InstallationSteps