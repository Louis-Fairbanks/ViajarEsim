import React from 'react'
import Image from 'next/image'


interface Props {
    heading: string;
    info: string;
    imgPath: string;
}

const AdvantageBlurb = (props : Props) => {
  return (
    <div className='flex flex-col items-center text-center gap-y-12 relative'>
    <Image
        src={props.imgPath}
        alt='mobius'
        height={66}
        width={66}
    />
    <h4 className='font-semibold'>{props.heading}</h4>
    <p className='text-text-faded'>
        {props.info}
    </p>
</div>
  )
}

export default AdvantageBlurb
