import React from 'react'
import SectionHeader from '../components/ReusableComponents/SectionHeader'
import GettingStartedSteps from './GettingStartedSteps'


const LetsStart = () => {
    return (
        <div className='p-24 sm:p-64 flex flex-col space-y-24'>
            <SectionHeader header='Vamos a comenzar juntos' title='PASO A PASO' />
            <GettingStartedSteps/>
        </div>
    )
}

export default LetsStart
