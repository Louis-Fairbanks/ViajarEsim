import React from 'react'
import { KeyboardArrowDown } from '@mui/icons-material'
import Image from 'next/image';

interface Props {
    showEnvelope? : boolean;
}

const ContactForm = (props : Props) => {
    return (
        <div className='flex flex-col p-64 space-y-48 justify-center items-center relative overflow-hidden'>
            <div className='flex flex-col text-center space-y-8'>
                <h1 className='font-semibold leading-body text-heading'>¿Quieres contactarte con ViajareSIM?</h1>
                <p>¿Tienes una duda? ¿Quieres formar parte de nosotros? No dudes en enviarnos un mensaje</p>
            </div>
            <form className='flex flex-col space-y-12 w-2/3'>
                <div className='flex space-x-24'>
                    <input className='border-custom rounded-custom w-1/2 px-24 py-8' type='text' placeholder='Nombre *' />
                    <input className='border-custom rounded-custom w-1/2 px-24 py-8' type='text' placeholder='Apellido *' />
                </div>
                <div className='flex space-x-24 relative'>
                    <div className='relative w-1/2'>
                        <input className='border-custom rounded-custom w-full px-24 py-8' type='text' placeholder='Teléfono *' />
                    </div>
                    <input className='border-custom rounded-custom w-1/2 px-24 py-8' type='text' placeholder='Correo electrónico *' />
                </div>
                <div className='relative w-full'>
                    <input className='border-custom rounded-custom w-full px-24 py-8' type='text' placeholder='Razón de contacto *' />
                    <KeyboardArrowDown className='absolute right-16 top-8' />
                </div>
                <textarea className='border-custom rounded-custom w-full px-24 py-8' rows={6} placeholder='Mensaje *' />
                <button type='submit' className='bg-primary rounded-custom text-background p-8'>Enviar</button>
            </form>
            {props.showEnvelope && <Image className='absolute top-128 -right-64'
                src='/media/envelope.svg'
                alt=''
                width={293}
                height={251}
            />}
        </div>
    )
}

export default ContactForm
