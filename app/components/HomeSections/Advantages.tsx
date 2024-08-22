import React from 'react'
import AdvantageBlurb from '../ReusableComponents/AdvantageBlurb'

const Advantages = () => {
    return (
        <section className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 p-24 sm:p-64 gap-12 sm:gap-48 mt-32'>
            <AdvantageBlurb
                heading='Internet ilimitado'
                info='ViajareSIM te ofrece planes de datos ilimitados para mantenerte conectado en cualquier parte del mundo'
                imgPath='/media/mobius.svg'
            />
            <AdvantageBlurb
                heading='Sin cargos de roaming'
                info='Disfruta de internet en tus viajes sin necesidad de roaming. ¡Sin sorpresas en tu factura!'
                imgPath='/media/billetes.svg'
            />
            <AdvantageBlurb
                heading='Mantén tu tarjeta SIM física'
                info='Con la eSIM, mantienes tu SIM física para seguir recibiendo llamadas en tu número de siempre.'
                imgPath='/media/burbuja.svg'
            />
            <AdvantageBlurb
                heading='Realmente fácil de instalar'
                info='Compra y configura tu eSIM en pocos minutos. Solo escanea un código QR, así de fácil.'
                imgPath='/media/corazon.svg'
            />
        </section>
    )
}

export default Advantages
