import Link from 'next/link'
import React from 'react'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const Nav = () => {
    return (
        <div className='flex space-x-32'>
            <li className='flex items-center space-x-8'><span>Destinos</span>
                <KeyboardArrowDownIcon/>
            </li>
            <Link
                href='/quienes-somos'
            >Quienes Somos</Link>
            <Link href='/que-es-una-esim'>
                ¿Qué es una eSIM?
            </Link>
            <Link href='/faqs'>
                FaQs
            </Link>
            <Link href='/contacto'>
                Contactanos
            </Link>
        </div>
    )
}

export default Nav
