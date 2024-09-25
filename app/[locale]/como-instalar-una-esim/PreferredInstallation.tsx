import React from 'react'
import QrCodeIcon from '@mui/icons-material/QrCode';
import ConstructionIcon from '@mui/icons-material/Construction';
import { useInstallation } from './InstallationProvider';
import { useTranslations } from 'next-intl';


const InstallationInstallation = () => {

    const translations = useTranslations('PreferredInstallation')


    const {installationType, setInstallationType} = useInstallation()
    return (
        <div className='border-custom rounded-custom p-8 flex sm:flex-row flex-col space-x-0 space-y-8 lg:space-y-0 sm:space-x-8 w-fit'>
            <div className={`rounded-custom px-24 py-8 transition-all duration-300 ease-linear flex space-x-8 font-medium cursor-pointer
${installationType === 'QR' ? 'bg-primary text-background' : 'bg-background text-light-button-border'}`}
                onClick={() => setInstallationType('QR')}><span>{translations('qr')}</span>
                <QrCodeIcon/></div>
                <div className={`rounded-custom px-24 py-8 transition-all duration-300 ease-linear flex space-x-8  font-medium cursor-pointer
${installationType === 'Manual' ? 'bg-primary text-background' : 'bg-background text-light-button-border'}`}
                    onClick={() => setInstallationType('Manual')}>
                   <ConstructionIcon/><span>{translations('manual')}</span></div>
            </div>
            )
}

            export default InstallationInstallation
