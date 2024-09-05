'use client'
import React, { useState } from 'react'
import SectionHeader from './SectionHeader'
import Image from 'next/image'
import Link from 'next/link'
import CompatibilityModal from './CompatibilityModal'

const HowToActivate = () => {
    const [modalClicked, setModalClicked] = useState<boolean>(false)

  return (
    <div className="flex flex-col p-24 sm:p-64 space-y-48">
        <CompatibilityModal setModalClicked={setModalClicked} modalClicked={modalClicked}/>
                <SectionHeader title="paso a paso" header="Conocé como activar tu eSIM fácilmente" />
                <div className='grid grid-cols-1 gap-y-12 sm:gap-y-0 sm:grid-cols-3 sm:gap-x-12 xl:gap-x-48'>
                    <div className='flex flex-col rounded-custom border-custom p-24 xl:space-y-32 items-center'>
                        <div className='flex flex-col gap-12 justify-center text-center'>
                            <p className='font-extrabold text-hero leading-body text-accent'>1.</p>
                            <h2 className='font-semibold'>Verifica que tu teléfono sea compatible.</h2>
                            <div className='text-text-faded'>Verifica si tu smartphone es compatible 
                            <span className='font-bold text-primary cursor-pointer' onClick={() => setModalClicked(true)}> aquí.</span></div>
                        </div>
                        <div className="border-t border-custom h-2 w-full"></div>
                        <div className='relative'>
                            <Image
                                src='/media/paso1.png'
                                alt='celular con esim'
                                height={332}
                                width={292}
                            />
                            <Image className='absolute top-64 right-32'
                                src='/media/puntitos.svg'
                                alt=''
                                height={24}
                                width={60}
                            />
                        </div>
                    </div>
                    <div className='flex flex-col justify-between rounded-custom border-custom p-24 xl:space-y-32 items-center'>
                        <div className='flex flex-col gap-12 justify-center text-center'>
                            <p className='font-extrabold text-hero leading-body text-accent'>2.</p>
                            <h2 className='font-semibold'>Adquiere tu eSIM prepago.</h2>
                            <div className='text-text-faded'>Elige el plan de datos móviles que necesites.</div>
                        </div>
                        <div className="border-t border-custom h-2 w-full"></div>
                        <div className='relative'>
                            <Image
                                src='/media/que-es-una-sim2.png'
                                alt='celular con esim'
                                height={332}
                                width={292}
                            />
                        </div>
                    </div>
                    <div className='flex flex-col justify-between rounded-custom border-custom p-24 xl:space-y-32 items-center'>
                        <div className='flex flex-col gap-12 justify-center text-center'>
                            <p className='font-extrabold text-hero leading-body text-accent'>3.</p>
                            <h2 className='font-semibold'>Sigue las instrucciones enviadas por correo.</h2>
                            <div className='text-text-faded'>Te enviaremos un correo con las instrucciones.</div>
                        </div>
                        <div className="border-t border-custom h-2 w-full"></div>
                        <div className='relative'>
                            <Image
                                src='/media/que-es-una-sim3.png'
                                alt='celular con esim'
                                height={332}
                                width={292}
                            />
                        </div>
                    </div>
                </div>
            </div>
  )
}

export default HowToActivate
