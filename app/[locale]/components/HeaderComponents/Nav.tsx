import React from 'react'
import HeaderNavLink from './HeaderNavLink';
import Search from '../ReusableComponents/Search';
import { useTranslations } from 'next-intl';

interface Props {
    destinationsClicked: boolean
}

const Nav = ({ destinationsClicked }: Props) => {

    const translations = useTranslations('Nav')

    return (
        <div className={`hidden lg:flex lg:space-x-16 xl:space-x-32 ${destinationsClicked ? 'xl:w-1/2 md:w-1/3' : ''}`}>
            {!destinationsClicked &&
                <>
                    <div className='hidden 2xl:block'><HeaderNavLink href='/destinos' text={translations('destinos')} /></div>
                    <HeaderNavLink href='/que-es-una-esim' text={translations('queEsUnaeSIM')} />
                    <HeaderNavLink href='/acerca-de-nosotros' text={translations('acerca')} />
                    <HeaderNavLink href='/centro-de-ayuda' text={translations('centroDeAyuda')} />
                    <HeaderNavLink href='/como-instalar-una-esim' text={translations('comoInstalarUnaeSIM')} /></>
                    }
            {destinationsClicked && <Search extraClasses='w-full' unstyledSearchbar={true} callAPIimmediately={destinationsClicked}/>}
        </div>
    )
}

export default Nav
