'use client'
import React from 'react'
import Image from 'next/image'
import ButtonDark from '../ReusableComponents/ButtonDark'
import { Link } from '@/routing'
import { useShopping } from '../ShoppingContext/ShoppingContext'
import { useTranslations } from 'next-intl'

interface Props {
  hideButton?: boolean
  alternateCopy?: boolean
}

const FooterAbove = ({ hideButton, alternateCopy }: Props) => {

  const translations = useTranslations('FooterAbove')

  const { cartItems } = useShopping()

  return (
    <div className='flex flex-col p-24 sm:p-64 space-y-48 relative'>
      <div className='flex flex-col rounded-2xl bg-custom-gradient items-center text-center space-y-16 px-24 py-48 md:p-48 relative overflow-hidden'>
        <h1 className='font-semibold text-subheading lg:text-large-heading w-full md:w-2/3 xl:w-1/2 leading-body'>
          {alternateCopy ? `${translations('alternateHeading')}`: `${translations('heading')}`}</h1>
        <p className='w-full md:w-2/3 xl:w-1/2'>{alternateCopy ? `${translations('alternateBody')}` : `${translations('body')}`}</p>
        {!hideButton && <Link href={`${cartItems.length > 0 ? '/pago' : '/destinos'}`}>
          <ButtonDark extraClasses='px-48 py-9 lg:w-full lg:whitespace-nowrap'>{translations('quieroMiESIM')}</ButtonDark>
        </Link>}
        <Image className='absolute -top-64 md:-top-32 md:left-0 scale-x-[-1] md:scale-x-100 -right-32'
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