'use client'
import React from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { CompatibleDevices } from '../CompatibleDevices';

interface Props {
    modalClicked: boolean
    setModalClicked: React.Dispatch<React.SetStateAction<boolean>>
    extraClassesOverlay? : string
    extraClassesModal? : string
}

const CompatibilityModal = ( {modalClicked, setModalClicked, extraClassesModal, extraClassesOverlay} : Props) => {
    return (
        <>
            {modalClicked && <>
                <div className={`fixed h-screen w-screen left-0 top-0 bg-text bg-opacity-60 z-10 ${extraClassesOverlay}`}
                onClick={() => setModalClicked(false)}></div>
                <div className={`flex flex-col p-24 rounded-custom space-y-24 fixed left-1/2 top-24 lg:top-1/2 
    bg-background z-50 w-3/4 lg:w-1/2 h-2/3 lg:h-3/4 overflow-y-auto -translate-x-1/2 lg:-translate-y-1/2 ${extraClassesModal}`}>
            <CloseIcon className='cursor-pointer sticky top-2 left-full -mb-48' onClick={() => setModalClicked(false)}></CloseIcon>
            <h1 className='font-medium text-heading leading-body'>Dispositivos compatibles</h1>
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
