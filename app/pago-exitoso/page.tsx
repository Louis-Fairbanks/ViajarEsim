
import React from 'react'
import PostData from './PostData';

type SearchParamsType = {
  nombre: string;
  apellido: string;
  correo: string;
  planes: string;
};

const page = ( { searchParams } : { searchParams : SearchParamsType }) => {

    if(searchParams === undefined) {
      return
    }
    const nombre : string = searchParams.nombre;
    const correo : string = searchParams.correo;
    const apellido : string = searchParams.apellido;

    const body = JSON.stringify({
      nombre,
      apellido,
      correo,
      planes: searchParams.planes
    })

  return (
    <div>
      <PostData body={body} />
        <h1>Pago exitoso</h1>
        <p>Gracias por tu compra {nombre}</p>
        <p>Ya recibirás tu eSIM en el correo electrónico {correo}</p>
    </div>
  )
}

export default page
