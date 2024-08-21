import React from 'react'
import Search from '../ReusableComponents/Search'
import HeaderNavLink from './HeaderNavLink'
import { KeyboardArrowRight } from '@mui/icons-material'
import ButtonDark from '../ReusableComponents/ButtonDark'
import ButtonLight from '../ReusableComponents/ButtonLight'
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';


interface Props {
    setActivatedSidebar: React.Dispatch<React.SetStateAction<string>>
}

const MobileMenu = ({ setActivatedSidebar } : Props) => {
    return (
        <div className='border-t-custom flex flex-col space-y-12 py-12 mt-12'>
            <Search extraClasses='w-full' unstyledSearchbar={true} />
            <div className='border-b-custom flex justify-between items-center pb-12'>
                <HeaderNavLink href='/destinos' text='Destinos' />
                <KeyboardArrowRight />
            </div>
            <div className='border-b-custom flex justify-between items-center pb-12'>
                <HeaderNavLink href='/que-es-una-esim' text='¿Qué es una eSIM?' />
                <KeyboardArrowRight />
            </div>
            <div className='border-b-custom flex justify-between items-center pb-12'>
                <HeaderNavLink href='/acerca-de-nosotros' text='Acerca de nosotros' />
                <KeyboardArrowRight />
            </div>
            <div className='border-b-custom flex justify-between items-center pb-12'>
                <HeaderNavLink href='/centro-de-ayuda' text='Centro de ayuda' />
                <KeyboardArrowRight />
            </div>
            <div className='border-b-custom pb-12'>
                <ButtonDark extraClasses='py-8 w-full'>Ver destinos</ButtonDark>
            </div>
            <ButtonLight extraClasses='py-8 flex gap-x-8 justify-center'
            onClick={() => setActivatedSidebar('Selecciona tu lenguaje')}><LanguageOutlinedIcon />EN - EUR (€)</ButtonLight>
            <ButtonLight extraClasses='py-8 flex gap-x-8 justify-center' onClick={() => setActivatedSidebar('Lista de deseados')}>
                <FavoriteBorderIcon />Lista de deseados</ButtonLight>
        </div >
    )
}

export default MobileMenu