import React, { useMemo } from 'react'
import Image from 'next/image'
import ButtonDark from '../components/ReusableComponents/ButtonDark'
import InstallationStepsText from './InstallationStepsText'
import { phoneSectionNamesAndNumbers } from './PhoneSwitching'

type Props = {
    currentStep: number
    setCurrentStep: React.Dispatch<React.SetStateAction<number>>
    selectedDevice: string
    installationType: string
    isInstallOrActivateSteps: string
}

const SwitchingPhoneContainer = ({ 
    currentStep, 
    setCurrentStep, 
    selectedDevice, 
    installationType, 
    isInstallOrActivateSteps 
}: Props) => {

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
                    src={`/media/installationSteps/${selectedDevice.toLowerCase()}-${installationType.toLowerCase()}-${currentStep}${isInstallOrActivateSteps === 'activate' ? 'activate': ''}.png`}
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
                currentStep={currentStep} 
                title={stepsAndTextToUse[currentStep - 1]?.title || ''}
                textPart1={stepsAndTextToUse[currentStep - 1]?.textPart1 || ''} 
                textPart2={stepsAndTextToUse[currentStep - 1]?.textPart2 || ''} 
            />
            <div className='flex space-x-16 pb-16'>
                <ButtonDark 
                    extraClasses='px-32 py-8' 
                    onClick={() => setCurrentStep(prevState => prevState - 1)} 
                    deactivated={currentStep === 1}
                >
                    Paso Anterior
                </ButtonDark>
                <ButtonDark 
                    extraClasses='px-32 py-8' 
                    onClick={() => setCurrentStep(prevState => prevState + 1)} 
                    deactivated={currentStep === stepsAndTextToUse.length}
                >
                    Siguiente Paso
                </ButtonDark>
            </div>
        </div>
    )
}

export default SwitchingPhoneContainer;