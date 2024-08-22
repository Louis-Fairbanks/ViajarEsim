import React from 'react'
import SectionHeader from './SectionHeader'
import GoNow from '../HomeSections/GoNow'
import Card from './Card'
import Image from 'next/image'
import Link from 'next/link'


const PopularDestinations = () => {
    const popularDestinations = [
        {
            header: 'Estados Unidos',
            imgPath: '/media/Group 75.svg',
            alt: 'Estados Unidos',
            popular: true,
            ISOcode: 'us'
        },
        {
            header: 'Turquía',
            imgPath: '/media/turquia.svg',
            alt: 'Turquía',
            popular: true,
            ISOcode: 'tr'
        },
        {
            header: 'Reino Unido',
            imgPath: '/media/Group 72.svg',
            alt: 'Reino Unido',
            popular: true,
            ISOcode: 'gb'
        }
    ];

    return (
        <div className='flex flex-col p-24 sm:p-64 space-y-48 relative'>
            <div className='flex flex-col space-y-12 lg:space-y-0 lg:flex-row justify-between items-center'>
                <SectionHeader
                    title='destinos populares'
                    header='Estos son los destinos más solicitados.'
                    subheader='Consulta nuestros planes de eSIM antes de tu próximo viaje:'
                    extraClasses='text-center lg:text-left'
                />
                <Link href='/destinos'>
                    <GoNow
                        ctaText='Ver todos los destinos'
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
                {popularDestinations.map((destination, index) => (
                    <Card key={index} {...destination} />
                ))
                }
            </div>
        </div>
    )
}

export default PopularDestinations
