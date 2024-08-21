'use client'
import React, { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import ButtonLight from './ButtonLight';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';

const CompatibilityModal = () => {

    const [modalClicked, setModalClicked] = useState<Boolean>(false)

    return (
        <>
            <ButtonLight extraClasses='p-12' onClick={() => setModalClicked(true)}><PhoneIphoneIcon className='mr-8' />
                Verificar compatibilidad</ButtonLight>
            {modalClicked && <>
                <div className='fixed h-screen w-screen left-0 top-0 bg-text bg-opacity-60 z-10'
                onClick={() => setModalClicked(false)}></div>
                <div className='flex flex-col p-24 rounded-custom space-y-24 fixed left-1/2 top-1/2 
    bg-background z-50 w-1/3 h-3/4 overflow-y-auto -translate-x-1/2 -translate-y-1/2'>
                    <div className='flex justify-between items-center'>
                        <h1 className='font-medium text-heading leading-body'>Dispositivos compatibles</h1>
                        <CloseIcon className='cursor-pointer' onClick={() => setModalClicked(false)}></CloseIcon>
                    </div>

                    <div className='flex flex-col space-y-16'>
                        <h2 className='font-semibold text-subheading leading-body border-t-custom pt-24'>Apple</h2>
                        <ul className='flex flex-col space-y-8 list-disc pl-24'>
                            <li>iPhone 15 / 15 Plus / 15 Pro / 15 Pro Max</li>
                            <li>iPhone 14 / 14 Plus / 14 Pro / 14 Pro Max</li>
                            <li>iPhone 13 / 13 mini / 13 Pro / 13 Pro Max</li>
                            <li>iPhone 12 / 12 mini / 12 Pro / 12 Pro Max</li>
                            <li>iPhone 11 / 11 Pro / 11 Pro Max</li>
                            <li>iPhone XS / XS Max</li>
                            <li>iPhone XR</li>
                            <li>iPhone SE (2020, 2022)</li>
                        </ul>
                    </div>

                    <div className='flex flex-col space-y-16'>
                        <h2 className='font-semibold text-subheading leading-body border-t-custom pt-24'>Samsung</h2>
                        <ul className='flex flex-col space-y-8 list-disc pl-24'>
                            <li>Galaxy S23 / S23+ / S23 Ultra</li>
                            <li>Galaxy S22 / S22+ / S22 Ultra</li>
                            <li>Galaxy S21 / S21+ / S21 Ultra</li>
                            <li>Galaxy S20 / S20+ / S20 Ultra</li>
                            <li>Galaxy Note 20 / Note 20 Ultra</li>
                            <li>Galaxy Z Flip3 / Z Flip4</li>
                            <li>Galaxy Z Fold3 / Z Fold4</li>
                        </ul>
                    </div>

                    <div className='flex flex-col space-y-16'>
                        <h2 className='font-semibold text-subheading leading-body border-t-custom pt-24'>Google</h2>
                        <ul className='flex flex-col space-y-8 list-disc pl-24'>
                            <li>Pixel 8 / 8 Pro</li>
                            <li>Pixel 7 / 7 Pro</li>
                            <li>Pixel 6 / 6 Pro</li>
                            <li>Pixel 5</li>
                            <li>Pixel 4 / 4 XL</li>
                            <li>Pixel 3a / 3a XL</li>
                            <li>Pixel 3 / 3 XL</li>
                        </ul>
                    </div>

                    <div className='flex flex-col space-y-16'>
                        <h2 className='font-semibold text-subheading leading-body border-t-custom pt-24'>Huawei</h2>
                        <ul className='flex flex-col space-y-8 list-disc pl-24'>
                            <li>P40 / P40 Pro / P40 Pro+</li>
                            <li>Mate 40 Pro</li>
                            <li>P50 / P50 Pro</li>
                        </ul>
                    </div>
                </div>
            </>}
        </>
    )
}

export default CompatibilityModal
