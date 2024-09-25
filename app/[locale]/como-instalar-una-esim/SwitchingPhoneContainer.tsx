import React, { useEffect, useMemo, useState, useCallback } from 'react'
import Image from 'next/image'
import ButtonDark from '../components/ReusableComponents/ButtonDark'
import InstallationStepsText from './InstallationStepsText'
import { useInstallation } from './InstallationProvider'
import { useTranslations } from 'next-intl'

type Props = {
    isInstallOrActivateSteps: 'install' | 'activate'
}

const SwitchingPhoneContainer: React.FC<Props> = ({ isInstallOrActivateSteps }) => {

    const translations = useTranslations('SwitchingPhoneContainer')

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
                    return translations.raw('iPhoneQRStepsText');
                } else if (selectedDevice === 'Samsung') {
                    return translations.raw('samsungQRStepsText');
                } else if (selectedDevice === 'Google Pixel') {
                    return translations.raw('googlePixelQRStepsText');
                }
            } else if (installationType === 'Manual') {
                if (selectedDevice === 'iPhone') {
                    return translations.raw('iPhoneManualStepsText');
                } else if (selectedDevice === 'Samsung') {
                    return translations.raw('samsungManualStepsText');
                } else if (selectedDevice === 'Google Pixel') {
                    return translations.raw('googlePixelManualStepsText');
                }
            }
        } else if (isInstallOrActivateSteps === 'activate') {
            if (selectedDevice === 'iPhone') {
                return translations.raw('iPhoneActivateStepsText');
            } else if (selectedDevice === 'Samsung') {
                return translations.raw('samsungActivateStepsText');
            } else if (selectedDevice === 'Google Pixel') {
                return translations.raw('googlePixelActivateStepsText');
            }
        }

        // Default case
        return translations.raw('iPhoneQRStepsText');
    }, [selectedDevice, installationType, isInstallOrActivateSteps]);

    return (
        <div className='border-custom rounded-custom items-center flex flex-col space-y-24 flex-grow'>
            <div className='flex flex-col justify-center items-center relative border-b-2 w-full min-h-256 h-2/3'>
                <div className='w-full md:w-256 md:relative md:h-full'>
                    <Image
                        src={`/media/installationSteps/${selectedDevice.toLowerCase()}-${installationType.toLowerCase()}-${stepToUse}${isInstallOrActivateSteps === 'activate' ? 'activate' : ''}.png`}
                        alt={selectedDevice}
                        fill
                        style={{objectFit: 'contain'}}
                    />
                </div>
                <Image className='absolute -z-[1] bottom-0 left-1/2 -translate-x-1/2'
                    src='/media/background-rectangle.png'
                    alt=''
                    width={350}
                    height={175}
                />
            </div>
            <div className='flex flex-col space-y-12 items-center p-12'>
                <InstallationStepsText
                    currentStep={stepToUse}
                    title={stepsAndTextToUse[stepToUse - 1]?.title || ''}
                    textPart1={stepsAndTextToUse[stepToUse - 1]?.textPart1 || ''}
                    textPart2={stepsAndTextToUse[stepToUse - 1]?.textPart2 || ''}
                />
                <div className='flex space-x-16 pb-12'>
                    <ButtonDark key={`anterior-${stepToUse}-${stepToUse === 1 ? 'accent' : 'primary'}`}
                        extraClasses={`px-32 py-8 ${stepToUse === 1 ? 'bg-accent text-text-faded' : 'hover:bg-accent focus:bg-primary'} active:bg-accent`}
                        onClick={() => updateStep(Math.max(1, stepToUse - 1))}
                        deactivated={stepToUse === 1}
                    >
                        {translations('pasoAnterior')}
                    </ButtonDark>
                    <ButtonDark key={`siguiente-${stepToUse}-${stepToUse === stepsAndTextToUse.length ? 'accent' : 'primary'}`}
                        extraClasses={`px-32 py-8 ${stepToUse === stepsAndTextToUse.length ? 'bg-accent text-text-faded' : 'hover:bg-accent focus:bg-primary'} active:bg-accent`}
                        onClick={() => updateStep(Math.min(stepsAndTextToUse.length, stepToUse + 1))}
                        deactivated={stepToUse === stepsAndTextToUse.length}
                    >
                        {translations('pasoSiguiente')}
                    </ButtonDark>
                </div>
            </div>
        </div>
    )
}

export default SwitchingPhoneContainer;