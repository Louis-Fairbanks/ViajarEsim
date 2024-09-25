'use client';
import React from 'react'
import { usePathname } from 'next/navigation'
import { Link } from '@/routing';
import { KeyboardArrowRight } from '@mui/icons-material';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';

const Breadcrumbs = () => {

    const translations = useTranslations('Breadcrumbs');
    const locale= useLocale();

    const pathname = usePathname();
    const pathSegments = pathname.split('/').filter(segment => segment !== '' && segment !== locale);

    const transformUrl : Function =  (url : string) =>  {
        let sentence = url.replace(/-/g, ' ');
        sentence = sentence.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
        return sentence;
    }
  
    return (
      <nav aria-label='Breadcrumb' className='py-10 -mt-10 lg:mt-0 px-64 border-b-custom bg-background'>
        <ol className="flex items-center space-x-12 ">
          <li>
            <Link href="/" className="font-medium">
              {translations('inicio')}
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
