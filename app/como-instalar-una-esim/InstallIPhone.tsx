'use client'
import React, { useState } from 'react'
import SectionHeader from '../components/ReusableComponents/SectionHeader'
import InstallationSteps from './InstallationSteps'
import SwitchingPhoneContainer from './SwitchingPhoneContainer'

const InstallIPhone = () => {

    const [currentStep, setCurrentStep] = useState<number>(1)

    return (
        <div className='flex flex-col space-y-48 p-24 sm:p-64'>
            <SectionHeader title='GUÍA' header='Guía de instalación de tu eSIM con código QR' />
            <div className='flex space-x-48'>      
                <InstallationSteps currentStep={currentStep} />
                <SwitchingPhoneContainer currentStep={currentStep} setCurrentStep={setCurrentStep} />
            </div>
        </div>
    )
}

export default InstallIPhone
