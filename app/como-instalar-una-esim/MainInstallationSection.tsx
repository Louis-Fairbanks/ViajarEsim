'use client'
import React from 'react'
import HowToInstallHero from './HowToInstallHero'
import { InstallationProvider } from './InstallationProvider'
import BeginInstallation from './BeginInstallation'

const MainInstallationSection = () => {
  return (

    <InstallationProvider>
      <div>
        <HowToInstallHero />
        <BeginInstallation/>
      </div>
    </InstallationProvider>
  )
}

export default MainInstallationSection
