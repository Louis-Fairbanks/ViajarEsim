import React from 'react'
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
import SellOutlinedIcon from '@mui/icons-material/SellOutlined';
import Image from 'next/image';
import AllPlans from '../components/ReusableComponents/AllPlans';
import CompatibilitySection from './CompatibilitySection';

interface Props {
    region: string
    isocode : string
}

const PricingSection = ({ region, isocode }: Props) => {
    return (
        <div className='flex flex-col space-y-12 justify-between w-1/2'>
            <div className='flex justify-between items-center'>
                <div className='flex gap-x-4 items-center'>
                    <div className="relative w-48 h-48 overflow-hidden rounded-full border-custom scale-75 flex-shrink-0 sm:scale-100">
                        <span className={`fi fi-${isocode} h-24 w-24 absolute top-6 left-12 scale-300`}></span>
                    </div>
                    <h2 className='font-medium text-heading leading-body'>eSIM en {region}</h2>
                </div>
            </div>
            <div className='flex justify-between py-12 items-start'>
                <div className='flex-col space-y-8'>
                    <div>
                        <AllInclusiveIcon className='mr-8' style={{ color: '#6C85FF' }} />
                        Datos ilimitados.
                    </div>
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
                    <div>
                        <SellOutlinedIcon className='mr-8' style={{ color: '#6C85FF' }} />
                        Planes low cost.
                    </div>
                </div>
                <CompatibilitySection/>
            </div>
            <AllPlans />
        </div>
    )
}

export default PricingSection
