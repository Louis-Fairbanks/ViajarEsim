import React from 'react'
import Image from 'next/image'

const IconsSection = () => {
    return (
        <div className='grid grid-cols-3 items-start'>
            <div className='flex flex-col items-center space-y-12'>
                <Image src='/media/email/settings.svg'
                    alt=''
                    width={48}
                    height={48} />
                <p>
                    Ve a Ajustes en tu dispositivo.
                </p>
            </div>
            <div className='flex flex-col space-y-12 items-center'>
                <Image src='/media/email/qr_code_scanner.svg'
                    alt=''
                    width={48}
                    height={48} />
                <p>
                    Escanea el código QR o copia y pega los códigos manualmente.
                </p>
            </div>
            <div className='flex flex-col space-y-12 items-center'>
                <Image src='/media/email/sim_card.svg'
                    alt=''
                    width={48}
                    height={48} />
                <p>
                    Configura tu eSIM
                </p>
            </div>
        </div>
    )
}

export default IconsSection
