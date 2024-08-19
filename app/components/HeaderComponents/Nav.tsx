import React from 'react'
import HeaderNavLink from './HeaderNavLink';

const Nav = () => {
    return (
        <div className='flex space-x-32'>
            <HeaderNavLink href='/destinos' text='Destinos'/>
            <HeaderNavLink href='/que-es-una-esim' text='¿Qué es una eSIM?'/>
            <HeaderNavLink href='/acerca-de-nosotros' text='Acerca de nosotros'/>
            <HeaderNavLink href='/centro-de-ayuda' text='Centro de ayuda'/>            
        </div>
    )
}

export default Nav
