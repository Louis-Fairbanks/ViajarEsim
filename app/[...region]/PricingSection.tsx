'use client'
import React from 'react'
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
import SellOutlinedIcon from '@mui/icons-material/SellOutlined';
import Image from 'next/image';
import AllPlans from '../components/ReusableComponents/AllPlans';
import CompatibilitySection from './CompatibilitySection';
import { Plan } from '../components/Types/TPlan';

interface Props {
    region: string
    isocode : string
    plans : Plan[]
}

const PricingSection = ({ region, isocode, plans }: Props) => {

    const containsUnlimited = plans.some(plan => plan.data === 'unlimited');
    const containsLowCost = plans.some(plan => plan.is_low_cost);

    return (
        <div className='flex flex-col space-y-12 sm:justify-between w-full lg:w-1/2'>
            <div className='flex justify-between items-center'>
                <div className='flex gap-x-4 items-center'>
                    <div className="relative w-48 h-48 rounded-full border-custom scale-75 flex-shrink-0 sm:scale-100">
                        <span className={`fi fi-${isocode} h-24 w-24 absolute top-6 left-12 scale-300`}></span>
                    </div>
                    <h2 className='font-medium text-heading leading-body'>eSIM en {region}</h2>
                </div>
            </div>
            <div className='flex justify-between py-12 flex-col space-y-12 sm:space-y-0 sm:flex-row items-start'>
                <div className='flex-col space-y-8'>
                    {containsUnlimited && <div>
                        <AllInclusiveIcon className='mr-8' style={{ color: '#6C85FF' }} />
                        Datos ilimitados.
                    </div>}
                    <div className='flex'>
                        <Image className='mr-8'
                            src='/media/rayo.svg'
                            alt=''
                            width={24}
                            height={24}
                        />
                        Internet rápido y de confianza.
                    </div>
                    <div className='flex'>
                        <Image className='mr-8'
                            src='/media/no-money.svg'
                            alt=''
                            width={24}
                            height={24}
                        />
                        Sin tarifas de roaming.
                    </div>
                    {containsLowCost && <div>
                        <SellOutlinedIcon className='mr-8' style={{ color: '#6C85FF' }} />
                        Planes low cost.
                    </div>}
                </div>
                <CompatibilitySection/>
            </div>
            <AllPlans plans={plans} />
        </div>
    )
}

export default PricingSection
