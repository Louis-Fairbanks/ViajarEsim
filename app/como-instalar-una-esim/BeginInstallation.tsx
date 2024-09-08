'use client'
import React, { useState } from 'react'
import SectionHeader from '../components/ReusableComponents/SectionHeader'
import PreferredInstallation from './PreferredInstallation'
import KeepInMind from './KeepInMind'
import LetsStart from './LetsStart'

const BeginInstallation = () => {

    const [installationMethod, setInstallationMethod] = useState<string>('QR')

    return (
        <>
        <div className='p-24 sm:p-64 flex flex-col space-y-24 items-center'>
            <SectionHeader header='¿Como prefieres instalar la eSIM?' title='TIPO DE INSTALACIÓN' />
            <PreferredInstallation installationMethod={installationMethod} setInstallationMethod={setInstallationMethod}/>
            <KeepInMind installationMethod={installationMethod}/>
            <div className='h-1 bg-accent w-full translate-y-32'></div>
        </div>
        <LetsStart installationMethod={installationMethod}/>
        </>
    )
}

export default BeginInstallation
