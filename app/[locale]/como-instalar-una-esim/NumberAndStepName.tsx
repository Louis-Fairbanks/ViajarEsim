import React from 'react'
import CheckIcon from '@mui/icons-material/Check';

type Props = {
    stepNumber: string,
    stepName: string
    lastStep : number
    stepChecked: boolean
    stepReached: boolean
}

const NumberAndStepName = ({ stepNumber, stepName, lastStep, stepChecked, stepReached }: Props) => {
    return (
        <div className='flex flex-col md:flex-row md:space-x-16'>
            <div className='flex flex-row lg:flex-col items-center cursor-pointer'>
                <div className={`w-32 h-32 flex justify-center items-center rounded-full font-medium
                transition-all duration-300 ease-linear ${stepChecked ? 'bg-success text-background': stepReached ? 'bg-none border-custom text-accent'  : 'bg-primary text-background'}`}>
                    {stepChecked ? <CheckIcon style={{color: 'white'}}/> : stepNumber}</div>
                {lastStep.toString() != stepNumber && <div className={`w-12 sm:w-32 h-1 lg:w-1 lg:h-32
                transition-all duration-300 ease-linear ${stepChecked ? 'bg-success': stepReached ? 'bg-accent' : 'bg-primary'}`}></div>}
            </div>
            <span className='font-medium mb-32 whitespace-nowrap hidden md:block'>{stepName}</span>
        </div>
    )
}

export default NumberAndStepName
