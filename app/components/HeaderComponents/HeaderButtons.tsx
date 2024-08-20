'use client';
import React, { useState } from 'react'
import HeaderButton from '../ReusableComponents/HeaderButton';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import CloseIcon from '@mui/icons-material/Close';
import ButtonDark from '../ReusableComponents/ButtonDark';
import Link from 'next/link';
import Sidebar from './Sidebar';
import SavedItems from './SavedItems';
import LanguageAndCurrency from './LanguageAndCurrency';

interface Props {
    destinationsClicked: boolean
    setDestinationsClicked: React.Dispatch<React.SetStateAction<boolean>>
}

const HeaderButtons = ({ destinationsClicked, setDestinationsClicked }: Props) => {

    const [overlayActivated, setOverlayActivated] = useState<boolean>(false);
    const [activatedSidebar, setActivatedSidebar] = useState<string>('');

    return (
        <div className='flex space-x-16 items-center'>
            <div className={`fixed top-0 left-0 w-screen h-screen bg-text bg-opacity-60 transition-all duration-1000 ease-in-out
            ${overlayActivated ? 'z-50 opacity-100' : '-z-10 opacity-0'}`}
                onClick={() => {
                    setOverlayActivated(false)
                    setActivatedSidebar('')
                }}></div>
            <Sidebar header='Lista de deseados' children={<SavedItems />} setActivatedSidebar={setActivatedSidebar}
                selected={activatedSidebar === 'Lista de deseados'} setOverlayActivated={setOverlayActivated} />
            <Sidebar header='Carrito' children={<></>} setActivatedSidebar={setActivatedSidebar}
                selected={activatedSidebar === 'Carrito'} setOverlayActivated={setOverlayActivated} />
            <Sidebar header='Selecciona tu lenguaje' children={<LanguageAndCurrency />} selected={activatedSidebar === 'Selecciona tu lenguaje'}
                setActivatedSidebar={setActivatedSidebar} setOverlayActivated={setOverlayActivated} />
            <Link href='/destinos'>
                <ButtonDark extraClasses='px-32 py-9'>Ver destinos</ButtonDark>
            </Link>
            <hr className='roate-90 h-16 w-2 bg-light-button-border'></hr>
            <div className='flex space-x-16'>
                <HeaderButton>
                    {destinationsClicked ? <CloseIcon style={{ fill: '#C7C7C7' }} onClick={() => setDestinationsClicked(false)} /> :
                        <SearchIcon style={{ fill: '#C7C7C7' }} onClick={() => setDestinationsClicked(true)}
                        />}
                </HeaderButton>
                <HeaderButton onClick={() => {
                    setOverlayActivated(true)
                    setActivatedSidebar('Selecciona tu lenguaje')
                }}>
                    <LanguageOutlinedIcon style={{ fill: '#C7C7C7' }} />
                </HeaderButton>
                <HeaderButton onClick={() => {
                    setActivatedSidebar('Lista de deseados');
                    setOverlayActivated(true);
                }}
                ><FavoriteBorderIcon style={{ fill: '#C7C7C7' }} /></HeaderButton>
                <HeaderButton onClick={() => {
                    setOverlayActivated(true);
                    setActivatedSidebar('Carrito')
                }}
                ><ShoppingCartOutlinedIcon style={{ fill: '#C7C7C7' }} /></HeaderButton>
            </div>
        </div>
    )
}

export default HeaderButtons
