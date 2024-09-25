import React from 'react'
import SectionHeader from '../ReusableComponents/SectionHeader'
import Card from '../ReusableComponents/Card'
import Image from 'next/image'
import ButtonDark from '../ReusableComponents/ButtonDark'
import { Link } from '@/routing'
import { useTranslations } from 'next-intl'

const NextTrip = () => {
  const translations = useTranslations('NextTrip')
  const Regiones = translations.raw('items')
  return (
    <div className="p-24 sm:p-64 flex flex-col items-center space-y-48 relative">
      <Image className='absolute left-64 top-256 sm:top-128 mt-32 scale-200 -z-10'
        src='/media/avioncito.png'
        alt='avion'
        width={100}
        height={100}
      />
      <SectionHeader
        header={translations('viajarProximamente')}
        subheader={translations('seleccionaDestino')}
      />
      <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-24'>
        {Regiones.map((region : any, index : number) => (
          <Card
            key={index}
            popular={region.popular}
            header={region.header}
            ISOCode={region.ISOCode}
            imgPath={region.imgPath}
            alt={region.alt}
          />
        ))}
      </div>
      <Link href='/destinos'>
        <ButtonDark extraClasses='px-48 py-9 whitespace-nowrap max-w-screen'>{translations('verTodos')}</ButtonDark>
      </Link>
    </div>
  )
}

export default NextTrip
