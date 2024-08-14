import React from 'react'
import SectionHeader from '../SectionHeader'
import Image from 'next/image'
import StarIcon from '@mui/icons-material/Star';

const Testimonials = () => {
    return (
        <div className='p-64 flex flex-col space-y-48 relative'>
            <SectionHeader
                title="Testimonios"
                header={`ViajareSIM es la eSIM de viaje más recomendada,\n según lo afirman nuestros clientes.`}
            />
            <Image className='absolute -top-64 right-64 scale-200'
                src='/media/rayo.png'
                alt=''
                width={100}
                height={100}
            />
            <div className='flex space-x-64'>
                <div className='w-1/2 relative'>
                    <Image className="absolute -left-32 -top-64 scale-150"
                        src='/media/avioncito-negro.png'
                        alt=''
                        width={128}
                        height={128}
                    />
                    <Image className='absolute -bottom-90 -left-64'
                        src='/media/lamparita.png'
                        alt=''
                        width={150}
                        height={150}
                    />
                    <Image className='rounded-custom'
                        src='/media/testimoniosImagen.jfif'
                        alt='dos personas sacando una selfie'
                        width={624}
                        height={643}
                    />
                    <Image className="absolute -bottom-32 -right-32 -z-10"
                        src='/media/masaAmorfa.png'
                        alt=''
                        width={256}
                        height={256}
                    />
                </div>
                <div className='flex flex-col space-y-12 w-1/2'>
                    <Image
                        src='/media/cita.png'
                        alt='comillas'
                        width={60}
                        height={60}
                    />
                    <div className='flex space-x-12'>
                        <StarIcon style={{color : "#FFC659"}}/>
                        <StarIcon style={{color : "#FFC659"}}/>
                        <StarIcon style={{color : "#FFC659"}}/>
                        <StarIcon style={{color : "#FFC659"}}/>
                        <StarIcon style={{color : "#FFC659"}}/>
                    </div>
                    <h2 className='font-semibold text-heading leading-body'>“Sin dudas, la mejor eSIM del mercado”</h2>
                    <p className='text-text-faded'>
                    Lorem ipsum dolor sit amet consectetur adipiscing elit, tempus aliquet venenatis justo ad mauris nostra, ornare sodales gravida fames varius imperdiet. Parturient metus eget bibendum gravida id varius, non risus hac duis taciti nascetur fringilla, tellus urna a feugiat nisi. Per ut litora justo curabitur ornare feugiat tristique aenean fusce commodo quisque, vel vivamus sollicitudin quam fermentum bibendum netus vulputate neque elementum ultrices a, quis parturient mollis habitant conubia torquent consequat luctus volutpat class.
                    </p>
                    <div className="font-semibold">Cristian Hernandez</div>
                    <div className='text-small text-text-faded'>Cliente de ViajareSIM</div>
                </div>
            </div>
        </div>
    )
}

export default Testimonials
