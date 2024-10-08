'use client'
import React, { useState } from 'react'
import { KeyboardArrowDown } from '@mui/icons-material'
import Image from 'next/image';
import ButtonDark from './ButtonDark';
import { useTranslations } from 'next-intl';

interface Props {
    showEnvelope? : boolean;
}

const ContactForm = (props : Props) => {

    const translations = useTranslations('ContactForm')

    const [formState, setFormState] = useState<string>(translations('enviar'))

    const submitForm = async (event : React.FormEvent<HTMLFormElement>) =>{
        event.preventDefault();
        setFormState(translations('enviando'))
    
        const formData = {
            nombre: (event.currentTarget.nombre as HTMLInputElement).value,
            apellido: (event.currentTarget.apellido as HTMLInputElement).value,
            telefono: (event.currentTarget.telefono as HTMLInputElement).value,
            correo: (event.currentTarget.correo as HTMLInputElement).value,
            // razon: (event.currentTarget.razon as HTMLInputElement).value,
            mensaje: (event.currentTarget.mensaje as HTMLInputElement).value
        }
    
        const response = await fetch('/api/contacto', {
            method: 'POST',
            body: JSON.stringify(formData)
        })
        if(!response.ok){
            console.error('Error enviando formulario')
            return
        }else{
            setFormState(translations('enviado'))
        }
    }

    return (
        <div className='flex flex-col p-24 sm:p-64 space-y-48 justify-center items-center relative overflow-hidden'>
            <div className='flex flex-col text-center space-y-8'>
                <h1 className='font-semibold leading-body text-heading'>{translations('heading')}</h1>
                <p>{translations('subheading')}</p>
            </div>
            <form className='flex flex-col space-y-12 w-full lg:w-2/3' onSubmit={submitForm}>
                <div className='flex flex-col space-y-12 sm:space-y-0 sm:flex-row sm:space-x-24'>
                    <input className='border-custom rounded-custom w-full sm:w-1/2 px-24 py-8' type='text' name='nombre' placeholder={`${translations('nombre')} *`} />
                    <input className='border-custom rounded-custom w-full sm:w-1/2 px-24 py-8' type='text' name='apellido' placeholder={`${translations('apellido')} *`} />
                </div>
                <div className='flex flex-col space-y-12 sm:space-y-0 sm:flex-row sm:space-x-24 relative'>
                    <div className='relative w-full sm:w-1/2'>
                        <input className='border-custom rounded-custom w-full px-24 py-8' name='telefono' type='text' placeholder={`${translations('telefono')} *`} />
                    </div>
                    <input className='border-custom rounded-custom w-full sm:w-1/2 px-24 py-8' name='correo' type='text' placeholder={`${translations('correo')} *`} />
                </div>
                {/* <div className='relative w-full'>
                    <input className='border-custom rounded-custom w-full px-24 py-8' name='razon' type='text' placeholder='Razón de contacto *' />
                    <KeyboardArrowDown className='absolute right-16 top-8' />
                </div> */}
                <textarea className='border-custom rounded-custom w-full px-24 py-8' name='mensaje' rows={6} placeholder={`${translations('mensaje')} *`} />
                <ButtonDark extraClasses='p-8' type='submit'>{formState}</ButtonDark>
            </form>
            {props.showEnvelope && <Image className='absolute hidden lg:block top-128 -right-64'
                src='/media/envelope.svg'
                alt=''
                width={293}
                height={251}
            />}
        </div>
    )
}

export default ContactForm
