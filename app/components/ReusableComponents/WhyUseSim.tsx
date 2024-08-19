import React from 'react'
import Image from 'next/image'
import AdvantageBlurb from './AdvantageBlurb'


interface Props {
    backgroundColor: string
}

const WhyUseSim = ({ backgroundColor } : Props) => {
  return (
    <div className='flex flex-col p-64 space-y-48'>
                <div className={`flex flex-col rounded-2xl bg-${backgroundColor}-gradient items-center text-center space-y-16 p-48 relative overflow-hidden`}>
                    <h1 className='font-semibold text-large-heading w-1/2 leading-body'>
                        ¿Porqué usar una eSIM?</h1>
                    <p className='w-1/2'>Sabemos que no tener tu conexion a tus seres queridos puede ser dificil, por eso llegamos para ayudarte.</p>
                    <Image className='absolute -top-16 left-0'
                        src='/media/nube.png'
                        alt=''
                        height={156}
                        width={227}
                    />
                    <Image className='absolute -top-16 right-0 scale-x-[-1]'
                        src='/media/nube.png'
                        alt=''
                        height={156}
                        width={227}
                    />
                    <div className='grid grid-cols-3 space-x-64'>
                        <AdvantageBlurb
                            heading="Reduce los costos de roaming"
                            info="Los cargos de roaming pueden acumularse rápidamente. Consigue un plan de datos y manten el control de tu factura."
                            imgPath='/media/avioncito-negro.svg'
                            blackText={true}
                        />
                        <AdvantageBlurb
                            heading="Conexión inmediata"
                            info="Activa tu plan eSIM antes de tu vuelo y estarás conectado en cuanto aterrices."
                            imgPath='/media/rayo-negro.svg'
                            blackText={true}
                        />
                        <AdvantageBlurb
                            heading="Disfruta de planes adaptables"
                            info="Elige entre diversos planes de datos asequibles para cualquier destino. Obtén la cantidad de datos que necesites."
                            imgPath='/media/persona-saltando.svg'
                            blackText={true}
                        />
                    </div>
                </div>
            </div>
  )
}

export default WhyUseSim
