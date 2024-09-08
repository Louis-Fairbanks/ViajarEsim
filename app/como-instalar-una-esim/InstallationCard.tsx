import React from 'react'
import Image from 'next/image'


type Props = {
    imageUrl : string,
    imageAlt: string,
    text : string
}

const InstallationCard = ({imageUrl, imageAlt, text} : Props) => {
  return (
    <div className='flex flex-col p-24 items-center text-center space-y-32 rounded-custom border-custom'>
      <Image
        src={imageUrl}
        alt={imageAlt}
        width={147}
        height={110}
      />
      <p className='card-pressed font-medium'>{text}</p>
    </div>
  )
}

export default InstallationCard
