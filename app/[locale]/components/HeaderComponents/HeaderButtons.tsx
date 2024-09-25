'use client';
import React, { useEffect, useState } from 'react'
import HeaderButton from './HeaderButton';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import CloseIcon from '@mui/icons-material/Close';
import ButtonDark from '../ReusableComponents/ButtonDark';
import { Link } from '@/routing';
import { useShopping } from '../ShoppingContext/ShoppingContext';
import { useTranslations } from 'next-intl';

interface Props {
    destinationsClicked: boolean
    setDestinationsClicked: React.Dispatch<React.SetStateAction<boolean>>
}

const HeaderButtons = ({ destinationsClicked, setDestinationsClicked }: Props) => {

    const translations = useTranslations('Nav')
    const headerTranslations = useTranslations('Header')

    const { cartItems, setOpenedSidebar } = useShopping();

    const [totalItems, setTotalItems] = useState<number>();

    useEffect(() => {
        setTotalItems(cartItems.length)
    }, [])

    useEffect(() => {
        setTotalItems(cartItems.length)
    }, [cartItems])

    return (
        <div className='hidden lg:flex space-x-16 lg:space-x-8 xl:space-x-16 items-center'>
            <Link href='/destinos'>
                <ButtonDark extraClasses='px-32 lg:px-8 xl:px-32 py-9'>{translations('verDestinos')}</ButtonDark>
            </Link>
            <hr className='h-16 w-2 bg-light-button-border'></hr>
            <div className='flex space-x-16 lg:space-x-8 xl:space-x-16'>
                <HeaderButton>
                    {destinationsClicked ? <CloseIcon style={{ fill: '#C7C7C7' }} onClick={() => setDestinationsClicked(false)} /> :
                        <SearchIcon style={{ fill: '#C7C7C7' }} onClick={() => setDestinationsClicked(true)}
                        />}
                </HeaderButton>
                <HeaderButton onClick={() => {
                    setOpenedSidebar(headerTranslations('seleccionaTuLenguaje'))
                }}>
                    <LanguageOutlinedIcon style={{ fill: '#C7C7C7' }} />
                </HeaderButton>
                <HeaderButton onClick={() => {
                    setOpenedSidebar(headerTranslations('carrito'))
                }} extraClasses='relative'
                ><ShoppingCartOutlinedIcon className='text-light-button-border'>
                </ShoppingCartOutlinedIcon>
                {totalItems && totalItems > 0 ? <div className='absolute rounded-full h-16 w-16 flex items-center justify-center
                bg-alert right-2 top-2 text-small font-semibold text-background'>
                        {totalItems}</div> : ''}
                </HeaderButton>
            </div>
        </div>
    )
}

export default HeaderButtons
