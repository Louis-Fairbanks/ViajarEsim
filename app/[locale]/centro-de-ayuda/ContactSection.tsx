import React from 'react'
import Image from 'next/image'
import GoNow from '../components/HomeSections/GoNow'
import { WhatsApp } from '@mui/icons-material'
import { Link } from '@/routing'
import { useTranslations } from 'next-intl'

const ContactSection = () => {

    const translations = useTranslations('ContactSection')

    const phoneNumber = '+5491125137092'; // Remove spaces and add country code
  const whatsappUrl = `https://wa.me/${phoneNumber}`;

    return (
        <div className='flex flex-col md:flex-row space-y-16 md:space-y-0 md:space-x-16 w-full sm:w-1/2 md:w-full'>
            <Link href={whatsappUrl} className='w-full'>
            <div className='border-custom rounded-custom flex items-center p-24 space-x-24 relative overflow-hidden
            transition-all duration-300 ease-linear active:border-card-pressed hover:border-light-button-border'>
                <div className='h-64 w-64 bg-whatsapp-green rounded-full flex 
                                border-custom items-center justify-center'>
                    <WhatsApp style={{ fill: '#fff', height: '40px', width: '40px' }} />
                </div>
                <div className='flex flex-col space-y-8'>
                    <h3 className='font-semibold text-subheading'>WhatsApp</h3>
                    <GoNow ctaText={translations('contactar')} />
                </div>
                <Image className='absolute -bottom-32 -right-48 xl:-bottom-16 xl:-right-16 xl:scale-200'
                    src='/media/earth-1.svg'
                    alt=''
                    height={100}
                    width={100}
                />
            </div>
            </Link>
            <a href='mailto:help@viajaresim.com' className='w-full'>
            <div className='border-custom rounded-custom flex items-center p-24 space-x-24 relative overflow-hidden
            transition-all duration-300 ease-linear active:border-card-pressed hover:border-light-button-border'>
                <div className='h-64 w-64 bg-primary rounded-full flex 
                                border-custom justify-end items-end'>
                    <Image
                        src='/media/sobre.svg'
                        alt=''
                        width={50}
                        height={30}
                    />
                </div>
                <div className='flex flex-col space-y-8'>
                    <h3 className='font-semibold text-subheading'>{translations('email')}</h3>
                    <GoNow ctaText={translations('contactar')} />
                </div>
                <Image className='absolute -bottom-32 -right-48 xl:-bottom-16 xl:-right-16 xl:scale-200'
                    src='/media/earth-1.svg'
                    alt=''
                    height={100}
                    width={100}
                />
            </div>
            </a>
        </div>
    )
}

export default ContactSection
