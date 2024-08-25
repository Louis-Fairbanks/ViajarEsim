import React from 'react'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
import SellOutlinedIcon from '@mui/icons-material/SellOutlined';
import Image from 'next/image';
import PricingCard from './PricingCard';
import { plans } from '../Planes';
import ButtonDark from './ButtonDark';
import Link from 'next/link';
import CompatibilityModal from './CompatibilityModal';

interface Props {
    region: string
}

const PricingSection = ({ region }: Props) => {
    return (
        <div className='flex flex-col space-y-12 justify-between w-1/2'>
            <div className='flex justify-between items-center'>
                <div className='flex gap-x-4 items-center'>
                    <div className="relative w-48 h-48 overflow-hidden rounded-full border-custom scale-75 flex-shrink-0 sm:scale-100">
                        <span className={`fi fi-us h-24 w-24 absolute top-6 left-12 scale-300`}></span>
                    </div>
                    <h2 className='font-medium text-heading leading-body'>eSIM en {region}</h2>
                </div>
                <FavoriteBorderIcon style={{ color: '#e4e4e4' }} />
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
                <CompatibilityModal />
            </div>
            <div>
                <h3 className='mb-12'>Selecciona tu plan</h3>
                <div className='grid grid-cols-2 gap-12'>
                    {plans.map((plan, index) => {
                        return <PricingCard key={index} ISOcode={plan.ISOcode} planName={plan.planName} data={plan.data} 
                        duration={plan.duration} price={plan.price} lowCost={plan.lowCost}/>
                    })}
                </div>
            </div>
            <div className='flex flex-col space-y-16 mt-16 w-full'>
                <h3 className='text-subheading leading-body'>¿Cuantos eSIMS necesitas?</h3>
                <div className='flex space-x-4'>
                    <div className='border-custom rounded-custom p-8 flex space-x-32 text-heading'>
                        <button>-</button>
                        <span>1</span>
                        <button>+</button>
                    </div>
                    <ButtonDark extraClasses='px-32 py-9 w-full'>
                        <Link href='/destinos'>Agregar al carrito</Link></ButtonDark>
                </div>
            </div>
        </div>
    )
}

export default PricingSection
