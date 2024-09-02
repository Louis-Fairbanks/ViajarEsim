
import React, { useEffect } from 'react'

type SearchParamsType = {
  nombre: string;
  correo: string;
};

const page = ( { searchParams } : { searchParams : SearchParamsType }) => {

    if(searchParams === undefined) {
      return
    }
    console.log(searchParams)
    const nombre : string = searchParams.nombre;
    const correo : string = searchParams.correo;
    
    // useEffect(() => {
    //     if (!nombre || !correo) {
    //         window.location.href = '/pago';
    //     }
    //     const sendeSIM = async () => {
    //       fetch('/api/enviar-esim', {
    //       })
    //     }
    // })

  return (
    <div>
        <h1>Pago exitoso</h1>
        <p>Gracias por tu compra {nombre}</p>
        <p>Ya recibirás tu eSIM en el correo electrónico {correo}</p>
    </div>
  )
}

export default page
