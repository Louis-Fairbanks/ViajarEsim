import React from 'react'
import SectionHeader from '../ReusableComponents/SectionHeader'
import Card from '../ReusableComponents/Card'
import { Regiones } from '../Regiones'
import Image from 'next/image'
import ButtonDark from '../ReusableComponents/ButtonDark'
import Link from 'next/link'

const NextTrip = () => {
  return (
    <div className="p-24 sm:p-64 flex flex-col items-center space-y-48 relative">
      <Image className='absolute left-64 top-256 sm:top-128 mt-32 scale-200 -z-10'
        src='/media/avioncito.png'
        alt='avion'
        width={100}
        height={100}
      />
      <SectionHeader
        header="¿Dónde tienes planeado viajar próximamente?"
        subheader="Selecciona tu destino y luego elige la duración de tu plan de datos."
      />
      <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-24'>
        {Regiones.map((region, index) => (
          <Card
            key={index}
            popular={region.popular}
            header={region.header}
            ISOcode={region.ISOcode}
            imgPath={region.imgPath}
            alt={region.alt}
          />
        ))}
      </div>
      <Link href='/destinos'>
        <ButtonDark extraClasses='px-48 py-9 whitespace-nowrap max-w-screen'>Ver todos los destinos</ButtonDark>
      </Link>
    </div>
  )
}

export default NextTrip
