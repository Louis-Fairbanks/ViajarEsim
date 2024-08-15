import React from 'react'
import SectionHeader from './SectionHeader'
import Image from 'next/image'
import Link from 'next/link'

const HowToActivate = () => {
  return (
    <div className="flex flex-col p-64 space-y-48">
                <SectionHeader title="paso a paso" header="Conocé como activar tu eSIM fácilmente" />
                <div className='grid grid-cols-3 space-x-48'>
                    <div className='flex flex-col rounded-custom border-custom p-24 space-y-32 items-center'>
                        <div className='flex flex-col gap-12 justify-center text-center'>
                            <p className='font-extrabold text-hero leading-body text-accent'>1.</p>
                            <h2 className='font-semibold'>Verifica que tu teléfono sea compatible.</h2>
                            <div className='text-text-faded'>Verifica si tu smartphone es compatible <Link href='/faqs' className='font-bold text-primary'>aquí.</Link></div>
                        </div>
                        <hr></hr>
                        <div className='relative'>
                            <Image
                                src='/media/que-es-una-sim2.png'
                                alt='celular con esim'
                                height={288}
                                width={260}
                            />
                            <Image className='absolute top-64 right-32'
                                src='/media/puntitos.svg'
                                alt=''
                                height={24}
                                width={60}
                            />
                        </div>
                    </div>
                    <div className='flex flex-col rounded-custom border-custom p-24 space-y-32 items-center'>
                        <div className='flex flex-col gap-12 justify-center text-center'>
                            <p className='font-extrabold text-hero leading-body text-accent'>2.</p>
                            <h2 className='font-semibold'>Adquiere tu eSIM prepago.</h2>
                            <div className='text-text-faded'>Elige el plan de datos móviles que necesites.</div>
                        </div>
                        <hr></hr>
                        <div className='relative'>
                            <Image
                                src='/media/que-es-una-sim3.png'
                                alt='celular con esim'
                                height={250}
                                width={220}
                            />
                        </div>
                    </div>
                    <div className='flex flex-col rounded-custom border-custom p-24 space-y-32 items-center'>
                        <div className='flex flex-col gap-12 justify-center text-center'>
                            <p className='font-extrabold text-hero leading-body text-accent'>3.</p>
                            <h2 className='font-semibold'>Sigue las instrucciones enviadas por correo.</h2>
                            <div className='text-text-faded'>Te enviaremos un correo con las instrucciones.</div>
                        </div>
                        <hr></hr>
                        <div className='relative'>
                            <Image
                                src='/media/que-es-una-sim4.png'
                                alt='celular con esim'
                                height={534}
                                width={650}
                            />
                        </div>
                    </div>
                </div>
            </div>
  )
}

export default HowToActivate
