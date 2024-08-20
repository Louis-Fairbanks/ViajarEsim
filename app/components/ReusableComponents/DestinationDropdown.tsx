import Link from 'next/link'
import React from 'react'
import { KeyboardArrowRight } from '@mui/icons-material'

interface Props {
    name: string
}

const DestinationDropdown = ({ name }: Props) => {
    return (
        <Link href={`/${name.replace(/ /g, '-')}`}>
            <div className='flex justify-between items-center border-t-custom py-10'>
                <div className='flex space-x-12 items-center'>
                    <div className='h-32 w-32 border-custom'></div>
                    <div className='flex flex-col space-y-2'>
                        <h2 className='text-left'>{name}</h2>
                        <p className='text-small text-text-faded'>Disfruta de datos ilimitados desde {name}</p>
                    </div>
                </div>
                <KeyboardArrowRight style={{ fill: '#6C85FF' }} />
            </div>
        </Link>
    )
}

export default DestinationDropdown
