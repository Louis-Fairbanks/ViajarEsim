'use client'
import React from 'react'
import { useParams } from 'next/navigation';

const page = () => {

    const params = useParams();

  return (
    <div>
        <h1>Pago exitoso</h1>
        <p>Gracias por tu compra {params[0]}</p>
    </div>
  )
}

export default page
