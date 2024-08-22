import React from 'react'
import Image from 'next/image'
import ButtonDark from '../ReusableComponents/ButtonDark'

const FooterAbove = () => {
  return (
    <div className='flex flex-col p-24 sm:p-64 space-y-48'>
      <div className='flex flex-col rounded-2xl bg-custom-gradient items-center text-center space-y-16 px-24 py-48 md:p-48 relative overflow-hidden'>
            <h1 className='font-semibold text-subheading lg:text-large-heading w-full md:w-2/3 xl:w-1/2 leading-body'>
                Viaja tranquilo, nosotros te mantenemos conectado.</h1>
            <p className='w-full md:w-2/3 xl:w-1/2'>Sabemos que no tener tu conexion a tus seres queridos puede ser dificil, por eso llegamos para ayudarte.</p>
            <ButtonDark extraClasses='px-48 py-9 lg:w-1/3 whitespace-nowrap z-10'>Quiero mi eSIM</ButtonDark>
            <Image className='absolute -top-64 md:-top-16 lg:left-0 -right-32 -scale-x-100'
                src='/media/nube.png'
                alt=''
                height={156}
                width={227}
            />
            <Image className='absolute -left-128 md:-left-48 -bottom-128 scale-50 md:scale-100 -rotate-12'
                src='/media/avioncito-negro.png'
                alt='avion'
                height={100}
                width={300}
            />
            <Image className='absolute -right-48 -top-48 scale-75 hidden lg:block'
                src='/media/sol.png'
                alt=''
                height={272}
                width={281}
            />
            <Image className='absolute bottom-0 right-64 hidden lg:block'
                src='/media/globo2.png'
                alt=''
                height={140}
                width={225}
            />
      </div>
    </div>
  )
}

export default FooterAbove
