import React from 'react'
import AdvantageBlurb from './AdvantageBlurb'

const Advantages = () => {
    return (
        <section className='flex p-64 space-x-12 mt-32'>
            <AdvantageBlurb
                heading='Datos low cost'
                info='Obtén los datos más económicos del mercado. Nuestras eSIMs ofrecen tarifas competitivas y asequibles.'
                imgPath='/media/mobius.svg'
            />
            <AdvantageBlurb
                heading='Sin cargos de roaming'
                info='Viaja sin preocuparte por cargos inesperados. Nuestras eSIMs eliminan las tarifas de roaming.'
                imgPath='/media/billetes.svg'
            />
            <AdvantageBlurb
                heading='Tu SIM siempre física'
                info='Sigue usando tu SIM física en paralelo. Con nuestras eSIMs, puedes mantener tu número actual.'
                imgPath='/media/burbuja.svg'
            />
            <AdvantageBlurb
                heading='Fácil instalación'
                info='Configura tu eSIM en unos sencillos pasos desde tu dispositivo. La instalación es rápida y directa.'
                imgPath='/media/corazon.svg'
            />
        </section>
    )
}

export default Advantages
