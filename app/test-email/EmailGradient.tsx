import React from 'react'
import ButtonDark from '../components/ReusableComponents/ButtonDark'
import Image from 'next/image'

const EmailGradient = () => {
  return (
    <div className='flex flex-col px-24 pt-48 pb-24 rounded-xl space-y-24 bg-custom-gradient text-center overflow-hidden items-center relative'>
        <Image className='absolute -top-64 md:-top-16 -left-16'
          src='/media/nube.png'
          alt=''
          height={156}
          width={227}
        />
        <Image className='absolute -top-64 md:-top-16 -right-64 scale-x-[-1]'
          src='/media/nube.png'
          alt=''
          height={156}
          width={227}
        />
    <h1 className='font-semibold text-subheading leading-body'>Descubre instrucciones paso a paso en nuestro sitio web.</h1>
    <ButtonDark extraClasses='px-32 py-12'>Ir a instalación de eSIM </ButtonDark>
  </div>
  )
}

export default EmailGradient
