'use client'
import React, { useState, useEffect } from 'react'
import PricingSection from './PricingSection'
import Image from 'next/image'
import { useRouter } from '@/routing'
import { useParams } from 'next/navigation'
import { Plan } from '../components/Types/TPlan'
import RegionSkeletonLoader from './RegionSkeletonLoader'
import { useLocale } from 'next-intl'

interface Region {
    nombre: string,
    imgurl: string,
    isocode: string,
    regionNombre?: string
    nombreTraducido?: string
}

const DestinationMain = () => {

    const router = useRouter()
    const params = useParams<{ region: string }>();
    const locale = useLocale();

    const [region, setRegion] = useState<Region>();
    const [imageLoaded, setImageLoaded] = useState<boolean>(false);
    const [plans, setPlans] = useState<Plan[]>();
    const [photoPosition, setPhotoPosition] = useState<string>('center');

    useEffect(() => {
        const fetchData = async () => {
            const endpoint = locale === 'es' ? '/api/region/' : `/api/region/${locale}/`;
            const response = await fetch(endpoint + params.region[0]);
            const data = await response.json();
            if (!data) {
                router.push('/')
            }
            else {
                const region: Region = {
                    imgurl: data.data[0].imgurl,
                    isocode: data.data[0].isocode,
                    nombre: data.data[0].nombre,
                    regionNombre: data.data[0].region_nombre,
                    nombreTraducido : data.data[0].nombreTraducido
                }
                setPlans(data.data[0].plans);
                setRegion(region);
                if (region.nombre === 'Egipto') {
                    setPhotoPosition('left');
                }
                if (region.nombre === 'Argentina'){
                    setPhotoPosition('left')
                }
            }
        };

        fetchData();
    }, [params.region[0]]);


    return (
         <>
         {/* {!plans && <RegionSkeletonLoader />} */}
            {region &&
                plans &&
                    <div className='p-24 sm:px-64 sm:py-32 flex lg:space-x-48'>
                        <img className='hidden' onLoad={() => setImageLoaded(true)}
                                src={`${region.imgurl}`}
                                alt={`${locale != 'es' ? region.nombreTraducido : region.nombre}`}
                                style={{ objectFit: 'cover', objectPosition: photoPosition }}
                            />
                        <div className='w-1/2 h-screen relative rounded-64 hidden lg:block'>
                            <Image className='rounded-64' onLoad={() => setImageLoaded(true)}
                            priority={true}
                                src={`${region.imgurl}`}
                                alt={`${locale != 'es' ? region.nombreTraducido : region.nombre}`}
                                fill
                                style={{ objectFit: 'cover', objectPosition: photoPosition }}
                            />
                        </div>
                        {imageLoaded && <PricingSection region={region.nombre} isocode={region.isocode} plans={plans}
                        nombreTraducido={region.nombreTraducido ? region.nombreTraducido : ''}/>}
                    </div>
                }
        </>
    )
}

export default DestinationMain
