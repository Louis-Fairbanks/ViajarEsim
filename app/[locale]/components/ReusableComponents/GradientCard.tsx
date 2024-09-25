import React from 'react'


interface Props {
    backgroundColor : string;
    heading : string,
    subheading : string,
    buttonText : string
}

const GradientCard = (props : Props) => {
  return (
    <div className={`flex flex-col p-48 rounded-2xl space-y-24 ${props.backgroundColor} text-center items-center`}>
      <h1 className='font-semibold text-large-heading leading-body'>{props.heading}</h1>
      <p className="leading-body">{props.subheading}</p>
      <button className='bg-background text-primary rounded-custom border-custom border-primary w-3/4 p-16'>
        {props.buttonText}</button>
    </div>
  )
}

export default GradientCard
