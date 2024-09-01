import React from 'react'

const ChoosePaymentMethod = () => {
    return (
        <div className='flex flex-col space-y-24 border-custom rounded-custom p-24'>
            <div className='flex flex-col space-y-12 border-b-custom pb-12'>
                <h2 className='font-semibold text-subheading'>Elige tu método de pago</h2>
                <p className='text-text-faded'>Pago express</p>
            </div>
            <div className='flex'>
                <button>Google Pay</button>
                <button>Apple Pay</button>
                <button>PayPal</button>
            </div>
        </div>
    )
}

export default ChoosePaymentMethod
