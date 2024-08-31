'use client';
import React from 'react'
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
import "/node_modules/flag-icons/css/flag-icons.min.css"
import styles from '../components/ReusableComponents/FeaturedDeal.module.css'
import { Plan } from '../components/Types/TPlan';


interface Props {
    plan : Plan,
    selectedPlan: Plan | undefined,
    setSelectedPlan : React.Dispatch<React.SetStateAction<Plan | undefined>>
}

// need to track three things, whether this card is selected,
// what the details of this plan are, and what to set when the button is clicked
const PricingCard = ({plan, selectedPlan, setSelectedPlan} : Props) => {
    
    // const priceNoZeros = plan.precio.replace(/\.0+$/, '');
    // const durationDaysParsed = parseInt(plan.duracion);

    return (
        <div className={`rounded-custom border-custom p-18 space-y-12 relative transition-all duration-300 ease-linear 
     ${selectedPlan === plan ? 'border-primary bg-selected-plan' : 'hover:border-text-faded cursor-pointer active:border-card-pressed'}`}
       onClick={() => setSelectedPlan(plan)}>
            {plan.is_low_cost && <div className={styles.featuredDeal}><div className={styles.featuredDealBelow}></div>LOW COST</div>}
            <div className='flex justify-between items-center'>
                <div className='flex items-center gap-x-8'>
                    <div className="relative w-32 h-32 overflow-hidden rounded-full border-custom">
                        <span className={`fi fi-${plan.region_isocode} left-2 ml-2 h-32 w-32 -top-6 absolute scale-200`}></span>
                    </div>
                    <span className='font-medium'>{plan.plan_nombre}</span>
                </div>
                <button className={`border-black border-collapse border-custom rounded-full w-24 h-24 transition-all
                duration-300 ease-linear  active:border-primary flex items-center justify-center
                ${selectedPlan === plan ? 'border-primary' : ''} `}>
                    <div className={`rounded-full w-18 h-18 bg-primary transition-all 
                    duration-100 ease-linear opacity-0 ${selectedPlan === plan ? 'opacity-100' : ''}`}></div>
                </button>
            </div>
            <div className='flex justify-between'>
                <span className='font-medium text-text-faded'>Datos</span>
                {plan.data === 'unlimited' ? <AllInclusiveIcon style={{ color: '#6C85FF' }} /> : <span className='font-semibold'>{plan.data} GB</span>}
            </div>
            <div className='flex justify-between'>
                <span className='font-medium text-text-faded'>Duración</span>
                <span className='font-semibold'>{plan.duracion} {parseInt(plan.duracion) > 1 ? 'días' : 'día'}</span>
            </div>
            <div className='flex justify-between'>
                <span className='font-medium text-text-faded'>Precio</span>
                <div className='font-semibold'>${plan.precio}.00 <span className='text-text-faded text-small font-medium'>USD</span></div>
            </div>
        </div>
    )
}

export default PricingCard
