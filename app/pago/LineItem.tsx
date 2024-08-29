import React from 'react'

interface PlanInfo {
    destinationName : string,
    destinationIsocode : string,
    dataGB : 'ilimitado' | number,
    durationDays : number,
    priceInDollars : number
    quantity : number
}

const LineItem = ( { destinationName, destinationIsocode, dataGB, durationDays, priceInDollars, quantity }: PlanInfo) => {
    return (
        <>
            <div className='flex justify-between items-center border-b-custom lg:mx-24 pb-12'>
                <p className='font-medium text-text-faded'>País</p>
                <div className='flex items-center space-x-12'>
                    <div className="relative w-32 h-32 overflow-hidden rounded-full border-custom">
                        <span className={`fi fi-${destinationIsocode} h-32 w-32 absolute left-0 -top-6 scale-200`}></span>
                    </div>
                    <span className='font-medium text-subheading whitespace-nowrap'>{destinationName}</span>
                </div>
            </div>
            <hr className='bg-background w-full h-2 lg:hidden'></hr>
            <div className='flex justify-between items-center border-b-custom lg:mx-24 pb-12'>
                <p className='font-medium text-text-faded'>Datos</p>
                <span className='font-medium text-subheading'>
                    {dataGB === 'ilimitado' ? 'Ilimitado' : dataGB + ' GB'}
                </span>
            </div>
            <hr className='bg-background w-full h-2 lg:hidden'></hr>
            <div className='flex justify-between items-center border-b-custom lg:mx-24 pb-12'>
                <p className='font-medium text-text-faded'>Cantidad</p>
                <span className='font-medium text-subheading'>
                    {quantity}
                </span>
            </div>
            <hr className='bg-background w-full h-2 lg:hidden'></hr>
            <div className='flex justify-between items-center border-b-custom lg:mx-24 pb-12'>
                <p className='font-medium text-text-faded'>Duración</p>
                <span className='font-medium text-subheading'>{durationDays} días</span>
            </div>
            <hr className='bg-background w-full h-2 lg:hidden'></hr>
            <div className='flex justify-between items-center py-12 lg:px-24 lg:bg-payment-methods'>
                <p className='font-medium text-text-faded'>Precio</p>
                <span className='font-medium text-heading'>{priceInDollars}<span className='text-small text-text-faded ml-6'>USD</span></span>
            </div>
        </>
    )
}

export default LineItem
