import React from 'react'
import { Link } from '@/routing'
import { useTranslations } from 'next-intl'

const Sitemap = () => {

    const translations = useTranslations('Footer')
    const navTranslations = useTranslations('Nav')

    return (
        <div className='flex space-x-24 sm:space-x-32 xl:space-x-64 justify-start items-start'>
            <div className='flex flex-col space-y-32'>
                <h4 className='font-medium mb-16'>{translations('legal')}</h4>
                <Link href='/terminos-y-condiciones'><p>{translations('tyc')}</p></Link>
                <Link href='/politica-de-privacidad'><p>{translations('privacidad')}</p></Link>
            </div>
            <div className='flex flex-col space-y-32'>
                <h4 className='font-medium mb-16'>{navTranslations('utilidad')}</h4>
                <Link href='/destinos'><p>{navTranslations('destinos')}</p></Link>
                <Link href='que-es-una-esim'><p>{navTranslations('queEsUnaeSIM')}</p></Link>
                <Link href='/acerca-de-nosotros'><p>{navTranslations('acerca')}</p></Link>
                <Link href='/centro-de-ayuda'><p>{navTranslations('centroDeAyuda')}</p></Link>
                <Link href='/como-instalar-una-esim'><p>{navTranslations('comoInstalarUnaeSIM')}</p></Link>
            </div>
            <div className='flex flex-col space-y-32'>
                <h4 className='font-medium mb-16'>{translations('topDestinos')}</h4>
                <Link href='/estados-unidos'>
                    <p>{translations('estadosUnidos')}</p>
                </Link>
                <Link href='/canada'>
                    <p>{translations('canada')}</p>
                </Link>
                <Link href='/turquia'>
                    <p>{translations('turquia')}</p>
                </Link>
                <Link href='/francia'>
                <p>{translations('francia')}</p>
                </Link>
                <Link href='/espana'>
                <p>{translations('espana')}</p>
                </Link>
            </div>
        </div>
    )
}

export default Sitemap
