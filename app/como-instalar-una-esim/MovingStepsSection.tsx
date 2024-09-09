'use client'
import React, { useState, useEffect } from 'react'
import SectionHeader from '../components/ReusableComponents/SectionHeader'
import InstallationSteps from './InstallationSteps'
import SwitchingPhoneContainer from './SwitchingPhoneContainer'
import { useInstallation } from './InstallationProvider'

type Props = {
    sectionTitle: string;
    sectionHeader: string;
    isInstallOrActivateSteps: string;
}

const MovingStepsSection = ({ sectionTitle, sectionHeader, isInstallOrActivateSteps} : Props) => {
    const [currentStep, setCurrentStep] = useState<number>(1)
    const {selectedDevice, installationType} = useInstallation()

    useEffect(() => {
        console.log('MovingStepsSection re-rendered');
        console.log('Selected Device:', selectedDevice);
        console.log('Installation Type:', installationType);
    }, [selectedDevice, installationType]);

    return (
        <div className='flex flex-col space-y-48 p-24 sm:p-64'>
            <SectionHeader title={sectionTitle} header={sectionHeader} />
            <div className='flex space-x-48'>      
                <InstallationSteps 
                    currentStep={currentStep} 
                    selectedDevice={selectedDevice} 
                    installationType={installationType} 
                    isInstallOrActivateSteps={isInstallOrActivateSteps}
                />
                <SwitchingPhoneContainer 
                    currentStep={currentStep} 
                    setCurrentStep={setCurrentStep}
                    selectedDevice={selectedDevice} 
                    installationType={installationType} 
                    isInstallOrActivateSteps={isInstallOrActivateSteps} 
                />
            </div>
        </div>
    )
}

export default MovingStepsSection