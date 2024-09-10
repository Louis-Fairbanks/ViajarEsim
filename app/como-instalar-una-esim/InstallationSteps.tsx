import React, { useMemo } from 'react'
import NumberAndStepName from './NumberAndStepName'
import { stepNamesAndNumbers } from './Info'
import { useInstallation } from './InstallationProvider'

type Props = {
    isInstallOrActivateSteps: 'install' | 'activate'
}

const InstallationSteps: React.FC<Props> = ({ isInstallOrActivateSteps }) => {
    const { selectedDevice, installationType, currentInstallationStep, currentActivationStep } = useInstallation();

    const currentStep = isInstallOrActivateSteps === 'install' ? currentInstallationStep : currentActivationStep;

    const stepNamesAndNumbersToUse = useMemo(() => {
        if (isInstallOrActivateSteps === 'install') {
            if (selectedDevice === 'iPhone') {
                return installationType === 'QR' ? stepNamesAndNumbers.iPhoneQRInstall : stepNamesAndNumbers.iPhoneManualInstall;
            } else if (selectedDevice === 'Samsung') {
                return installationType === 'QR' ? stepNamesAndNumbers.samsungQRInstall : stepNamesAndNumbers.samsungManualInstall;
            } else if (selectedDevice === 'Google Pixel') {
                return installationType === 'QR' ? stepNamesAndNumbers.pixelQRInstall : stepNamesAndNumbers.pixelManualInstall;
            }
        } else if (isInstallOrActivateSteps === 'activate') {
            if (selectedDevice === 'iPhone') {
                return stepNamesAndNumbers.iPhoneActivate;
            } else if (selectedDevice === 'Samsung') {
                return stepNamesAndNumbers.samsungActivate;
            } else if (selectedDevice === 'Google Pixel') {
                return stepNamesAndNumbers.pixelActivate;
            }
        }
        
        // Default case
        return stepNamesAndNumbers.iPhoneQRInstall;
    }, [isInstallOrActivateSteps, selectedDevice, installationType]);

    return (
        <div className='border-custom rounded-custom p-24'>
            {stepNamesAndNumbersToUse.map((step, index) => (
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