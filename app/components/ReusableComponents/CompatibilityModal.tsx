'use client'
import React, { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import ButtonLight from './ButtonLight';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import { CompatibleDevices } from '../CompatibleDevices';

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
                    {CompatibleDevices.map((device, index) => {
                        return (
                            <div key={index} className='flex flex-col space-y-16'>
                                <h2 className='font-semibold text-subheading leading-body border-t-custom pt-24'>{device.brand}</h2>
                                <ul className='flex flex-col space-y-8 list-disc pl-24'>
                                    {device.models.map((model, index) => {
                                        return <li key={index}>{model}</li>
                                    })}
                                </ul>
                            </div>
                        )
                    })}
                </div>
            </>}
        </>
    )
}

export default CompatibilityModal
