'use client'
import React, { useState } from 'react'
import PhoneSwitcher from './PhoneSwitcher'
import ScrollDownButton from '../acerca-de-nosotros/ScrollDownButton'
import InstallationCards from './InstallationCards'
import { useInstallation } from './InstallationProvider'
import { useTranslations } from 'next-intl'

const HowToInstallHero = () => {

    const translations = useTranslations('HowToInstallHero')

const { selectedDevice} = useInstallation()
    return (
        <div className='flex flex-col space-y-12 p-24 sm:px-64 sm:py-32 justify-center text-center items-center'>
            <h1 className='font-medium text-hero leading-body'>{translations('heading')}{selectedDevice}</h1>
            <p>{translations('subheading')}</p>
            <PhoneSwitcher />
            <InstallationCards />
            {/* <ScrollDownButton/> */}
        </div>
    )
}

export default HowToInstallHero
