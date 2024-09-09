'use client'
import React, { useEffect, useState } from 'react'
import { useInstallation } from './InstallationProvider'
import Image from 'next/image'

const VerifyInstallation = () => {
  
    const {selectedDevice} = useInstallation()

    const [imagePath, setImagePath]= useState<string>('')
    const [firstMethod, setFirstMethod] = useState<string>('')
    const [secondMethod, setSecondMethod] = useState<string>('')

    useEffect(() => {
        if(selectedDevice === 'iPhone'){
            setImagePath('/media/installationSteps/iphone-active-verify.png')
            setFirstMethod('1. Verifica que en el ícono de señal de tu iPhone tenga al menos una barra.')
            setSecondMethod('2. Entra a “Configuración” en tu iPhone, ingresa a “Datos Celulares” y presiona la opción de “ViajareSIM” y verifica que “Roaming de datos” o “Itinerancia de datos” esté activado.')
        }
        else{
            setImagePath('/media/installationSteps/android-active-verify.png')
            setFirstMethod('1. Verifica que el nuevo ícono de señal de tu celular tenga al menos una barra.')
            setSecondMethod('2. En los ajustes de tu dispositivo ingresa a “Conexiones”, y presiona la opción de “Administrador de SIM”. Verifica que tu nuevo plan esté activado y que esté seleccionado como SIM preferida para datos móviles.')
        }
    }, [selectedDevice])
  
    return (
    <div className='rounded-2xl bg-gray-gradient p-48 mx-64 flex justify-end space-x-48 relative'>
      <Image className='absolute left-64 bottom-0'
        src={imagePath}
        alt='pantalla de celular'
        height={350}
        width={200}  
    />
      <div className='flex flex-col space-y-16 p-24 rounded-custom bg-background w-3/4'>
        <h2 className='font-semibold text-heading'>¿Cómo sabes que tu eSIM está activa?</h2>
        <p>Puedes revisar de dos formas:</p>
        <p>{firstMethod}</p>
        <p>{secondMethod}</p>
      </div>
    </div>
  )
}

export default VerifyInstallation
