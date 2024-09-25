'use client';
import React from 'react'
import { KeyboardArrowRight } from '@mui/icons-material';

interface Props {
    ctaText: string
    color? : string
}

const GoNow = (props: Props) => {
    return (
        <div className='flex space-x-8'>
            <p className={`${props.color ? `${props.color} font-medium`: 'text-primary font-semibold'} `}>
            {props.ctaText}</p><KeyboardArrowRight className={`${props.color ? props.color : 'text-primary'}`}/>
        </div>
    )
}

export default GoNow