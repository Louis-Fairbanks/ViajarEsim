'use client'
import React, { useState } from 'react'
import Image from "next/image";
import Search from '../ReusableComponents/Search';

const HeroSection = () => {

  const [imageLoaded, setImageLoaded] = useState<boolean>(false)


  return (
      <div className='flex items-center flex-grow overflow-x-hidden'>
        {imageLoaded && <div className='text-center lg:text-left flex flex-col w-full lg:w-1/2 px-24 sm:px-64 justify-center items-center lg:items-start
        bg-no-repeat bg-contain bg-right bg-[url("/media/fondo-heroe-movil.svg")] h-full lg:bg-none'>
          <p className="text-text-faded">eSim Internacional</p>
          <h1 className="text-hero font-medium leading-body tracking-tight">
            <span className="whitespace-nowrap">Mantén tu conexión</span><br></br>
            <span className='font-bold text-primary whitespace-nowrap'>estés donde estés.</span>
          </h1>
          <p>¿Preparando tu próximo viaje? Con ViajareSIM, disfruta de internet de alta velocidad sin limites y olvidate de las costosas tarifas de roaming.</p>
          <Search extraClasses="w-full sm:w-2/3 lg:w-full"/>
        </div>}
        <div className={`hidden relative lg:translate-x-128 xl:translate-x-0 w-1/2 h-full ${imageLoaded && 'lg:block'}`}>
        <Image 
          priority
            src='/media/celular-con-mano-final-optimizado.png'
            alt='mano con celular'
            fill={true}
            onLoad={() => setImageLoaded(true)}
            sizes='40vw'
          />
        </div>
      </div>
  )
}

export default HeroSection
