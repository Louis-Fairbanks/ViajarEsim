'use client'
import React from 'react'
import "/node_modules/flag-icons/css/flag-icons.min.css"
import Image from 'next/image'
import GoNow from '../HomeSections/GoNow'
import styles from './FeaturedDeal.module.css'
import { Link } from '@/routing'
import slugify from 'slugify'
import { useTranslations } from 'next-intl'
import { useShopping } from '../ShoppingContext/ShoppingContext'

interface Props {
    popular: boolean;
    header: string;
    ISOCode: string;
    imgPath: string;
    alt: string;
}


const Card = (props: Props) => {

    const urlString = '/' + slugify(props.header, { lower : true})
    const translations = useTranslations('Card')

    const { preferredCurrency } = useShopping()

    return (
        <div className='relative'>
            <Link href={urlString}>
                {props.popular && <div className={styles.featuredDeal}><div className={styles.featuredDealBelow}></div>{translations('popular')}</div>}
                <div className='flex space-x-2 sm:space-x-24 border-custom rounded-custom items-center sm:pl-24 justify-between bg-background 
            hover:border-text-faded focus:border-text-faded active:border-card-pressed cursor-pointer overflow-hidden
            transition-all ease-linear duration-300 sm:w-full'>
                    <div className="relative w-65 h-65 overflow-hidden rounded-full border-custom scale-75 flex-shrink-0 pb-8 sm:scale-100">
                        <span className={`fi fi-${props.ISOCode} h-65 w-65 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 scale-150`}></span>
                    </div>
                    <div className='flex flex-col space-y-8 my-24'>
                        <h4 className='font-semibold text-subheading z-[1]'>{props.header}</h4>
                        <div className='flex space-x-6 whitespace-nowrap'>
                            <p>{translations('desde')} {new Intl.NumberFormat(preferredCurrency.locale_format, {
                        style: 'currency',
                        currency: preferredCurrency.name,
                        maximumFractionDigits: 2
                    }).format(5.3 * preferredCurrency.tasa)}</p>{
                        (preferredCurrency.name === 'EUR' || preferredCurrency.name === 'USD' || preferredCurrency.name === 'BRL') &&
                        <span className='text-text-faded text-small font-light'>{preferredCurrency.name}</span>}
                        </div>
                        <GoNow ctaText={translations('irAhora')} />
                    </div>
                    <Image className={`w-48 scale-200 sm:w-90 -ml-auto  -mb-48 sm:scale-125 ${props.ISOCode === 'eu' ? 'sm:translate-x-32 w-64 sm:w-128' : ''}`}
                        src={props.imgPath}
                        alt={props.alt}
                        width={props.ISOCode === 'eu' ? 150 : 100}
                        height={props.ISOCode === 'eu' ? 150 : 100}
                    />
                </div>
            </Link>
        </div>
    )
}

export default Card
