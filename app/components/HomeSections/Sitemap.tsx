import React from 'react'
import Link from 'next/link'

const Sitemap = () => {
    return (
        <div className='flex space-x-24 sm:space-x-48 md:space-x-64 xl:space-x-128 items-end'>
            <div className='flex flex-col space-y-32'>
                <h4 className='font-medium mb-16'>Utilidad</h4>
                <Link href='/destinos'><p>Destinos</p></Link>
                <Link href='que-es-una-esim'><p>¿Qué es una eSIM?</p></Link>
                <Link href='/acerca-de-nosotros'><p>Acerca de nosotros</p></Link>
                <Link href='/centro-de-ayuda'><p>Centro de ayuda</p></Link>
                <p>Como instalar una eSIM</p>
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
