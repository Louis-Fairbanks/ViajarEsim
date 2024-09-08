import React from 'react'
import AppleIcon from '@mui/icons-material/Apple';
import Image from 'next/image';

type Props = {
    selectedDevice: string
    setSelectedDevice: React.Dispatch<React.SetStateAction<string>>
}

const PhoneSwitcher = ({ selectedDevice, setSelectedDevice }: Props) => {
    return (
        <div className='border-custom rounded-custom p-8 flex space-x-8 w-1/4'>
            <div className={`rounded-custom px-24 py-8 transition-all duration-300 ease-linear flex space-x-8 font-medium cursor-pointer
        ${selectedDevice === 'Iphone' ? 'bg-primary text-background' : 'bg-background text-light-button-border'}`}
        onClick={() => setSelectedDevice('Iphone')}>
                <AppleIcon className={`transition-all duration-300 ease-linear ${selectedDevice === 'Iphone' ? 'text-background' : 'text-light-button-border'}`}></AppleIcon><span>Iphone</span></div>
            <div className={`rounded-custom px-24 py-8 transition-all duration-300 ease-linear flex space-x-8  font-medium cursor-pointer
        ${selectedDevice === 'Android' ? 'bg-primary text-background' : 'bg-background text-light-button-border'}`}
        onClick={() => setSelectedDevice('Android')}>
                <Image src='/media/email/android-svgrepo-com 1.png' alt='android' height={24} width={24}/><span>Android</span></div>
        </div>
    )
}

export default PhoneSwitcher
