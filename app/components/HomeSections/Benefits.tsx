import React from 'react'
import SectionHeader from '../ReusableComponents/SectionHeader'
import AdvantageBlurb from '../ReusableComponents/AdvantageBlurb'
import { Beneficios } from '../Beneficios'
import ButtonDark from '../ReusableComponents/ButtonDark'
import Link from 'next/link'

const Benefits = () => {
    return (
        <div className="h-100 p-24 sm:p-64 space-y-48 items-center text-center">
            <SectionHeader title="Beneficios" header="Conéctate en tus viajes sin preocupaciones!" />
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-24 md:gap-48'>
                {Beneficios.map((benefit, index) => (
                    <AdvantageBlurb
                        key={index}
                        heading={benefit.heading}
                        info={benefit.info}
                        imgPath={benefit.imgPath}
                    />
                ))}
            </div>
            <Link href='/destinos'><ButtonDark extraClasses='px-48 py-9'>Quiero mi eSIM</ButtonDark></Link>
        </div>
    )
}

export default Benefits
