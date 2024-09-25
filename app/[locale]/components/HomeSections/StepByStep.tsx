import React from 'react'
import SectionHeader from '../ReusableComponents/SectionHeader'
import Steps from './Steps'
import { useTranslations } from 'next-intl'

const StepByStep = () => {

  const translations = useTranslations('StepByStep')

  return (
    <div className="flex flex-col justify-center  p-24 sm:p-64 space-y-24 lg:space-y-48">
      <SectionHeader title={translations('elPasoAPaso')} header={translations('comoConfigura')}/>
      <Steps />
    </div>
  )
}

export default StepByStep
