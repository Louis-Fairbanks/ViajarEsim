import React from 'react'

type Props = {
    stepNumber : string,
    title : string,
    text: string
}

const GettingStartedStep = ({stepNumber, title, text} : Props) => {
  return (
    <div className='border-custom rounded-custom p-24 flex flex-col space-y-24 items-center justify-center text-center'>
        <span className='font-extrabold text-accent text-hero'>{stepNumber}.</span>
        <h1 className='font-semibold'>{title}</h1>
        <p>{text}</p>
    </div>
  )
}

export default GettingStartedStep
