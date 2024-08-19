'use client';
import React from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link';
import { KeyboardArrowRight } from '@mui/icons-material';

const Breadcrumbs = () => {
    const pathname = usePathname();
    const pathSegments = pathname.split('/').filter(segment => segment !== '');

    const transformUrl : Function =  (url : string) =>  {
        let sentence = url.replace(/-/g, ' ');
        sentence = sentence.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
        return sentence;
    }
  
    return (
      <nav aria-label='Breadcrumb' className='py-10 px-64 border-b-custom'>
        <ol className="flex items-center space-x-12">
          <li>
            <Link href="/" className="font-medium">
              Inicio
            </Link>
          </li>
          {pathSegments.map((segment, index) => {
            const href = `/${pathSegments.slice(0, index + 1).join('/')}`;
            const isLast = index === pathSegments.length - 1;
  
            return (
              <li key={href} className="flex items-center space-x-12">
                <KeyboardArrowRight/>
                  {isLast ? (
                    <span className="font-semibold text-primary">{transformUrl(segment)}</span>
                  ) : (
                    <Link href={href} className="font-medium">
                      {transformUrl(segment)}
                    </Link>
                  )}
              </li>
            );
          })}
        </ol>
      </nav>
    );
  };

export default Breadcrumbs
