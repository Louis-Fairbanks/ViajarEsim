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
        switch (props.region) {
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
        <div className={`flex flex-col px-24 pt-0 pb-24 border-custom rounded-20 transition-all duration-300 ease-linear
         space-y-32 h-full relative overflow-hidden hover:border-text-faded cursor-pointer active:border-card-pressed
        ${props.category === firstLetterOfRegion ? 'hidden' : ''}`}>
            <div className={`h-165 relative scale-125`}>
                <Image
                    src={props.imgPath}
                    alt={`${props.region} landscape`}
                    fill
                    style={{ objectFit: 'cover', objectPosition: objectPosition }}
                />
            </div>
            <div className='flex flex-col justify-between'>
                <div className='flex flex-col space-y-12 mb-12'>
                    <h2 className='font-medium text-heading leading-body'>{props.region}</h2>
                    <p>Desde ${priceNoZeros} <span className='text-text-faded text-small align-top'>USD</span></p>
                </div>

            </div>
            <div className='flex flex-row justify-between z-10 mt-16 items-end'>
                <GoNow ctaText='Ir ahora' color='text-background'/>
                <Image src='/media/favicon.png' alt='logo viajar esim' width={36} height={36} />
            </div>
            <div className='absolute w-full h-128 left-0 -bottom-24 scale-y-200'>
                <Image className='scale-y-75 scale-x-150 translate-x-32'
                    src='/media/rectangle 8.svg'
                    alt=''
                    fill={true}
                />
            </div>
        </div>
    )
}

export default CountryCard
