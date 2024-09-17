import React from 'react'
import TopBar from '../components/HeaderComponents/TopBar';
import Footer from '../components/HomeSections/Footer';
import FooterAbove from '../components/HomeSections/FooterAbove';
import MainPaymentSuccessSection from './MainPaymentSuccessSection';

type SearchParamsType = {
  nombre: string;
  apellido: string;
  correo: string;
  celular: string;
  planes: string;
  payment_intent: string;
  descuentoAplicado : string;
};


const page = ({ searchParams }: { searchParams: SearchParamsType }) => {

  if (searchParams === undefined) {
    return
  }
  const nombre: string = searchParams.nombre;
  const correo: string = searchParams.correo;
  const apellido: string = searchParams.apellido;
  const celular: string = searchParams.celular;
  const paymentIntent: string = searchParams.payment_intent
  const descuentoAplicado: string = searchParams.descuentoAplicado

  const body = JSON.stringify({
    nombre,
    apellido,
    correo,
    celular,
    paymentIntent,
    descuentoAplicado,
    planes: searchParams.planes
  })

  return (
    <>
      <TopBar />
    <MainPaymentSuccessSection body={body} planes={searchParams.planes} descuentoAplicado={descuentoAplicado} correo={correo}/>
      <FooterAbove alternateCopy={true} hideButton={true} />
      <Footer />
    </>
  )
}

export default page
