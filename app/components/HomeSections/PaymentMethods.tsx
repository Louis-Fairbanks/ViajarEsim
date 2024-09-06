import React from 'react'
import Image from 'next/image'

const PaymentMethods = () => {
  return (
    <div className='flex flex-wrap py-48 justify-center items-center space-x-48 md:space-x-64 bg-payment-methods'>
        <Image 
            src='/media/paySafely.png'
            alt='paga de forma segura'
            width={150}
            height={45}
        />
      <Image 
        src='/media/visa.svg'
        alt='visa'
        width={60}
        height={20}
      />
      <Image
        src='/media/mastercard.svg'
        alt='mastercard'
        width={60}
        height={20}
       />
       <Image 
        src='/media/gpay.svg'
        alt='google pay'
        width={60}
        height={20}
       />
       {/* <Image 
        src='/media/paypal.svg'
        alt='paypal'
        width={60}
        height={20}
       />
       <Image 
        src='/media/applePay.svg'
        alt='apple pay'
        width={60}
        height={20}
       /> */}
    </div>
  )
}

export default PaymentMethods
