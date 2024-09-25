import React from 'react'
import ChoosePaymentMethod from './ChoosePaymentMethod'
import DetailsForm from './DetailsForm'
import PaymentMethods from '../components/HomeSections/PaymentMethods'
import { useTranslations } from 'next-intl'

const PaymentForm = () => {

    const translations = useTranslations('Pago')

    return (<div className='flex flex-col space-y-16 w-full lg:w-1/2'>
        {/* <ChoosePaymentMethod />
        <p className='text-center text-small text-text-faded'>O también puedes</p> */}
        <div className='flex flex-col space-y-12 p-24 lg:border-custom rounded-custom'>
            <h2 className='font-semibold text-subheading leading-body text-start'>{translations('pagarConTarjeta')}</h2>
           <DetailsForm/>
        </div>
        <PaymentMethods/>
    </div>

    )
}

export default PaymentForm
