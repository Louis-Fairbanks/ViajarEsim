import React from 'react'
import SectionHeader from './SectionHeader'
import GoNow from '../HomeSections/GoNow'
import Card from './Card'
import Image from 'next/image'


const PopularDestinations = () => {
    const popularDestinations = [
        {
            popular: true,
            header: 'Estados Unidos',
            ISOcode: 'us',
            imgPath: '/media/statuaLibertad.png',
            alt: 'estados unidos'
        },
        {
            popular: true,
            header: 'Turquía',
            ISOcode: 'tr',
            imgPath: '/media/turquia.png',
            alt: 'turquía'
        },
        {
            popular: true,
            header: 'Reino Unido',
            ISOcode: 'gb',
            imgPath: '/media/granBen.png',
            alt: 'reino unido'
        }
    ]

  return (
    <div className='flex flex-col p-64 space-y-48 relative'>
                <div className='flex justify-between items-center'>
                    <SectionHeader
                        title='destinos populares'
                        header='Estos son los destinos más solicitados.'
                        subheader='Consulta nuestros planes de eSIM antes de tu próximo viaje:'
                        alignLeft={true}
                    />
                    <GoNow
                        ctaText='Ver todos los destinos'
                    />
                </div>
                <Image className='absolute left-32 top-128 scale-200 -z-10'
                    src='/media/avioncito.png'
                    alt='avion'
                    width={100}
                    height={100}
                />
                <div className='grid grid-cols-3 space-x-24 bg-background'>
                    {popularDestinations.map((destination, index) => (
                        <Card key={index} {...destination} />
                    ))
                    }
                </div>
            </div>
  )
}

export default PopularDestinations