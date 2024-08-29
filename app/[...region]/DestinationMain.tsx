'use client'
import React, { useState, useEffect } from 'react'
import PricingSection from '../components/ReusableComponents/PricingSection'
import Image from 'next/image'
import { notFound } from 'next/navigation'

interface Props {
    param: string
}

interface Region {
    nombre: string,
    imgurl: string,
    isocode: string,
    proveedoresim: string
}

const DestinationMain = ({ param }: Props) => {

    const [region, setRegion] = useState<Region>();

    useEffect(() => {
        const fetchData = async () => {
           
            const response = await fetch('/api/region/' + param);
            const data = await response.json();
            if(!data){
                notFound();
            }
            else{
            const region : Region = {
                imgurl: data.data[0].imgurl,
                isocode: data.data[0].isocode,
                nombre: data.data[0].nombre,
                proveedoresim: data.data[0].proveedoresim
            }
            setRegion(region);
        }
        };

        fetchData();
    }, [param]);
        return (
            <div className='p-24 sm:px-64 sm:py-32 flex space-x-48'>
                <div className='w-1/2 h-screen relative rounded-64'>
                    {region &&
                    <Image className='rounded-64'
                        src={`${region.imgurl}`}
                        alt={`${region.nombre}`}
                        fill
                        style={{ objectFit: 'cover', objectPosition: 'center' }}
                    />}
                </div>
                {region && <PricingSection region={region.nombre} isocode={region.isocode}/> }
            </div>
        )
}

export default DestinationMain
