'use client'
import React, { useEffect, useState } from 'react'
import SectionHeader from '../components/ReusableComponents/SectionHeader'
import PreferredInstallation from './PreferredInstallation'
import KeepInMind from './KeepInMind'
import LetsStart from './LetsStart'
import PlanReadyToInstall from './PlanReadyToInstall'
import MovingStepsSection from './MovingStepsSection'
import { useInstallation } from './InstallationProvider'
import VerifyInstallation from './VerifyInstallation'
import { useTranslations } from 'next-intl'

const BeginInstallation = () => {

    const [installation, setInstallation] = useState<string>('')
    const translations = useTranslations('BeginInstallation')
    const movingStepsTranslations = useTranslations('MovingStepsSection')

    const { installationType } = useInstallation()

    useEffect(() => {
        setInstallation(installationType)
    }, [])
    return (
        <>
            <div className='p-24 sm:p-64 flex flex-col space-y-24 items-center'>
                <SectionHeader header={translations('subheading')} title={translations('heading')} />
                <PreferredInstallation />
                <KeepInMind />
                <div className='h-1 bg-accent w-full translate-y-32'></div>
            </div>
            <LetsStart />
            <MovingStepsSection isInstallOrActivateSteps='install'
                sectionHeader={`${movingStepsTranslations('guiaDeInstalacion')} ${installationType === 'QR' ? movingStepsTranslations('conCodigo') : movingStepsTranslations('manualmente')}`} sectionTitle={movingStepsTranslations('title')} />
            <PlanReadyToInstall />
            <div id='activationSection'>
                <MovingStepsSection isInstallOrActivateSteps='activate'
                    sectionHeader={movingStepsTranslations('comoActivar')} sectionTitle={movingStepsTranslations('title')} />
            </div>
            <VerifyInstallation />
        </>
    )
}

export default BeginInstallation
