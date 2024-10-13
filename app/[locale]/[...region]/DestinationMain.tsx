'use client'
import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useLocale } from 'next-intl'
import PricingSection from './PricingSection'

interface RegionData {
    nombre: string,
    imgurl: string,
    isocode: string,
    type: string,
    plans: any[],
    translations: Record<string, string>,
    current_lang: string
}

interface Props {
    regionData: RegionData
}

const DestinationMain: React.FC<Props> = ({ regionData }) => {
    const router = useRouter()
    const locale = useLocale()

    const photoPosition = ['Egipto', 'Argentina'].includes(regionData.nombre) ? 'left' : 'center'

    React.useEffect(() => {
        if (regionData.current_lang !== locale) {
            const translatedName = regionData.translations[locale]
            if (translatedName) {
                router.push(`/${locale}/${translatedName.replace(/ /g, '-').toLowerCase()}`)
            }
        }
    }, [locale, regionData])

    return (
        <div className='p-24 sm:px-64 sm:py-32 flex lg:space-x-48'>
            <div className='w-1/2 h-screen relative rounded-64 hidden lg:block'>
                <Image 
                    className='rounded-64'
                    src={regionData.imgurl}
                    alt={regionData.translations[locale] || regionData.nombre}
                    fill
                    priority
                    style={{ objectFit: 'cover', objectPosition: photoPosition }}
                />
            </div>
            <PricingSection 
                region={regionData.nombre} 
                isocode={regionData.isocode} 
                plans={regionData.plans}
                nombreTraducido={regionData.translations[locale] || ''}
            />
        </div>
    )
}

export default DestinationMain