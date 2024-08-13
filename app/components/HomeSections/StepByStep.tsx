import React from 'react'
import SectionHeader from '../SectionHeader'
import Steps from './Steps'
import Image from 'next/image'
import InfoSection from './InfoSection'

const StepByStep = () => {
  return (
    <div className="flex flex-col justify-center p-64 space-y-48 m-64">
      <SectionHeader title="El Paso a Paso" header="¿Cómo opera la eSIM de ViajareSIM?"/>
      <div className='flex'>
        <Steps/>
        <div className='flex mx-90 space-x-90 items-center p-24'>
            <Image 
                src='/media/paso1.png'
                alt='paso uno'
                width={316}
                height={347}
            />
            <InfoSection
                header="Verifica que tu dispositivo sea compatible con eSIM y adquiere tu plan de datos."
                info="Una vez confirmado que tu móvil es compatible, selecciona el plan con el destino y la duración que mejor se ajuste a tu viaje."
                cta="Verificar compatibilidad"
            />
        </div>
      </div>
    </div>
  )
}

export default StepByStep
