import React from 'react'
import Image from 'next/image'
import IconsSection from './IconsSection'

const MainComponent = () => {
  return (
    <div className='flex flex-col rounded-custom border-custom p-24 space-y-32 items-center text-center'>
        <div className='flex flex-col justify-center text-center'>
            <div className='flex text-center justify-center items-center space-x-24'>
            <p className='font-extrabold text-[4rem] leading-body text-accent'>1.</p>
            <h2 className=''>Instala tu <span className='text-primary font-bold'>eSIM</span></h2>
            </div>
            <p>Por favor, préstale mucha atención a la siguiente información.</p>
        </div>
        <div className='relative'>
            <Image
                src='/media/email/hombre-con-celular.png'
                alt='celular con esim'
                height={332}
                width={292}
            />
        </div>
        <p>Puedes instalarlo antes o durante tu viaje utilizando el código QR a continuación o ingresando los códigos manualmente que se encuentran en este correo electrónico.</p>
        <IconsSection/>
        <div className='bg-[#D9E0FF] rounded-custom p-24 flex space-x-12 w-full'>
            <Image
                src='/media/email/notice.svg'
                alt=''
                height={24}
                width={24}
            />
            <p className='text-primary font-semibold text-small'>Te recomendamos conectarte a una red Wi-Fi estable para asegurar un proceso de instalación exitoso y sencillo.</p>
        </div>
    </div>
  )
}

export default MainComponent
