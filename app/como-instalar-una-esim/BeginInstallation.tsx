'use client'
import React, { useEffect, useState } from 'react'
import SectionHeader from '../components/ReusableComponents/SectionHeader'
import PreferredInstallation from './PreferredInstallation'
import KeepInMind from './KeepInMind'
import LetsStart from './LetsStart'
import PlanReadyToInstall from './PlanReadyToInstall'
import MovingStepsSection from './MovingStepsSection'
import { useInstallation } from './InstallationProvider'
import { Verify } from 'crypto'
import VerifyInstallation from './VerifyInstallation'

const BeginInstallation = () => {

    const [installation, setInstallation] = useState<string>('')

    const { installationType } = useInstallation()

    useEffect(() => {
        setInstallation(installationType)
    }, [])
    return (
        <>
        <div className='p-24 sm:p-64 flex flex-col space-y-24 items-center'>
            <SectionHeader header='¿Como prefieres instalar la eSIM?' title='TIPO DE INSTALACIÓN' />
            <PreferredInstallation/>
            <KeepInMind/>
            <div className='h-1 bg-accent w-full translate-y-32'></div>
        </div>
        <LetsStart/>
        <MovingStepsSection isInstallOrActivateSteps='install'
      sectionHeader={`Guía de instalación de tu eSIM ${installationType === 'QR' ? 'con código QR' : 'manualmente'}`} sectionTitle='GUÍA'/>
        <PlanReadyToInstall/> 
        <MovingStepsSection  isInstallOrActivateSteps='activate'
                sectionHeader='Como activar tu eSIM' sectionTitle='GUÍA'/>
        <VerifyInstallation/>
        </>
    )
}

export default BeginInstallation
