'use client'
import React from 'react'
import Image from 'next/image'
import { useRouter } from '@/routing'
import { useLocale } from 'next-intl'
import { useSearchParams } from 'next/navigation'
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

const createSlug = (text: string): string => {
    return text
      .normalize('NFD') // Decompose combined letters with diacritics
      .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
      .replace(/[^a-zA-Z0-9\s-]/g, '') // Remove special characters except spaces and hyphens
      .trim() // Remove leading and trailing whitespace
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-')
      .toLowerCase(); // Convert to lowercase
  };

const DestinationMain: React.FC<Props> = ({ regionData }) => {
    const router = useRouter()
    const locale = useLocale()
    const params = useSearchParams();

    console.log(params)

    const photoPosition = ['Egipto', 'Argentina'].includes(regionData.nombre) ? 'left' : 'center'

    React.useEffect(() => {
        const translatedName = regionData.translations[locale]
        console.log(translatedName)
        if (translatedName) {
            if(params.size === 0){
                router.push(`/${createSlug(translatedName)}`)
            }
            else{
                router.push(`/${createSlug(translatedName)}?${params.toString()}`)
            }
        }
    }, [locale, regionData])



    return (regionData &&
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