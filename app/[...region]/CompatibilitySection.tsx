'use client'
import React, { useState } from 'react'
import ButtonLight from '../components/ReusableComponents/ButtonLight'
import CompatibilityModal from '../components/ReusableComponents/CompatibilityModal'
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';


const CompatibilitySection = () => {

    const [modalClicked, setModalClicked] = useState<boolean>(false);

    return (
        <>
            <CompatibilityModal modalClicked={modalClicked} setModalClicked={setModalClicked}/>
            <ButtonLight extraClasses='p-12' onClick={() => setModalClicked(true)}><PhoneIphoneIcon className='mr-8' />
                Verificar compatibilidad</ButtonLight>
        </>
    )
}

export default CompatibilitySection
