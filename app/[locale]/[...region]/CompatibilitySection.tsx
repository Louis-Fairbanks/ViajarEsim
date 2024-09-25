'use client'
import React, { useState } from 'react'
import ButtonLight from '../components/ReusableComponents/ButtonLight'
import CompatibilityModal from '../components/ReusableComponents/CompatibilityModal'
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import { useTranslations } from 'next-intl';


const CompatibilitySection = () => {

    const translations = useTranslations('CompatibilitySection')

    const [modalClicked, setModalClicked] = useState<boolean>(false);

    return (
        <>
            <CompatibilityModal modalClicked={modalClicked} setModalClicked={setModalClicked}/>
            <ButtonLight extraClasses='p-12' onClick={() => setModalClicked(true)}><PhoneIphoneIcon className='mr-8' />
                {translations('verificarCompatibilidad')}</ButtonLight>
        </>
    )
}

export default CompatibilitySection
