'use client'
import React from 'react'
import GoNow from '../components/HomeSections/GoNow'
import Image from 'next/image'
import { get } from 'http'

interface Props {
    region: string
    min_price: string
    imgPath: string
    category: string
}

const CountryCard = (props: Props) => {

    const firstLetterOfRegion = props.region.charAt(0).toUpperCase()
    const priceNoZeros = parseFloat(Number(props.min_price).toFixed(2)).toLocaleString('es-ES', { minimumFractionDigits: 2 });

    const getObjectPosition = () => {
        switch(props.region){
            case 'Ghana':
            case 'Bosnia y Herzegovina':
            case 'Europa':
                return 'top';
            case 'Egipto':
            case 'Norteamerica':
            case 'Nueva Zelanda':
                return 'left';
            case 'Estados Unidos':
                return '30% 40%';
            default:
                return 'center';
        }
    }
    const objectPosition = getObjectPosition();

    return (
        <div className={`flex flex-col px-24 pt-0 pb-24 border-custom rounded-48 transition-all duration-300 ease-linear
         space-y-64 h-full relative overflow-hidden hover:border-text-faded cursor-pointer active:border-card-pressed
        ${props.category === firstLetterOfRegion ? 'hidden' : ''}`}>
            <div className={`h-256 relative scale-125`}>
                <Image
                    src={props.imgPath}
                    alt={`${props.region} landscape`}
                    fill
                    style={{ objectFit: 'cover', objectPosition: objectPosition}}
                />
            </div>
            <div className='flex flex-col justify-between pb-48'>
                <div className='flex flex-col space-y-12 mb-12'>
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
