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
  payment_intent?: string;
  paypal_order_id?: string;
  descuentoAplicado: string;
};

const decodeIfNeeded = (value: string): string => {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
};

const page = ({ searchParams }: { searchParams: SearchParamsType }) => {
  if (searchParams === undefined) {
    return null;
  }

  const nombre: string = decodeIfNeeded(searchParams.nombre);
  const correo: string = decodeIfNeeded(searchParams.correo);
  const apellido: string = decodeIfNeeded(searchParams.apellido);
  const celular: string = decodeIfNeeded(searchParams.celular);
  const descuentoAplicado: string = decodeIfNeeded(searchParams.descuentoAplicado);
  const planes: string = decodeIfNeeded(searchParams.planes);

  let body = '';
  if(searchParams.paypal_order_id) {
    body = JSON.stringify({
      nombre,
      apellido,
      correo,
      celular,
      paypalOrderId: searchParams.paypal_order_id,
      descuentoAplicado,
      planes
    });
  } else if(searchParams.payment_intent) {
    body = JSON.stringify({
      nombre,
      apellido,
      correo,
      celular,
      paymentIntent: searchParams.payment_intent,
      descuentoAplicado,
      planes
    });
  }

  console.log(body);

  return (
    <>
      <TopBar />
      <MainPaymentSuccessSection body={body} planes={planes} descuentoAplicado={descuentoAplicado} correo={correo}/>
      <FooterAbove alternateCopy={true} hideButton={true} />
      <Footer />
    </>
  )
}

export default page