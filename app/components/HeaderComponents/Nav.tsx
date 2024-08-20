import React from 'react'
import HeaderNavLink from './HeaderNavLink';
import Search from '../ReusableComponents/Search';

interface Props {
    destinationsClicked: boolean
}

const Nav = ({ destinationsClicked }: Props) => {
    return (
        <div className={`flex space-x-32 ${destinationsClicked ? 'w-1/2' : ''}`}>
            {!destinationsClicked &&
                <>
                    <HeaderNavLink href='/destinos' text='Destinos' />
                    <HeaderNavLink href='/que-es-una-esim' text='¿Qué es una eSIM?' />
                    <HeaderNavLink href='/acerca-de-nosotros' text='Acerca de nosotros' />
                    <HeaderNavLink href='/centro-de-ayuda' text='Centro de ayuda' /></>}
            {destinationsClicked && <Search extraClasses='w-full' unstyledSearchbar={true}/>}
        </div>
    )
}

export default Nav
