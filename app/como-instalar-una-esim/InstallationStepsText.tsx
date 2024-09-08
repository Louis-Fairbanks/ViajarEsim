import React from 'react'

type Props = {
    currentStep: number
    title: string
    textPart1: string
    textPart2: string
}

const InstallationStepsText = ({currentStep, title, textPart1, textPart2}: Props) => {
  return (
    <div className='flex flex-col space-y-16 text-center'>
    <h2 className='font-bold text-primary text-subheading'>{currentStep}.  {title}</h2>
    <p>{textPart1}<br></br>{textPart2}</p>
</div>
  )
}

export default InstallationStepsText
