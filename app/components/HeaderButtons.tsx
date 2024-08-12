'use client';
import React from 'react'
import dynamic from 'next/dynamic';
import Button from './Button';

const Search = dynamic(() => import('@material-ui/icons/Search'), { ssr: false });
const Language = dynamic(() => import('@material-ui/icons/Language'), { ssr: false });
const Cart = dynamic(() => import('@material-ui/icons/ShoppingCartOutlined'), { ssr: false });

const HeaderButtons = () => {
    return (
        <div className='flex space-x-16 items-center'>
            <button className='px-32 py-9 bg-primary rounded-custom font-semibold text-background'>Ver destinos</button>
            <hr className='roate-90 h-16 w-2 bg-light-button-border'></hr>
            <div className='flex space-x-16'>
                <Button><Search style={{fill: '#C7C7C7'}}/></Button>
                <Button><Language style={{fill: '#C7C7C7'}}/></Button>
                <Button><Cart style={{fill: '#C7C7C7'}}/></Button>
            </div>
        </div>
    )
}

export default HeaderButtons
