import React from 'react'
import HeaderNavLink from './HeaderNavLink';
import Search from '../ReusableComponents/Search';

interface Props {
    destinationsClicked: boolean
}

const Nav = ({ destinationsClicked }: Props) => {
    return (
        <div className={`flex space-x-32 ${destinationsClicked ? 'xl:w-1/2 md:w-1/3' : ''}`}>
            {!destinationsClicked &&
                <>
                    <div className='hidden xl:block'><HeaderNavLink href='/destinos' text='Destinos' /></div>
                    <HeaderNavLink href='/que-es-una-esim' text='¿Qué es una eSIM?' />
                    <HeaderNavLink href='/acerca-de-nosotros' text='Acerca de nosotros' />
                    <HeaderNavLink href='/centro-de-ayuda' text='Centro de ayuda' /></>}
            {destinationsClicked && <Search extraClasses='w-full' unstyledSearchbar={true}/>}
        </div>
    )
}

export default Nav
