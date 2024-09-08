import React from 'react'
import QrCodeIcon from '@mui/icons-material/QrCode';
import ConstructionIcon from '@mui/icons-material/Construction';

type Props = {
    installationMethod: string
    setInstallationMethod: React.Dispatch<React.SetStateAction<string>>
}

const InstallationInstallation = ({ installationMethod, setInstallationMethod }: Props) => {
    return (
        <div className='border-custom rounded-custom p-8 flex space-x-8 w-fit'>
            <div className={`rounded-custom px-24 py-8 transition-all duration-300 ease-linear flex space-x-8 font-medium cursor-pointer
${installationMethod === 'QR' ? 'bg-primary text-background' : 'bg-background text-light-button-border'}`}
                onClick={() => setInstallationMethod('QR')}><span>Instalación via QR</span>
                <QrCodeIcon/></div>
                <div className={`rounded-custom px-24 py-8 transition-all duration-300 ease-linear flex space-x-8  font-medium cursor-pointer
${installationMethod === 'Manual' ? 'bg-primary text-background' : 'bg-background text-light-button-border'}`}
                    onClick={() => setInstallationMethod('Manual')}>
                   <ConstructionIcon/><span>Instalación manual</span></div>
            </div>
            )
}

            export default InstallationInstallation
