'use client'
import React from 'react'
import Search from '../ReusableComponents/Search'
import HeaderNavLink from './HeaderNavLink'
import { KeyboardArrowRight } from '@mui/icons-material'
import ButtonDark from '../ReusableComponents/ButtonDark'
import ButtonLight from '../ReusableComponents/ButtonLight'
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import { useShopping } from '../ShoppingContext/ShoppingContext'


const MobileMenu = () => {

    const { setOpenedSidebar } = useShopping();

    return (
        <div className='border-t-custom flex flex-col space-y-12 py-12 mt-12' >
            <Search extraClasses='w-full' unstyledSearchbar={true} callAPIimmediately={true}/>
            <div className='border-b-custom flex justify-between items-center pb-12'
            onClick={() => setOpenedSidebar('')}>
                <HeaderNavLink href='/destinos' text='Destinos' />
                <KeyboardArrowRight />
            </div>
            <div className='border-b-custom flex justify-between items-center pb-12'
            onClick={() => setOpenedSidebar('')}>
                <HeaderNavLink href='/que-es-una-esim' text='¿Qué es una eSIM?' />
                <KeyboardArrowRight />
            </div>
            <div className='border-b-custom flex justify-between items-center pb-12'
            onClick={() => setOpenedSidebar('')}>
                <HeaderNavLink href='/acerca-de-nosotros' text='Acerca de nosotros' />
                <KeyboardArrowRight />
            </div>
            <div className='border-b-custom flex justify-between items-center pb-12'
            onClick={() => setOpenedSidebar('')}>
                <HeaderNavLink href='/centro-de-ayuda' text='Centro de ayuda' />
                <KeyboardArrowRight />
            </div>
            <div className='border-b-custom flex justify-between items-center pb-12'
            onClick={() => setOpenedSidebar('')}>
                <HeaderNavLink href='/como-instalar-una-esim' text='Cómo instalar una eSIM' />
                <KeyboardArrowRight />
            </div>
            <div className='border-b-custom pb-12'>
                <ButtonDark extraClasses='py-8 w-full'>Ver destinos</ButtonDark>
            </div>
            <ButtonLight extraClasses='py-8 flex gap-x-8 justify-center'
            onClick={() => setOpenedSidebar('Selecciona tu lenguaje')}><LanguageOutlinedIcon />EN - EUR (€)</ButtonLight>
            {/* <ButtonLight extraClasses='py-8 flex gap-x-8 justify-center' onClick={() => setActivatedSidebar('Lista de deseados')}>
                <FavoriteBorderIcon />Lista de deseados</ButtonLight> */}
        </div >
    )
}

export default MobileMenu
