
import React from 'react'
import PostData from './PostData';
import TopBar from '../components/HeaderComponents/TopBar';
import Footer from '../components/HomeSections/Footer';
import FooterAbove from '../components/HomeSections/FooterAbove';
import Image from 'next/image';
import Link from 'next/link';
import CartSummary from '../pago/CartSummary';

type SearchParamsType = {
  nombre: string;
  apellido: string;
  correo: string;
  planes: string;
};

const page = ({ searchParams }: { searchParams: SearchParamsType }) => {

  if (searchParams === undefined) {
    return
  }
  const nombre: string = searchParams.nombre;
  const correo: string = searchParams.correo;
  const apellido: string = searchParams.apellido;

  const body = JSON.stringify({
    nombre,
    apellido,
    correo,
    planes: searchParams.planes
  })

  return (
    <>
      <TopBar />
      <div className='h-screen'>
        <div className='flex px-32 py-16 justify-center lg:justify-between items-center flex-shrink-0 border-b-custom border-accent'>
          <Link href='/'>
            <div className='flex space-x-8 items-center text-subheading'>
              <Image
                src='/media/favicon.png'
                alt='logo viajar esim'
                width={36}
                height={36}
              />
              <h1 className='font-semibold'>ViajareSIM</h1>
            </div>
          </Link>
        </div>
        <div className='flex p-64 space-x-48'>
          {/* <PostData body={body} /> */}
          <div className='flex flex-col p-24 border-custom rounded-custom space-y-16 items-center text-center w-2/3'>
            <div className='relative'>
              <div className='z-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                <Image className='-mt-6 ml-6'
                  src='/media/check.svg'
                  alt='Check'
                  width={40}
                  height={30}
                />
              </div>
              <Image src='/media/compra-realizada.png'
                alt='Compra realizada'
                width={100}
                height={100}
              />
            </div>
            <h1 className='font-semibold text-heading'>¡Muchas gracias!</h1>
            <p>En breves recibiras nuestro correo electronico, entregandote toda la información necesaria para que puedas instalar y activar tu eSIM en el momento que la necesites.</p>
            <Link href='/que-es-una-esim' className='underline text-primary text-bold'>¿No sabes instalar/activar tu eSIM?</Link>
            <h2 className='font-semibold text-subheading'>Datos de facturación</h2>
            <div className='border-custom rounded-custom w-full px-24 py-12 text-start'>
              <span className='text-text-faded mr-12'>Contacto</span> {correo}
            </div>
          </div>
          <CartSummary />
        </div>
      </div>
      <FooterAbove />
      <Footer />
    </>
  )
}

export default page
