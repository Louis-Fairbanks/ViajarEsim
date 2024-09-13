import React from 'react'
import SectionHeader from '../ReusableComponents/SectionHeader'
import Steps from './Steps'

const StepByStep = () => {


  return (
    <div className="flex flex-col justify-center  p-24 sm:p-64 space-y-24 lg:space-y-48">
      <SectionHeader title="El Paso a Paso" header="¿Cómo se configura la eSIM de ViajareSIM?"/>
      <Steps />
    </div>
  )
}

export default StepByStep
