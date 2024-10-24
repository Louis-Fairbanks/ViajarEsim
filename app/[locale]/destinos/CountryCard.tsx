'use client'
import React from 'react'
import GoNow from '../components/HomeSections/GoNow'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { useShopping } from '../components/ShoppingContext/ShoppingContext'

interface Props {
    region: string
    min_price: string
    imgPath: string
    category: string
}

const CountryCard = (props: Props) => {

    const translations = useTranslations('Destinations')

    const firstLetterOfRegion = props.region.charAt(0).toUpperCase()

    const { preferredCurrency } = useShopping()


    const getObjectPosition = () => {
        const topRegions = [
            'Ghana', 'Gana', // ES, EN/PT
            'Europa', 'Europe', 'Europa' // ES, EN, PT
        ];

        const bosniaAndHerzegovina = [
            'Bosnia y Herzegovina', 'Bosnia and Herzegovina', 'Bosnia e Herzegovina', // ES, EN, PT
        ]
    
        const leftRegions = [
            'Egipto', 'Egypt', 'Egito', // ES, EN, PT
            'Norteamerica', 'North America', 'America do Norte', // ES, EN, PT
            'Nueva Zelanda', 'New Zealand', 'Nova Zelandia' // ES, EN, PT
        ];
    
        const specialCaseRegions = [
            'Estados Unidos', 'United States', 'Estados Unidos' // ES, EN, PT
        ];
    
        if (topRegions.includes(props.region)) {
            return 'top';
        } else if (leftRegions.includes(props.region)) {
            return 'left';
        } else if (bosniaAndHerzegovina.includes(props.region)){
            return '50% 25%';
        }
         else if (specialCaseRegions.includes(props.region)) {
            return '30% 40%';
        } else {
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
                    <p>{translations('desde')} {new Intl.NumberFormat(preferredCurrency.locale_format, {
                        style: 'currency',
                        currency: preferredCurrency.name,
                        minimumFractionDigits: 2
                    }).format(parseFloat(props.min_price) * preferredCurrency.tasa)}</p>
                </div>

            </div>
                <div className='flex flex-1 flex-row justify-between z-[1] items-end'>
                    <GoNow ctaText={translations('irAhora')} color='text-background' />
                    <Image src='/img/favicon.png' alt='logo viajar esim' width={36} height={36} />
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
