'use client';
import React from 'react'
import dynamic from 'next/dynamic'

const KeyboardArrowRight = dynamic(() => import('@mui/icons-material/KeyboardArrowRight'), { ssr: false });

interface Props {
    ctaText : string
}

const GoNow = (props : Props) => {
    return (
            <div className='flex space-x-8'>
                <p className='text-primary font-semibold'>{props.ctaText}</p><KeyboardArrowRight style={{ fill: '#6C85FF' }} />
            </div>
    )
}

export default GoNow
