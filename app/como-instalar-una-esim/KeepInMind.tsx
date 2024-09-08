import React from 'react'
import Image from 'next/image'

type Props = {
    installationMethod: string
}

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

const KeepInMind = ({ installationMethod }: Props) => {
    return (
        <div className='bg-yellow-gradient flex justify-between p-48 rounded-custom -z-[1] relative w-full'>
            <div className='flex flex-col space-y-16 w-2/3'>
                <h2 className='font-semibold text-heading'>{installationMethod === 'QR' ? QRHeader : manualHeader}</h2>
                <ul className='list-disc list-inside pl-12'>
                    {installationMethod === 'QR' ? QRSteps.map((item, index) => {
                        return <li key={index}>{item}</li>
                    }) : manualSteps.map((item, index) => {return <li key={index}>{item}</li>})}
                </ul>
                {installationMethod === 'Manual' && <p>Te recomendamos esta opción si puedes copiar y pegar el código que recibiste en tu correo. No necesitas de otro dispositivo.</p>}
            </div>
            <Image className='absolute -right-32 -top-165'
                src='/media/hombre-con-celular-grande.png'
                alt='hombre con celular grande'
                width={410}
                height={430}
            />
        </div>
    )
}

export default KeepInMind
