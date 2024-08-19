import React from 'react'
import "/node_modules/flag-icons/css/flag-icons.min.css"
import Image from 'next/image'
import GoNow from '../HomeSections/GoNow'
import styles from './FeaturedDeal.module.css'
import Link from 'next/link'



interface Props {
    popular: boolean;
    header: string;
    ISOcode: string;
    imgPath: string;
    alt: string;
}


const Card = (props: Props) => {

    const urlString = '/' + props.header.toLowerCase().replace(/ /g, '-');

    return (
        <div className='relative'>
            <Link href={urlString}>
                {props.popular && <div className={styles.featuredDeal}><div className={styles.featuredDealBelow}></div>POPULAR</div>}
                <div className='flex space-x-24 border-custom rounded-custom items-center pl-24 justify-between bg-background 
            hover:border-text-faded focus:border-text-faded active:border-card-pressed cursor-pointer overflow-hidden
            transition-all ease-linear duration-300'>
                    <div className="relative w-65 h-65 overflow-hidden rounded-full border-custom">
                        <span className={`fi fi-${props.ISOcode} h-65 w-65 absolute -left-1 -top-6 scale-150`}></span>
                    </div>
                    <div className='flex flex-col space-y-8 my-24'>
                        <h4 className='font-semibold text-subheading'>{props.header}</h4>
                        <div className='flex space-x-6'>
                            <p>Desde €6,00</p><span className='text-text-faded text-small font-light'>Eur</span>
                        </div>
                        <GoNow ctaText='Ir ahora' />
                    </div>
                    <Image className={`ml-auto -mb-48 scale-125 ${props.alt === 'Europa' ? 'translate-x-32' : ''}`}
                        src={props.imgPath}
                        alt={props.alt}
                        width={props.alt === 'Europa' ? 150 : 100}
                        height={props.alt === 'Europa' ? 150 : 100}
                    />
                </div>
            </Link>
        </div>
    )
}

export default Card
