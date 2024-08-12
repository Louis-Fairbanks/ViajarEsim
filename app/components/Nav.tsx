import React from 'react'

const Nav = () => {
    return (
        <ul className='flex space-x-32'>
            <li className='flex items-center space-x-8'><span>Destinos</span>
                <svg width="13" height="9" viewBox="0 0 13 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.23019 0.794922L6.82019 5.37492L11.4102 0.794922L12.8202 2.20492L6.82019 8.20492L0.82019 2.20492L2.23019 0.794922Z" fill="#121212" />
                </svg>
            </li>
            <li>
                Quienes Somos
            </li>
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
