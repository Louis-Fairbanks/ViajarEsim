'use client';
import React from 'react'
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
import "/node_modules/flag-icons/css/flag-icons.min.css"
import styles from './FeaturedDeal.module.css'


interface Props {
    plan : Plan,
    selectedPlan: Plan | undefined,
    setSelectedPlan : React.Dispatch<React.SetStateAction<Plan | undefined>>
}

type Plan = {
    planName : string,
    destinationName : string,
    destinationIsocode : string,
    priceInDollars : number,
    dataGB : 'unlimited' | number,
    durationDays : number,
    provider? : string,
    lowCost : boolean
}
// need to track three things, whether this card is selected,
// what the details of this plan are, and what to set when the button is clicked
const PricingCard = ({plan, selectedPlan, setSelectedPlan} : Props) => {

    return (
        <div className={`rounded-custom border-custom p-18 space-y-12 relative transition-all duration-300 ease-linear 
        hover:border-text-faded cursor-pointer active:border-card-pressed
     ${selectedPlan === plan ? 'border-primary hover:border-primary bg-selected-plan' : ''}`}  onClick={() => setSelectedPlan(plan)}>
            {plan.lowCost && <div className={styles.featuredDeal}><div className={styles.featuredDealBelow}></div>LOW COST</div>}
            <div className='flex justify-between items-center'>
                <div className='flex items-center gap-x-8'>
                    <div className="relative w-32 h-32 overflow-hidden rounded-full border-custom">
                        <span className={`fi fi-${plan.destinationIsocode} left-2 ml-2 h-32 w-32 -top-6 absolute scale-200`}></span>
                    </div>
                    <span className='font-medium'>{plan.planName}</span>
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
                {plan.dataGB === 'unlimited' ? <AllInclusiveIcon style={{ color: '#6C85FF' }} /> : <span className='font-semibold'>{plan.dataGB}</span>}
            </div>
            <div className='flex justify-between'>
                <span className='font-medium text-text-faded'>Duración</span>
                <span className='font-semibold'>{plan.durationDays} {plan.durationDays > 1 ? 'días' : 'día'}</span>
            </div>
            <div className='flex justify-between'>
                <span className='font-medium text-text-faded'>Precio</span>
                <div className='font-semibold'>${plan.priceInDollars}.00 <span className='text-text-faded text-small font-medium'>USD</span></div>
            </div>
        </div>
    )
}

export default PricingCard
