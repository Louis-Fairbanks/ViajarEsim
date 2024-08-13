import React from 'react'

interface Props {
    title: string;
    header: string;
    subheader?: string;
}

const SectionHeader = (props : Props) => {
  return (
    <div className='text-center space-y-8'>
      <p className='uppercase text-primary font-bold text-small'>{props.title}</p>
      <h1 className='font-medium text-heading leading-body'>{props.header}</h1>
      {props.subheader && <p className='text-body text-text-faded'>{props.subheader}</p>}
    </div>
  )
}

export default SectionHeader
