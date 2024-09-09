'use client'
import React, { useState } from 'react'
import AppleIcon from '@mui/icons-material/Apple';
import Image from 'next/image';
import { useInstallation } from './InstallationProvider';

const PhoneSwitcher = () => {

    const {selectedDevice, setSelectedDevice} = useInstallation()
    const [androidActive, setAndroidActive] = useState<boolean>(false)

    return (
        <>
        <div className='border-custom rounded-custom p-8 flex space-x-8 w-fit'>
            <div className={`rounded-custom px-24 py-8 transition-all duration-300 ease-linear flex space-x-8 font-medium cursor-pointer
        ${selectedDevice === 'iPhone' ? 'bg-primary text-background' : 'bg-background text-light-button-border'}`}
        onClick={() => {
            setSelectedDevice('iPhone')
            setAndroidActive(false)
        }}>
                <AppleIcon className={`transition-all duration-300 ease-linear ${selectedDevice === 'Iphone' ? 'text-background' : 'text-light-button-border'}`}></AppleIcon><span>Iphone</span></div>
            <div className={`rounded-custom px-24 py-8 transition-all duration-300 ease-linear flex space-x-8  font-medium cursor-pointer
        ${selectedDevice === 'Samsung' || selectedDevice === 'Google Pixel' ? 'bg-primary text-background' : 'bg-background text-light-button-border'}`}
        onClick={() => {
            setAndroidActive(true)
            setSelectedDevice('Samsung')}}>
                <Image src='/media/email/android-svgrepo-com 1.png' alt='android' height={24} width={24}/><span>Android</span></div>
        </div>
        {<div className={`flex space-x-8 h-fit mt-0 transition-all duration-300 ease-linear my-0 ${androidActive ? 'opacity-100' : 'opacity-0'}`}>
            <button className={`rounded-64 px-24 py-8 transition-all duration-300 ease-linear
             ${selectedDevice === 'Samsung' ? 'bg-primary text-background' : 'border-custom text-text-faded'} `} onClick={() => setSelectedDevice('Samsung')}>Samsung</button>
            <button className={`rounded-64 px-24 py-8 transition-all duration-300 ease-linear
            ${selectedDevice === 'Google Pixel' ? 'bg-primary text-background' : 'border-custom text-text-faded'}`} onClick={() => setSelectedDevice('Google Pixel')}>Google Pixel</button>
            </div>}
        </>
    )
}

export default PhoneSwitcher
