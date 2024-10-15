import React from 'react'
import Image from "next/image";
import Search from '../ReusableComponents/Search';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';

const HeroSection = () => {
  const translations = useTranslations('HeroSection')
  const locale = useLocale();

  const renderMain = () => (
    <div className='text-center lg:text-left flex flex-col w-full lg:w-1/2 mt-64 lg:mt-0 justify-center items-center lg:items-start h-fit lg:h-full'>
      <p className="text-text-faded">{translations('eSimInternacional')}</p>
      <h1 className={`font-medium leading-body tracking-tight ${locale === 'br' ? 'text-[1.45rem] sm:text-hero' : 'text-hero'}`}>
        <span className="whitespace-nowrap">{translations('mantenTuConexion')}</span><br />
        <span className='font-bold text-primary whitespace-nowrap'>{translations('estesDondeEstes')}</span>
      </h1>
      <p>{translations('preparandoViaje')}</p>
      <Search extraClasses="w-full sm:w-2/3 lg:w-full" callAPIimmediately={true} />
    </div>
  )

  return (
    <div className={`flex items-start relative lg:items-center flex-grow px-24 ${locale === 'br' ? 'sm:px-[105px]' : 'sm:px-[145px]'}`}>
      {renderMain()}
      <div className="hidden lg:block relative w-1/2 h-full">
        <Image
          priority
          src='/media/imagen-heroe-actualizada3.png'
          alt='mano con celular'
          fill={true}
          style={{ objectFit: 'contain', objectPosition: 'right' }}
          sizes='40vw'
        />
      </div>
      <Image 
          priority
          className='block lg:hidden absolute -z-[1] -translate-y-90'
          alt=''
          src='/media/destinos-top.svg'
          fill={true}
        />
    </div>
  )
}
export default HeroSection