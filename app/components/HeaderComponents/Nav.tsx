import Link from 'next/link'
import React from 'react'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const Nav = () => {
    return (
        <ul className='flex space-x-32'>
            <li className='flex items-center space-x-8'><span>Destinos</span>
                <KeyboardArrowDownIcon/>
            </li>
            <Link
                href='/quienes-somos'
            >Quienes Somos</Link>
            <li>
                ¿Qué es una eSIM?
            </li>
            <li>
                FaQs
            </li>
            <li>
                Contactanos
            </li>
        </ul>
    )
}

export default Nav
