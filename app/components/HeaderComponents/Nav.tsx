import React from 'react'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import HeaderNavLink from './HeaderNavLink';

const Nav = () => {
    return (
        <div className='flex space-x-32'>
            <li className='flex items-center space-x-8'><span>Destinos</span>
                <KeyboardArrowDownIcon/>
            </li>
            <HeaderNavLink href='/que-es-una-esim' text='¿Qué es una eSIM?'/>
            <HeaderNavLink href='/acerca-de-nosotros' text='Acerca de nosotros'/>
            <HeaderNavLink href='/contacto' text='Centro de ayuda'/>            
        </div>
    )
}

export default Nav
