import React from 'react'
import GoNow from './GoNow'

interface Props {
    header: string,
    info: string,
    cta?: string
}


const InfoSection = (props : Props) => {
  return (
    <div className='flex flex-col space-y-16'>
      <h2 className='font-medium text-heading leading-body'>{props.header}</h2>
      <p>{props.info}</p>
      {props.cta && <GoNow ctaText={props.cta}/>}
    </div>
  )
}

export default InfoSection
