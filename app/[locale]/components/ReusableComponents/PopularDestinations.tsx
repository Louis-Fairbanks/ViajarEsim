import React from 'react'
import SectionHeader from './SectionHeader'
import GoNow from '../HomeSections/GoNow'
import Card from './Card'
import Image from 'next/image'
import { Link } from '@/routing'
import { useTranslations } from 'next-intl'


const PopularDestinations = () => {

    const translations = useTranslations('PopularDestinations')
    const nextTripTranslations = useTranslations('NextTrip')
    const Regiones = nextTripTranslations.raw('items')

    return (
        <div className='flex flex-col p-24 sm:p-64 space-y-48 relative'>
            <div className='flex flex-col space-y-12 lg:space-y-0 lg:flex-row justify-between items-center'>
                <SectionHeader
                    title={translations('title')}
                    header={translations('heading')}
                    subheader={translations('subheading')}
                    extraClasses='text-center lg:text-left'
                />
                <Link href='/destinos'>
                    <GoNow
                        ctaText={translations('cta')}
                    />
                </Link>
            </div>
            <Image className='absolute left-32 top-128 scale-200 -z-10'
                src='/media/avioncito.png'
                alt='avion'
                width={100}
                height={100}
            />
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-y-24 lg:gap-y-0
            lg:gap-x-24 bg-background lg:whitespace-nowrap'>
                    <Card {...Regiones[1]} />
                    <Card {...Regiones[5]} />
                    <Card {...Regiones[8]} />
            </div>
        </div>
    )
}

export default PopularDestinations
