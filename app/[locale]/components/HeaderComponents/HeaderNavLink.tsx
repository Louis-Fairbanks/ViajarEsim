'use client';

import { usePathname } from 'next/navigation'
import React from 'react'
import { Link } from '@/routing';

interface Props {
    href: string
    text: string
}

const HeaderNavLink = ({href, text}: Props) => {
    const pathname = usePathname()
    const isActive = pathname === href

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