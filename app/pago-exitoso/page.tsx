'use client'
import React, { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'


const page = () => {

    const searchParams = useSearchParams();
    const nombre = searchParams.get('nombre');
    const correo = searchParams.get('correo');
    
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
