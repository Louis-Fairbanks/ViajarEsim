import React from 'react'
import SectionHeader from '../ReusableComponents/SectionHeader'
import AdvantageBlurb from '../ReusableComponents/AdvantageBlurb'
import { Beneficios } from '../Beneficios'
import ButtonDark from '../ReusableComponents/ButtonDark'

const Benefits = () => {
    return (
        <div className="h-100 p-64 space-y-48 items-center text-center">
            <SectionHeader title="Beneficios" header="Conéctate en tus viajes sin preocupaciones!" />
            <div className='grid grid-cols-3 gap-48'>
                {Beneficios.map((benefit, index) => (
                    <AdvantageBlurb
                        key={index}
                        heading={benefit.heading}
                        info={benefit.info}
                        imgPath={benefit.imgPath}
                    />
                ))}
            </div>
            <ButtonDark extraClasses='px-48 py-9'>Quiero eSIM</ButtonDark>
        </div>
    )
}

export default Benefits
