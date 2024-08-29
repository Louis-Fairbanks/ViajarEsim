'use client';
import React from 'react'
import { KeyboardArrowRight } from '@mui/icons-material';


interface Props {
    ctaText: string
}

const GoNow = (props: Props) => {
    return (
        <div className='flex space-x-8'>
            <p className='text-primary font-semibold'>{props.ctaText}</p><KeyboardArrowRight style={{ fill: '#6C85FF' }} />
        </div>
    )
}

export default GoNow
