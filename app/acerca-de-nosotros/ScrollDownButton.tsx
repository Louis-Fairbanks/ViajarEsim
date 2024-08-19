'use client';
import React from 'react'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ButtonDark from '../components/ReusableComponents/ButtonDark';

const ScrollDownButton = () => {
    const scrollToSection = () => {
        const section: HTMLElement | null = document.querySelector('.scrollableSection');
        if (!section) return;
        else { section.scrollIntoView({ behavior: 'smooth' }); }
    };

    return (
        <div onClick={scrollToSection}>
            <ButtonDark extraClasses='w-48 h-48'>
                <KeyboardArrowDownIcon style={{ fill: '#fff' }} />
            </ButtonDark>
        </div>
    )
}

export default ScrollDownButton
