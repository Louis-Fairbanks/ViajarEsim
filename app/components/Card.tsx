import React from 'react'
import "/node_modules/flag-icons/css/flag-icons.min.css"
import Image from 'next/image'
import GoNow from './HomeSections/GoNow'
import styles from './FeaturedDeal.module.css'



interface Props {
    popular: boolean;
    header: string;
    ISOcode: string;
    imgPath: string;
    alt: string;
}


const Card = (props: Props) => {
    return (
        <div className='flex space-x-24 border-custom rounded-custom items-center pl-24 relative justify-between'>
            {props.popular && <div className={styles.featuredDeal}><div className={styles.featuredDealBelow}></div>POPULAR</div>}
            <div className="relative w-64 h-64 overflow-hidden rounded-full border-custom">
                <span className={`fi fi-${props.ISOcode} h-64 w-64 absolute -left-2 -top-2 scale-150`}></span>
            </div>
            <div className='flex flex-col space-y-8 my-24'>
                <h4 className='font-semibold text-subheading'>{props.header}</h4>
                <div className='flex space-x-6'>
                    <p>Desde €6,00</p><span className='text-text-faded text-small font-light'>Eur</span>
                </div>
                <GoNow ctaText='Ir ahora'/>
            </div>
            <Image className='ml-auto'
                src={props.imgPath}
                alt={props.alt}
                width={100}
                height={100}
            />
        </div>
    )
}

export default Card
