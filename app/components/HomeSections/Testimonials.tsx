import React from 'react'
import SectionHeader from '../ReusableComponents/SectionHeader'
import Image from 'next/image'
import StarIcon from '@mui/icons-material/Star';

const Testimonials = () => {
    return (
        <div className='p-24 sm:p-64 flex flex-col space-y-12 lg:space-y-48 relative'>
            <SectionHeader
                title="Testimonios"
                header={`ViajareSIM es la eSIM de viaje más recomendada,\n según lo afirman nuestros clientes.`}
            />
            <Image className='absolute -top-64 hidden lg:block sm:right-24 lg:right-64 sm:scale-150 lg:scale-200'
                src='/media/rayo.png'
                alt=''
                width={100}
                height={100}
            />
            <div className='flex flex-col items-center py-24 lg:py-64 lg:p-0 lg:flex-row lg:space-x-64 relative'>
                <div className='flex justify-center lg:justify-start h-full w-full lg:w-1/2 relative'>
                    <div className='relative mb-24 lg:mb-0 hidden lg:block'>
                        <Image className='rounded-custom mt-auto'
                            src='/media/testimoniosImagen.jfif'
                            alt='dos personas sacando una selfie'
                            width={624}
                            height={643}
                        />
                        <Image className="absolute -left-32 -top-64 scale-150 z-10"
                            src='/media/avioncito-negro.png'
                            alt=''
                            width={128}
                            height={128}
                        />
                        <Image className='absolute -bottom-64  -left-64 z-10'
                            src='/media/lamparita.png'
                            alt=''
                            width={150}
                            height={150}
                        />
                        <Image className="absolute hidden lg:block -bottom-64 -right-64 -z-10"
                        src='/media/masaAmorfa.png'
                        alt=''
                        width={256}
                        height={256}
                    />
                    </div>
                </div>
                <div className='flex flex-col space-y-12 w-full items-center lg:w-1/2 lg:items-start'>
                    <Image
                        src='/media/cita.png'
                        alt='comillas'
                        width={60}
                        height={60}
                    />
                    <div className='flex space-x-12'>
                        <StarIcon style={{ color: "#FFC659" }} />
                        <StarIcon style={{ color: "#FFC659" }} />
                        <StarIcon style={{ color: "#FFC659" }} />
                        <StarIcon style={{ color: "#FFC659" }} />
                        <StarIcon style={{ color: "#FFC659" }} />
                    </div>
                    <h2 className='font-semibold text-heading leading-body'>“Gracias a VIajareSIM pude disfrutar Europa conectado”</h2>
                    <p className='text-text-faded'>
                        Recientemente utilizamos ViajareSIM para nuestro viaje de cinco semanas por Europa y quedamos muy contentos con el servicio prestado y el precio que pagamos. Lo usamos en tres teléfonos y los tres experimentamos un excelente servicio y transiciones fluidas entre países. Usar WhatsApp e iMessage funcionó muy bien y nos mantuvo conectados. Incluso pude recibir mensajes SMS de mi banco para fines de verificación, sin costo alguno. ¡Recomiendo altamente estos servicios!
                    </p>
                    <div className="font-semibold">Cristian Hernandez</div>
                    <div className='text-small text-text-faded'>Cliente de ViajareSIM</div>
                </div>
            </div>
        </div>
    )
}

export default Testimonials
