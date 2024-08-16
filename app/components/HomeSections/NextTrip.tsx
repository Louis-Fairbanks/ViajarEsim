import React from 'react'
import SectionHeader from '../ReusableComponents/SectionHeader'
import Card from '../ReusableComponents/Card'
import { Regiones } from '../Regiones'
import Image from 'next/image'

const NextTrip = () => {
  return (
    <div className="p-64 flex flex-col items-center space-y-48 relative">
      <Image className='absolute left-64 top-128 mt-32 scale-200'
        src='/media/avioncito.png'
        alt='avion'
        width={100}
        height={100}
      />
      <SectionHeader
        header="¿Dónde tienes planeado viajar próximamente?"
        subheader="Selecciona tu destino y luego elige la duración de tu plan de datos."
      />
      <div className='grid grid-cols-3 gap-24'>
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
      <button className='bg-primary px-48 py-9 text-background font-semibold rounded-custom'>Ver todos los destinos</button>
    </div>
  )
}

export default NextTrip
