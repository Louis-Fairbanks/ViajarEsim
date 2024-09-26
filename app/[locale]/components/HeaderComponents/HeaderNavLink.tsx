'use client';

import { usePathname } from 'next/navigation'
import React from 'react'
import { Link } from '@/routing';
import { useLocale } from 'next-intl';

interface Props {
    href: string
    text: string
}

const HeaderNavLink = ({href, text}: Props) => {
    const pathname = usePathname()
    const locale = useLocale();
    const pathNameWithoutLocale = pathname.replace('/' + locale, '');
    let isActive = false;

    switch(href){
        case  '/destinos' : if(pathNameWithoutLocale === '/destinos') isActive = true; break;
        case  '/que-es-una-esim' : if(pathNameWithoutLocale === '/que-es-una-esim') isActive = true; break;
        case  '/acerca-de-nosotros' : if(pathNameWithoutLocale === '/acerca-de-nosotros') isActive = true; break;
        case  '/centro-de-ayuda' : if(pathNameWithoutLocale === '/centro-de-ayuda') isActive = true; break;
        case  '/como-instalar-una-esim' : if(pathNameWithoutLocale === '/como-instalar-una-esim') isActive = true; break;
        default: isActive = false;
    }


    return (
        <div>
            <Link
                href={href}
                className={`${isActive ? 'text-primary font-semibold' : ''}`}    
            >
                {text}
            </Link>
        </div>
    )
}

export default HeaderNavLink