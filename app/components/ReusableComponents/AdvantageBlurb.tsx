import React from 'react'
import Image from 'next/image'


interface Props {
    heading: string;
    info: string;
    imgPath: string;
    blackText? : true;
}

const AdvantageBlurb = (props : Props) => {


  return (
    <div className='p-12 min-w-full sm:w-fit sm:p-0 border-custom rounded-custom sm:border-none 
    flex sm:flex-col items-center text-left gap-x-12 sm:text-center sm:gap-x-0 sm:gap-y-12 relative sm:text-body'>
        <Image
            src={props.imgPath}
            alt='mobius'
            height={66}
            width={66}
        />
        <div className='flex flex-col gap-y-12'>
        <h4 className='font-semibold'>{props.heading}</h4>
        <p className={`${props.blackText ? 'text-text' : 'text-text-faded'}`}>
            {props.info}
        </p>
        </div>
    </div>
)
}

export default AdvantageBlurb
