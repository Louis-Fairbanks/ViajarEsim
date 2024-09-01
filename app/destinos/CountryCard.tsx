'use client'
import React from 'react'
import GoNow from '../components/HomeSections/GoNow'
import Image from 'next/image'

interface Props {
    region: string
    min_price: string
    imgPath: string
    category: string
}

const CountryCard = (props: Props) => {

    const firstLetterOfRegion = props.region.charAt(0).toUpperCase()
    const priceNoZeros = parseFloat(Number(props.min_price).toFixed(2)).toLocaleString('es-ES', { minimumFractionDigits: 2 });

    return (
        <div className={`flex flex-col px-24 pt-0 pb-24 border-custom rounded-custom transition-all duration-300 ease-linear
         space-y-24 h-full relative overflow-hidden hover:border-text-faded cursor-pointer active:border-card-pressed
        ${props.category === firstLetterOfRegion ? 'hidden' : ''}`}>
            <div className='h-128 relative scale-125'>
                <Image
                    src={props.imgPath}
                    alt={`${props.region} landscape`}
                    fill
                    style={{ objectFit: 'cover' }}
                />
            </div>
            <div className='flex flex-col justify-between pb-64'>
                <div className='flex flex-col space-y-12 mb-32'>
                    <h2 className='font-medium text-heading leading-body'>{props.region}</h2>
                    <p>Desde ${priceNoZeros} <span className='text-text-faded text-small'>USD</span></p>
                </div>
                <GoNow ctaText='Ir ahora'/>
            </div>
            <div className='absolute w-full h-128 left-0 -bottom-48 scale-y-200'>
                <Image className='rotate-180'
                    src='/media/rectangle 8.svg'
                    alt=''
                    fill={true}
                />
            </div>
        </div>
    )
}

export default CountryCard
