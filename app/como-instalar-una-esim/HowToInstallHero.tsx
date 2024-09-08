'use client'
import React, { useState } from 'react'
import PhoneSwitcher from './PhoneSwitcher'
import ScrollDownButton from '../acerca-de-nosotros/ScrollDownButton'
import InstallationCards from './InstallationCards'


const HowToInstallHero = () => {

    const [selectedDevice, setSelectedDevice] = useState<string>('Iphone')

    return (
        <div className='flex flex-col space-y-32 p-24 sm:px-64 sm:py-32 justify-center text-center items-center'>
            <h1 className='font-medium text-hero leading-body'>Instala y activa tu eSIM en {selectedDevice}</h1>
            <p>Primero, selecciona el dispositivo en el que vas a hacer el proceso</p>
            <PhoneSwitcher selectedDevice={selectedDevice} setSelectedDevice={setSelectedDevice} />
            <InstallationCards />
            {/* <ScrollDownButton/> */}
        </div>
    )
}

export default HowToInstallHero
