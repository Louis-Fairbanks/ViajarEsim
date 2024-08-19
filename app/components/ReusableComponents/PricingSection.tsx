import React from 'react'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
import SellOutlinedIcon from '@mui/icons-material/SellOutlined';
import Image from 'next/image';
import PricingCard from './PricingCard';
import { plans } from '../Planes';

const PricingSection = () => {
    return (

        <div className='flex flex-col justify-between w-2/3'>
            <div className='flex justify-between items-center'>
                <div>
                    <p>eSIM con Datos Ilimitados en</p>
                    <h2 className='font-medium text-heading'>Estados Unidos</h2>
                </div>
                <FavoriteBorderIcon style={{ color: '#e4e4e4' }} />
            </div>
            <div className='flex justify-between py-12'>
                <ul className='space-y-8'>
                    <li>
                        <AllInclusiveIcon className='mr-8' style={{ color: '#6C85FF' }} />
                        Datos ilimitados.
                    </li>
                    <li className='flex'>
                        <Image className='mr-8'
                            src='/media/rayo.svg'
                            alt=''
                            width={24}
                            height={24}
                        />
                        Internet rápido y de confianza.
                    </li>
                    <li className='flex'>
                        <Image className='mr-8'
                            src='/media/no-money.svg'
                            alt=''
                            width={24}
                            height={24}
                        />
                        Sin tarifas de roaming.
                    </li>
                    <li>
                        <SellOutlinedIcon className='mr-8' style={{ color: '#6C85FF' }} />
                        Planes low cost.
                    </li>
                </ul>
                <button>Verificar Compatibilidad</button>
            </div>
            <div>
                <h3>Selecciona tu plan</h3>
                <div className='grid grid-cols-3 space-x-12 space-y-12'>
                    {plans.map((plan, index) => {
                        return <PricingCard key={index} ISOcode={plan.ISOcode} planName={plan.planName} data={plan.data} duration={plan.duration} price={plan.price} />
                    })}
                </div>
            </div>
            <div className='flex flex-col space-y-16'>
                <h3>¿Cuantos eSIMS necesitas?</h3>
                <div className='flex space-x-24'>
                    <div className='border-custom rounded custom p-8 flex space-x-32'>
                        <button>-</button>
                        <span>1</span>
                        <button>+</button>
                    </div>
                    <div className='flex-grow'>
                        Agregar al carrito
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PricingSection
