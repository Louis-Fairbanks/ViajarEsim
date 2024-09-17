import React from 'react'
import Image from 'next/image'
import { useInstallation } from './InstallationProvider'

const QRHeader = 'Antes de instalar con QR, ten en cuenta:'
const manualHeader = 'Antes de iniciar la instalación manual, es importante que sepas:'
const QRSteps = [
    'Asegúrate de tener el código QR en otro dispositivo o pantalla para poder escanearlo con la cámara de tu teléfono.',
    'Verifica que estés conectado a una red de internet estable antes de comenzar.',
    'Recuerda que el código QR solo se puede escanear una vez.',
    'No elimines la eSIM de tu celular, porque no podrás activarla nuevamente.'
]
const manualSteps = [
    'Los códigos de instalación manual pueden usarse solo una vez.',
    'Asegúrate de tener una conexión a internet estable durante este proceso.',
    'No elimines la eSIM de tu dispositivo ya que no podrás volver a utilizarla.'
]

const KeepInMind = () => {
    const {installationType} = useInstallation()

    return (
        <div className='bg-yellow-gradient flex justify-between p-32 sm:p-48 rounded-2xl relative w-full overflow-hidden'>
            <div className='flex flex-col space-y-16 w-full lg:w-2/3'>
                <h2 className='font-semibold text-heading'>{installationType === 'QR' ? QRHeader : manualHeader}</h2>
                <ul className='list-disc list-inside pl-12'>
                    {installationType === 'QR' ? QRSteps.map((item, index) => {
                        return <li key={index}>{item}</li>
                    }) : manualSteps.map((item, index) => {return <li key={index}>{item}</li>})}
                </ul>
                {installationType === 'Manual' && <p>Te recomendamos esta opción si puedes copiar y pegar el código que recibiste en tu correo. No necesitas de otro dispositivo.</p>}
            </div>
            <Image className='absolute hidden lg:block -right-32 -top-165'
                src='/media/hombre-con-celular-grande.png'
                alt='hombre con celular grande'
                width={410}
                height={430}
            />
            <Image className='absolute -top-8 right-0 scale-x-[-1] lg:hidden'
                src='/media/nube.png'
                alt='puntitos'
                width={100}
                height={60}
            />
        </div>
    )
}

export default KeepInMind
