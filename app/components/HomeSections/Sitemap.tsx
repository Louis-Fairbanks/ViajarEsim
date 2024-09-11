import React from 'react'
import Link from 'next/link'

const Sitemap = () => {
    return (
        <div className='flex space-x-24 sm:space-x-32 xl:space-x-64 justify-start items-start'>
            <div className='flex flex-col space-y-32'>
                <h4 className='font-medium mb-16'>Legal</h4>
                <Link href='/terminos-y-condiciones'><p>Términos y condiciones</p></Link>
                <Link href='/politica-de-privacidad'><p>Política de privacidad</p></Link>
            </div>
            <div className='flex flex-col space-y-32'>
                <h4 className='font-medium mb-16'>Utilidad</h4>
                <Link href='/destinos'><p>Destinos</p></Link>
                <Link href='que-es-una-esim'><p>¿Qué es una eSIM?</p></Link>
                <Link href='/acerca-de-nosotros'><p>Acerca de nosotros</p></Link>
                <Link href='/centro-de-ayuda'><p>Centro de ayuda</p></Link>
                <Link href='/como-instalar-una-esim'><p>Como instalar una eSIM</p></Link>
            </div>
            <div className='flex flex-col space-y-32'>
                <h4 className='font-medium mb-16'>Top destinos</h4>
                <p>Estados Unidos</p>
                <p>Canadá</p>
                <p>Turquía</p>
                <p>Francia</p>
                <p>España</p>
            </div>
        </div>
    )
}

export default Sitemap
