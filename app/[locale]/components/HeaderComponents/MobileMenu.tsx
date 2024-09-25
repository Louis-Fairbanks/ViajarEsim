'use client'
import React from 'react'
import Search from '../ReusableComponents/Search'
import HeaderNavLink from './HeaderNavLink'
import { KeyboardArrowRight } from '@mui/icons-material'
import ButtonDark from '../ReusableComponents/ButtonDark'
import ButtonLight from '../ReusableComponents/ButtonLight'
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import { useShopping } from '../ShoppingContext/ShoppingContext'
import { useTranslations } from 'next-intl'


const MobileMenu = () => {

    const { setOpenedSidebar } = useShopping();
    const translations = useTranslations('Header')
    const navTranslations = useTranslations('Nav')

    return (
        <div className='border-t-custom flex flex-col space-y-12 py-12 mt-12' >
            <Search extraClasses='w-full' unstyledSearchbar={true} callAPIimmediately={true}/>
            <div className='border-b-custom flex justify-between items-center pb-12'
            onClick={() => setOpenedSidebar('')}>
                <HeaderNavLink href='/destinos' text={navTranslations('destinos')} />
                <KeyboardArrowRight />
            </div>
            <div className='border-b-custom flex justify-between items-center pb-12'
            onClick={() => setOpenedSidebar('')}>
                <HeaderNavLink href='/que-es-una-esim' text={navTranslations('queEsUnaeSIM')} />
                <KeyboardArrowRight />
            </div>
            <div className='border-b-custom flex justify-between items-center pb-12'
            onClick={() => setOpenedSidebar('')}>
                <HeaderNavLink href='/acerca-de-nosotros' text={navTranslations('acerca')} />
                <KeyboardArrowRight />
            </div>
            <div className='border-b-custom flex justify-between items-center pb-12'
            onClick={() => setOpenedSidebar('')}>
                <HeaderNavLink href='/centro-de-ayuda' text={navTranslations('centroDeAyuda')} />
                <KeyboardArrowRight />
            </div>
            <div className='border-b-custom flex justify-between items-center pb-12'
            onClick={() => setOpenedSidebar('')}>
                <HeaderNavLink href='/como-instalar-una-esim' text={navTranslations('comoInstalarUnaeSIM')} />
                <KeyboardArrowRight />
            </div>
            <div className='border-b-custom pb-12'>
                <ButtonDark extraClasses='py-8 w-full'>{navTranslations('verDestinos')}</ButtonDark>
            </div>
            <ButtonLight extraClasses='py-8 flex gap-x-8 justify-center'
            onClick={() => setOpenedSidebar(translations('seleccionaTuLenguaje'))}><LanguageOutlinedIcon />EN - EUR (€)</ButtonLight>
            {/* <ButtonLight extraClasses='py-8 flex gap-x-8 justify-center' onClick={() => setActivatedSidebar('Lista de deseados')}>
                <FavoriteBorderIcon />Lista de deseados</ButtonLight> */}
        </div >
    )
}

export default MobileMenu
