import React from 'react'
import SectionHeader from '../SectionHeader'
import AdvantageBlurb from './AdvantageBlurb'
import { Beneficios } from '../Beneficios'

const Benefits = () => {
    return (
        <div className="h-100 p-64 space-y-48 items-center text-center">
            <SectionHeader title="Beneficios" header={`Disfruta de internet en tus viajes sin preocupaciones. \nCon Holafly son todo ventajas.`
            } />
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
            <button className='bg-primary px-48 py-9 text-background font-semibold rounded-custom'>Quiero eSIM</button>
        </div>
    )
}

export default Benefits
