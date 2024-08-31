'use client'
import React, { useState, useEffect } from 'react'
import PricingSection from './PricingSection'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { useParams } from 'next/navigation'
import { Plan } from '../components/Types/TPlan'

interface Region {
    nombre: string,
    imgurl: string,
    isocode: string,
    regionNombre?: string
}

const DestinationMain = () => {

    const params = useParams<{ region: string }>();

    const [region, setRegion] = useState<Region>();
    const [imageLoaded, setImageLoaded] = useState<boolean>(false);
    const [plans, setPlans] = useState<Plan[]>();

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('/api/region/' + params.region[0]);
            const data = await response.json();
            if (!data) {
                notFound();
            }
            else {
                const region: Region = {
                    imgurl: data.data[0].imgurl,
                    isocode: data.data[0].isocode,
                    nombre: data.data[0].nombre,
                    regionNombre: data.data[0].region_nombre
                }
                setRegion(region);
            }
        };

        fetchData();
    }, [params.region[0]]);
    //fetch plans
    useEffect(() => {
        const fetchData = async () => {
            if (region) {
                let safeSearchString;
                if (region.regionNombre) {
                    safeSearchString = region.regionNombre.toLowerCase().replace(/ /g, '-');
                }
                else { safeSearchString = region.nombre.toLowerCase().replace(/ /g, '-'); }
                const fetchString = `/api/planes/${safeSearchString}`;
                const response = await fetch(fetchString);
                const data = await response.json();
                if (!data) {
                    return
                }
                setPlans(data.data);
            }
        }
        fetchData();
    }, [region])



    return (
        <>{region &&
            plans &&
            <div className='p-24 sm:px-64 sm:py-32 flex space-x-48'>
                <div className='w-1/2 h-screen relative rounded-64'>
                    <Image className='rounded-64' onLoad={() => setImageLoaded(true)}
                        src={`${region.imgurl}`}
                        alt={`${region.nombre}`}
                        fill
                        style={{ objectFit: 'cover', objectPosition: 'center' }}
                    />
                </div>
                {imageLoaded && <PricingSection region={region.nombre} isocode={region.isocode} plans={plans} />}
            </div>}
        </>
    )
}

export default DestinationMain
