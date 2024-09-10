import React, { useEffect, useMemo, useState, useCallback } from 'react'
import Image from 'next/image'
import ButtonDark from '../components/ReusableComponents/ButtonDark'
import InstallationStepsText from './InstallationStepsText'
import { phoneSectionNamesAndNumbers } from './PhoneSwitching'
import { useInstallation } from './InstallationProvider'

type Props = {
    isInstallOrActivateSteps: 'install' | 'activate'
}

const SwitchingPhoneContainer: React.FC<Props> = ({ isInstallOrActivateSteps }) => {
    const {
        selectedDevice, 
        installationType, 
        currentActivationStep, 
        currentInstallationStep, 
        setCurrentInstallationStep, 
        setCurrentActivationStep
    } = useInstallation();

    const [stepToUse, setStepToUse] = useState<number>(
        isInstallOrActivateSteps === 'install' ? currentInstallationStep : currentActivationStep
    );

    useEffect(() => {
        setStepToUse(isInstallOrActivateSteps === 'install' ? currentInstallationStep : currentActivationStep);
    }, [isInstallOrActivateSteps, currentInstallationStep, currentActivationStep]);

    const updateStep = useCallback((newStep: number) => {
        setStepToUse(newStep);
        if (isInstallOrActivateSteps === 'install') {
            setCurrentInstallationStep(newStep);
        } else {
            setCurrentActivationStep(newStep);
        }
    }, [isInstallOrActivateSteps, setCurrentInstallationStep, setCurrentActivationStep]);

    const stepsAndTextToUse = useMemo(() => {
            if (isInstallOrActivateSteps === 'install') {
                if (installationType === 'QR') {
                    if (selectedDevice === 'iPhone') {
                        return phoneSectionNamesAndNumbers.iPhoneQRStepsText;
                    } else if (selectedDevice === 'Samsung') {
                        return phoneSectionNamesAndNumbers.samsungQRStepsText;
                    } else if (selectedDevice === 'Google Pixel') {
                        return phoneSectionNamesAndNumbers.googlePixelQRStepsText;
                    }
                } else if (installationType === 'Manual') {
                    if (selectedDevice === 'iPhone') {
                        return phoneSectionNamesAndNumbers.iPhoneManualStepsText;
                    } else if (selectedDevice === 'Samsung') {
                        return phoneSectionNamesAndNumbers.samsungManualStepsText;
                    } else if (selectedDevice === 'Google Pixel') {
                        return phoneSectionNamesAndNumbers.googlePixelManualStepsText;
                    }
                }
            } else if (isInstallOrActivateSteps === 'activate') {
                if (selectedDevice === 'iPhone') {
                    return phoneSectionNamesAndNumbers.iPhoneActivateStepsText;
                } else if (selectedDevice === 'Samsung') {
                    return phoneSectionNamesAndNumbers.samsungActivateStepsText;
                } else if (selectedDevice === 'Google Pixel') {
                    return phoneSectionNamesAndNumbers.googlePixelActivateStepsText;
                }
            }
            
            // Default case
            return phoneSectionNamesAndNumbers.iPhoneQRStepsText;
    }, [selectedDevice, installationType, isInstallOrActivateSteps]);

    return (
        <div className='border-custom rounded-custom items-center flex flex-col space-y-24 flex-grow'>
            <div className='flex flex-col justify-center items-center relative border-b-2 w-full'>
                <Image className='-z-[1]'
                    src={`/media/installationSteps/${selectedDevice.toLowerCase()}-${installationType.toLowerCase()}-${stepToUse}${isInstallOrActivateSteps === 'activate' ? 'activate': ''}.png`}
                    alt={selectedDevice}
                    width={200}
                    height={500}
                />
                <Image className='absolute -z-[10] bottom-0 left-1/2 -translate-x-1/2'
                    src='/media/background-rectangle.png'
                    alt=''
                    width={300}
                    height={150}
                />
            </div>
            <InstallationStepsText 
                currentStep={stepToUse}
                title={stepsAndTextToUse[stepToUse - 1]?.title || ''}
                textPart1={stepsAndTextToUse[stepToUse - 1]?.textPart1 || ''} 
                textPart2={stepsAndTextToUse[stepToUse - 1]?.textPart2 || ''} 
            />
            <div className='flex space-x-16 pb-16'>
                <ButtonDark 
                    extraClasses={`px-32 py-8 focus:bg-primary active:bg-primary ${stepToUse === 1 ? 'bg-accent text-text-faded hover:bg-accent active:bg-accent focus:bg-accent' : ''}`}  
                    onClick={() => updateStep(Math.max(1, stepToUse - 1))}
                    deactivated={stepToUse === 1}
                >
                    Paso Anterior
                </ButtonDark>
                <ButtonDark 
                    extraClasses={`px-32 py-8 focus:bg-primary active:bg-primary ${stepToUse === stepsAndTextToUse.length ? 'bg-accent text-text-faded hover:bg-accent active:bg-accent focus:bg-accent' : ''}`} 
                    onClick={() => updateStep(Math.min(stepsAndTextToUse.length, stepToUse + 1))}
                    deactivated={stepToUse === stepsAndTextToUse.length}
                >
                    Siguiente Paso
                </ButtonDark>
            </div>
        </div>
    )
}

export default SwitchingPhoneContainer;