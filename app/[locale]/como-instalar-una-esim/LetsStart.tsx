import React from 'react'
import SectionHeader from '../components/ReusableComponents/SectionHeader'
import GettingStartedSteps from './GettingStartedSteps'
import { useTranslations } from 'next-intl'


const LetsStart = () => {

    const translations = useTranslations('LetsStart')

    return (
        <div className='p-24 sm:p-64 flex flex-col space-y-24'>
            <SectionHeader header={translations('header')} title={translations('title')} />
            <GettingStartedSteps/>
        </div>
    )
}

export default LetsStart
