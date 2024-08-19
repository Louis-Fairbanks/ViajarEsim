import React from 'react'
import Image from 'next/image'
import ButtonDark from '../ReusableComponents/ButtonDark'

const FooterAbove = () => {
  return (
    <div className='flex flex-col p-64 space-y-48'>
      <div className='flex flex-col rounded-2xl bg-custom-gradient items-center text-center space-y-16 p-48 relative overflow-hidden'>
            <h1 className='font-semibold text-large-heading w-1/2 leading-body'>
                Viaja tranquilo, nosotros te mantenemos conectado.</h1>
            <p className='w-1/2'>Sabemos que no tener tu conexion a tus seres queridos puede ser dificil, por eso llegamos para ayudarte.</p>
            <ButtonDark extraClasses='px-48 py-9 w-1/3'>Quiero mi eSIM</ButtonDark>
            <Image className='absolute -top-16 left-0'
                src='/media/nube.png'
                alt=''
                height={156}
                width={227}
            />
            <Image className='absolute -left-16 -bottom-90 scale-150 -rotate-12'
                src='/media/avioncito-negro.png'
                alt='avion'
                height={100}
                width={300}
            />
            <Image className='absolute -right-48 -top-48 scale-75'
                src='/media/sol.png'
                alt=''
                height={272}
                width={281}
            />
            <Image className='absolute right-0'
                src='/media/globo2.png'
                alt=''
                height={281}
                width={450}
            />
      </div>
    </div>
  )
}

export default FooterAbove
