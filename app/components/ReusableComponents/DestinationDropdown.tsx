'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import { KeyboardArrowRight } from '@mui/icons-material'
import Image from 'next/image'
import { useShopping } from '../ShoppingContext/ShoppingContext'

interface Props {
    name: string
    imgurl: string
}

const DestinationDropdown = ({ name, imgurl }: Props) => {

    const { setOpenedSidebar } = useShopping()

    const newImgUrl = imgurl.slice(0, -6) + 'chico';
    const [imageLoaded, setImageLoaded] = useState<boolean>(false);

    return (
        <Link href={`/${name.toLowerCase().replace(/ /g, '-')}`} onClick={() => setOpenedSidebar('')}>
            <div className='flex justify-between items-center border-t-custom py-10'>
                <div className='flex space-x-0 sm:space-x-12 items-center h-32'>
                    <img className='hidden' src={`${newImgUrl}`} alt={name} onLoad={() => setImageLoaded(true)} />
                    <div className='hidden sm:block w-32 h-32 relative'>
                        <Image fill src={`${newImgUrl}`} alt={name} onLoad={() => setImageLoaded(true)} />
                    </div>
                    {imageLoaded && <div className='flex flex-col'>
                        <h2 className='text-left'>{name}</h2>
                        <p className='text-small text-text-faded'>Disfruta de datos ilimitados desde {name}</p>
                    </div>}
                </div>
                <KeyboardArrowRight style={{ fill: '#6C85FF' }} />
            </div>
        </Link>
    )
}

export default DestinationDropdown
