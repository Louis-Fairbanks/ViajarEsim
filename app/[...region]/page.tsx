import React from 'react'
import { notFound } from 'next/navigation'
import Breadcrumbs from '../components/HeaderComponents/Breadcrumbs';
import Image from 'next/image';
import PaymentMethods from '../components/HomeSections/PaymentMethods';
import WhyUseSim from '../components/ReusableComponents/WhyUseSim';
import Footer from '../components/HomeSections/Footer';
import FooterAbove from '../components/HomeSections/FooterAbove';
import HowToActivate from '../components/ReusableComponents/HowToActivate';
import Benefits from '../components/HomeSections/Benefits';
import SectionHeader from '../components/ReusableComponents/SectionHeader';
import AdvantageBlurb from '../components/ReusableComponents/AdvantageBlurb';
import FastAndReliable from '../components/ReusableComponents/FastAndReliable';
import DestinationMain from './DestinationMain';
import TopBarAndHeader from '../components/HeaderComponents/TopBarAndHeader';

const page = () => {

  return (
    <>
      <div className='flex flex-col min-h-screen overflow-x-hidden'>
        <TopBarAndHeader />
        <Breadcrumbs />
        <div className='relative'>
          <Image className='lg:hidden absolute left-0 w-screen -top-128 -z-10'
            src='/media/destinos-top.svg'
            alt=''
            width={100}
            height={20}
          />
        </div>
        <DestinationMain />
      </div>
      <PaymentMethods />
      <WhyUseSim backgroundColor='yellow' />
      <div className='p-64 flex flex-col space-y-48 relative'>
        <Image className='absolute left-0 top-0 -z-10'
          src='/media/avioncito.png'
          alt=''
          height={300}
          width={300}
        />
        <SectionHeader title='beneficios' header='Lo que debes saber acerca de las eSIM' />
        <div className='flex flex-col lg:flex-row lg:space-x-128'>
          <AdvantageBlurb heading='Internet ilimitado' imgPath='/media/mobius.svg'
            info="ViajareSIM te ofrece planes de datos ilimitados para mantenerte conectado en cualquier parte del mundo" />
          <AdvantageBlurb heading='Sigue usando tus apps favoritas' imgPath='/media/portapapeles.svg'
            info='Pide transporte seguro hasta tu hotel, descubre los mejores restaurantes, mantente conectado' />
          <AdvantageBlurb heading='Mantienes tu número de WhatsApp de siempre' imgPath='/media/planta.svg'
            info='Puedes llamar y enviar mensajes a tus contactos de WhatsApp como si estuvieses en tu país.' />
        </div>
      </div>
      <FastAndReliable />
      <HowToActivate />
      <div className='p-24 sm:p-64 '>
        <div className='overflow-hidden xl:overflow-visible bg-green-gradient rounded-2xl px-48 pb-24 pt-48 xl:py-64 flex flex-col gap-y-16 relative text-center xl:text-start'>
          <h1 className='font-semibold text-large-heading leading-body'>Te enviaremos la eSIM a tu correo electrónico.</h1>
          <p className='w-full xl:w-1/2'>Una vez completes la compra, recibirás las instrucciones para instalar y activar tu eSIM para viajes internacionales. ¡Estarás listo para disfrutar de Internet ilimitado en tu próxima aventura!</p>
          <Image className='absolute  bottom-0 hidden xl:block xl:right-0 xl:scale-100'
            src='/media/destinos1.png'
            alt='persona sacando una foto junto a un edifico'
            height={338}
            width={487}
          />
          <Image className='absolute left-0 -top-24 xl:hidden'
          src='/media/nube.png'
          alt=''
          width={200}
          height={200} 
          />
        </div>
      </div>
      <Benefits />
      <FooterAbove />
      <Footer />
    </>
  )
}

export default page
