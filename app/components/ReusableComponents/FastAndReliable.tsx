import React from 'react'
import Image from 'next/image'

const FastAndReliable = () => {
    return (
        <div className='p-64'>
            <div className='flex flex-col space-y-48 p-48 rounded-2xl bg-gray-gradient relative overflow-hidden'>
                <Image className='absolute -top-128 -translate-y-64 -left-128'
                    src='/media/cloud.svg'
                    alt=''
                    width={400}
                    height={200}
                />
                <Image className='absolute -top-128 -translate-y-64 -right-128'
                    src='/media/cloud.svg'
                    alt=''
                    width={400}
                    height={200}
                />
                <h1 className='font-semibold text-large-heading text-center'>Conexión rápida y confiable</h1>
                <div className='flex space-x-48 justify-between'>
                    <ul className='w-full space-y-12'>
                        <li className='flex items-center'>
                            <div className='w-48 h-48 rounded-full bg-background mr-12 relative'>
                                <Image className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                                    src='/media/icons/whatsapp.svg'
                                    alt='whatsapp'
                                    height={24}
                                    width={24}
                                />
                            </div>
                            Videollamada y chat sin demoras
                        </li>
                        <li className='flex items-center'>
                            <div className='w-48 h-48 rounded-full bg-background mr-12 relative'>
                                <Image className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'
                                    src='/media/icons/instagram.svg'
                                    alt='instagram'
                                    height={24}
                                    width={24}
                                />
                            </div>
                            Publicá tus fotos y videos disfrutando de tus vacaciones
                        </li>
                        <li className='flex items-center'>
                            <div className='w-48 h-48 rounded-full bg-background mr-12 relative'>
                                <Image className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'
                                    src='/media/icons/airbnb.svg'
                                    alt='airbnb'
                                    height={24}
                                    width={24}
                                />
                            </div>
                            Encontra tu lugar de hospedaje apenas aterrices
                        </li>
                        <li className='flex items-center'>
                            <div className='w-48 h-48 rounded-full bg-background mr-12 relative'>
                                <Image className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'
                                    src='/media/icons/uber.svg'
                                    alt='uber'
                                    height={24}
                                    width={24}
                                />
                            </div>
                            Cuando necesites moverte, hacelo tranquilo y sin tener preocupaciones
                        </li>
                    </ul>
                    <div className='flex flex-col space-y-16 p-24 rounded-custom bg-background w-2/3'>
                        <h2 className='font-bold text-heading leading-body'>El mejor rendimiento en todas las apps</h2>
                        <p>Descubre la libertad de una conectividad confiable con 4G y 5G de alta velocidad. ¡ViajareSIM te mantiene conectado sin importar la aventura!</p>
                        <div className='flex justify-between'>
                            <div className='w-48 h-48 rounded-full bg-accent relative'>
                                <Image className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
                                    src='/media/icons/facebook.svg'
                                    alt='facebook'
                                    height={24}
                                    width={24}
                                />
                            </div>
                            <div className='w-48 h-48 rounded-full bg-accent relative'>
                                <Image className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
                                    src='/media/icons/googleMaps.svg'
                                    alt='google maps'
                                    height={24}
                                    width={24}
                                />
                            </div>
                            <div className='w-48 h-48 rounded-full bg-accent relative'>
                                <Image className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
                                    src='/media/icons/gmail.svg'
                                    alt='gmail'
                                    height={24}
                                    width={24}
                                />
                            </div>
                            <div className='w-48 h-48 rounded-full bg-accent relative'>
                                <Image className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
                                    src='/media/icons/spotify.svg'
                                    alt='spotify'
                                    height={24}
                                    width={24}
                                />
                            </div>
                            <div className='w-48 h-48 rounded-full bg-accent relative'>
                                <Image className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
                                    src='/media/icons/tiktok.svg'
                                    alt='tiktok'
                                    height={24}
                                    width={24}
                                />
                            </div>
                            <div className='w-48 h-48 rounded-full bg-accent relative'>
                                <Image className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
                                    src='/media/icons/maze.svg'
                                    alt='maze'
                                    height={24}
                                    width={24}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FastAndReliable
