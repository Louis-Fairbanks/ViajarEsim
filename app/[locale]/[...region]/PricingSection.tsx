'use client'
import React from 'react'
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
import SellOutlinedIcon from '@mui/icons-material/SellOutlined';
import Image from 'next/image';
import AllPlans from '../components/ReusableComponents/AllPlans';
import CompatibilitySection from './CompatibilitySection';
import { Plan } from '../components/Types/TPlan';
import { useTranslations } from 'next-intl';

interface Props {
    region: string
    isocode : string
    plans : Plan[]
    nombreTraducido : string
}

const PricingSection = ({ region, isocode, plans, nombreTraducido }: Props) => {

    const containsUnlimited = plans.some(plan => plan.data === 'unlimited');
    const containsLowCost = plans.some(plan => plan.is_low_cost);

    const translations = useTranslations('PricingSection')

    if(isocode === 'cb'){
        isocode = 'ki'
    }

    return (
        <div className='flex flex-col space-y-12 sm:justify-between w-full lg:w-1/2'>
            <div className='flex justify-between items-center'>
                <div className='flex gap-x-4 items-center'>
                    <div className="relative w-48 h-48 rounded-full overflow-hidden border-custom scale-75 flex-shrink-0 sm:scale-100">
                        <span className={`fi fi-${isocode} h-24 w-24 absolute top-6 left-12 scale-300`}></span>
                    </div>
                    <h2 className='font-medium text-heading leading-body'>{translations('eSIMen')} {nombreTraducido != '' ? nombreTraducido : region}</h2>
                </div>
            </div>
            <div className='flex justify-between py-12 flex-col space-y-12 sm:space-y-0 sm:flex-row items-start'>
                <div className='flex-col space-y-8'>
                    {containsUnlimited && <div>
                        <AllInclusiveIcon className='mr-8' style={{ color: '#6C85FF' }} />
                        {translations('datosIlimitados')}
                    </div>}
                    <div className='flex'>
                        <Image className='mr-8'
                            src='/media/rayo-product-page.svg'
                            alt=''
                            width={24}
                            height={24}
                        />
                        {translations('internetRapido')}
                    </div>
                    <div className='flex'>
                        <Image className='mr-8'
                            src='/media/no-money.svg'
                            alt=''
                            width={24}
                            height={24}
                        />
                        {translations('sinTarifas')}
                    </div>
                    {containsLowCost && <div>
                        <SellOutlinedIcon className='mr-8' style={{ color: '#6C85FF' }} />
                        {translations('planesLowCost')}
                    </div>}
                </div>
                <CompatibilitySection/>
            </div>
            <AllPlans plans={plans} />
        </div>
    )
}

export default PricingSection
