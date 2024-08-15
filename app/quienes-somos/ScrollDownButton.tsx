'use client';
import React, { DOMElement } from 'react'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const ScrollDownButton = () => {
    const scrollToSection = () => {
        const section : HTMLElement | null = document.querySelector('.scrollableSection');
        if(!section) return;
        else {section.scrollIntoView({ behavior: 'smooth' });}
    };

    return (
        <button className='rounded-custom bg-primary w-48 h-48' onClick={scrollToSection}>
            <KeyboardArrowDownIcon style={{ fill: '#fff' }} />
        </button>
    )
}

export default ScrollDownButton
