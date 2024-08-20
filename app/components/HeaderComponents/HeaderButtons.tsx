'use client';
import React from 'react'
import HeaderButton from '../ReusableComponents/HeaderButton';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import CloseIcon from '@mui/icons-material/Close';
import ButtonDark from '../ReusableComponents/ButtonDark';
import Link from 'next/link';

interface Props{
    destinationsClicked : boolean
    setDestinationsClicked : React.Dispatch<React.SetStateAction<boolean>>
}

const HeaderButtons = ( {destinationsClicked, setDestinationsClicked} : Props) => {
    return (
        <div className='flex space-x-16 items-center'>
            <Link href='/destinos'>
                <ButtonDark extraClasses='px-32 py-9'>Ver destinos</ButtonDark>
            </Link>
            <hr className='roate-90 h-16 w-2 bg-light-button-border'></hr>
            <div className='flex space-x-16'>
                <HeaderButton>
                    {destinationsClicked ? <CloseIcon style={{fill : '#C7C7C7'}} onClick={() => setDestinationsClicked(false)}/> :
                    <SearchIcon style={{ fill: '#C7C7C7' }} onClick={() => setDestinationsClicked(true)}
                    />}
                </HeaderButton>
                <HeaderButton><LanguageOutlinedIcon style={{ fill: '#C7C7C7' }} /></HeaderButton>
                <HeaderButton><FavoriteBorderIcon style={{ fill: '#C7C7C7' }} /></HeaderButton>
                <HeaderButton><ShoppingCartOutlinedIcon style={{ fill: '#C7C7C7' }} /></HeaderButton>
            </div>
        </div>
    )
}

export default HeaderButtons
