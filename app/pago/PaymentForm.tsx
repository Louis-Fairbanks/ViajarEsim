import React from 'react'
import ChoosePaymentMethod from './ChoosePaymentMethod'
import DetailsForm from './DetailsForm'

const PaymentForm = () => {
    return (<div className='flex flex-col space-y-16 w-1/2'>
        {/* <ChoosePaymentMethod />
        <p className='text-center text-small text-text-faded'>O también puedes</p> */}
        <div className='flex flex-col space-y-12 p-24 lg:border-custom rounded-custom'>
            <h2 className='font-semibold text-subheading leading-body text-start'>Pagar con tarjeta</h2>
           <DetailsForm/>
        </div>
    </div>

    )
}

export default PaymentForm
