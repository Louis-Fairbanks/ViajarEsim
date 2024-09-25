import React from 'react'
import SectionHeader from '../ReusableComponents/SectionHeader'
import Image from 'next/image'
import FaqSection from '../ReusableComponents/FaqSection'
import { useTranslations } from 'next-intl'

const Faqs = () => {

    const translations = useTranslations('FAQs')

    return (
        <div className='flex flex-col p-24 sm:p-64 space-y-48 justify-center relative'>
            <Image className='absolute hidden lg:block top-64 -left-32'
                src='/media/flecha.png'
                alt=''
                height={258}
                width={215}
            />
            <Image className='absolute hidden lg:block top-0 right-0 rotate-180'
                src='/media/flecha.png'
                alt=''
                height={258}
                width={215}
            />
            <SectionHeader title={translations('title')} header={translations('heading')}
                subheader={translations('subheading')} />
            <FaqSection/>
        </div>
    )
}

export default Faqs
