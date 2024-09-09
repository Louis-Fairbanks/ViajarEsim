'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useInstallation } from './InstallationProvider'


type Props = {
    imageUrl : string,
    imageAlt: string,
    text : string
}

const InstallationCard = ({imageUrl, imageAlt, text} : Props) => {

  const {selectedDevice}  = useInstallation()

  const [showCard, setShowCard] = useState<boolean>(true)

  useEffect(() => {
    if(selectedDevice === 'iPhone' && imageUrl === '/media/hombre-scrolleando-pantallas.png'){
      setShowCard(false)
    } else {
      setShowCard(true)
    }
  }, [selectedDevice, imageUrl])

  return (
    <div className={`${showCard ? '' : 'hidden'}
    flex flex-col p-24 items-center text-center space-y-32 rounded-custom border-custom`}>
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