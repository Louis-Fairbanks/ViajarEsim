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
                <AppleIcon className={`transition-all duration-300 ease-linear ${selectedDevice === 'iPhone' ? 'text-background' : 'text-light-button-border'}`}></AppleIcon><span>Iphone</span></div>
            <div className={`rounded-custom px-24 py-8 transition-all duration-300 ease-linear flex space-x-8  font-medium cursor-pointer
        ${selectedDevice === 'Samsung' || selectedDevice === 'Google Pixel' ? 'bg-primary text-background' : 'bg-background text-light-button-border'}`}
        onClick={() => {
            setAndroidActive(true)
            setSelectedDevice('Samsung')}}>
                <svg fill={`${selectedDevice != 'iPhone' ? '#fff' : '#c7c7c7'}`} height="24" width="24" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" enableBackground="new 0 0 512 512"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="b75708d097f2188dff6617b0f00f7c43"> <path display="inline" d="M120.606,169h270.788v220.663c0,13.109-10.628,23.737-23.721,23.737h-27.123v67.203 c0,17.066-13.612,30.897-30.415,30.897c-16.846,0-30.438-13.831-30.438-30.897v-67.203h-47.371v67.203 c0,17.066-13.639,30.897-30.441,30.897c-16.799,0-30.437-13.831-30.437-30.897v-67.203h-27.099 c-13.096,0-23.744-10.628-23.744-23.737V169z M67.541,167.199c-16.974,0-30.723,13.963-30.723,31.2v121.937 c0,17.217,13.749,31.204,30.723,31.204c16.977,0,30.723-13.987,30.723-31.204V198.399 C98.264,181.162,84.518,167.199,67.541,167.199z M391.395,146.764H120.606c3.342-38.578,28.367-71.776,64.392-90.998 l-25.746-37.804c-3.472-5.098-2.162-12.054,2.946-15.525c5.102-3.471,12.044-2.151,15.533,2.943l28.061,41.232 c15.558-5.38,32.446-8.469,50.208-8.469c17.783,0,34.672,3.089,50.229,8.476L334.29,5.395c3.446-5.108,10.41-6.428,15.512-2.957 c5.108,3.471,6.418,10.427,2.946,15.525l-25.725,37.804C363.047,74.977,388.055,108.175,391.395,146.764z M213.865,94.345 c0-8.273-6.699-14.983-14.969-14.983c-8.291,0-14.99,6.71-14.99,14.983c0,8.269,6.721,14.976,14.99,14.976 S213.865,102.614,213.865,94.345z M329.992,94.345c0-8.273-6.722-14.983-14.99-14.983c-8.291,0-14.97,6.71-14.97,14.983 c0,8.269,6.679,14.976,14.97,14.976C323.271,109.321,329.992,102.614,329.992,94.345z M444.48,167.156 c-16.956,0-30.744,13.984-30.744,31.222v121.98c0,17.238,13.788,31.226,30.744,31.226c16.978,0,30.701-13.987,30.701-31.226 v-121.98C475.182,181.14,461.458,167.156,444.48,167.156z"> </path> </g> </g></svg><span>Android</span></div>
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
