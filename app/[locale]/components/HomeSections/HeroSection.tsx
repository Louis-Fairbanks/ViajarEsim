'use client'
import React, { useEffect, useState } from 'react'
import Image from "next/image";
import Search from '../ReusableComponents/Search';
import { useShopping } from '../ShoppingContext/ShoppingContext';
import { useTranslations } from 'next-intl';

const HeroSection = () => {
  const translations = useTranslations('HeroSection')

  const {openedSidebar} = useShopping()

  const [imageLoaded, setImageLoaded] = useState<boolean>(false)
  const [windowWidth, setWindowWidth] = useState<number>(1025)

  useEffect(() => {
    setWindowWidth(window.innerWidth)
  }, []) 

  const renderMain = () => {
    return <div className='text-center lg:text-left flex flex-col w-full lg:w-1/2 mt-64 lg:mt-0 justify-center items-center lg:items-start
    h-fit lg:h-full'>
     <p className="text-text-faded">{translations('eSimInternacional')}</p>
     <h1 className="text-hero font-medium leading-body tracking-tight">
       <span className="whitespace-nowrap">{translations('mantenTuConexion')}</span><br></br>
       <span className='font-bold text-primary whitespace-nowrap'>{translations('estesDondeEstes')}</span>
     </h1>
     <p>{translations('preparandoViaje')}</p>
     <Search extraClasses="w-full sm:w-2/3 lg:w-full" callAPIimmediately={true}/>
   </div>
  }

  return (
      <div className={`flex items-start lg:items-center flex-grow px-24 sm:px-[145px]
      bg-no-repeat bg-cover bg-top bg-[url("/media/destinos-top.svg")] lg:bg-none ${openedSidebar === '' ? 'z-[1]' : 'z-0'}`}>
        {windowWidth < 1024? renderMain() : imageLoaded && renderMain()}
        <div className={`hidden relative lg:translate-x-128 xl:translate-x-0 w-1/2 h-full ${imageLoaded && 'lg:block'}`}>
        <Image
          priority
            src='/media/imagen-heroe-actualizada3.png'
            alt='mano con celular'
            fill={true}
            style={{ objectFit: 'contain', objectPosition: 'right' }}
            onLoad={() => setImageLoaded(true)}
            sizes='40vw'
          />
        </div>
      </div>
  )
}

export default HeroSection
