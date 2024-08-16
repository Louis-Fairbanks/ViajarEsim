'use client';

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

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