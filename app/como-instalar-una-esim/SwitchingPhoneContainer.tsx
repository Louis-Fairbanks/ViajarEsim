import React from 'react'
import Image from 'next/image'
import ButtonDark from '../components/ReusableComponents/ButtonDark'
import InstallationStepsText from './InstallationStepsText'
import { text } from 'stream/consumers'

type Props = {
    currentStep : number
    setCurrentStep: React.Dispatch<React.SetStateAction<number>>
}

const iPhoneStepsText = [
    {
        title: 'Instala tu plan de datos',
        textPart1: 'Una vez escaneado el código QR con tu iPhone, la instalación empezará de inmediato.',
        textPart2: 'Haz clic en Continuar.'
    },
    {
        title: 'Configuración celular finalizada',
        textPart1: 'En este momento, el plan se ha instalado correctamente.',
        textPart2: 'Haz clic en el botón Listo'
    },
    {
        title: 'Etiqueta tu plan de datos',
        textPart1: 'Asígnale a tu nueva línea de ViajareSIM un nombre para identificarla. Por ejemplo: “ViajareSIM España”.',
        textPart2: 'Haz clic en Continuar'
    },
    {
        title: 'Elige tu línea predeterminada',
        textPart1: 'Selecciona la opción “Principal” para seguir recibiendo mensajes y llamadas con tu número.',
        textPart2: 'Haz clic en Continuar'
    },
    {
        title: 'iMessage y FaceTime',
        textPart1: 'Selecciona la opción “Principal” para seguir utilizando tu número en iMessage y FaceTime',
        textPart2: 'Haz clic en Continuar'
    },
    {
        title: 'Datos celulares',
        textPart1: 'Selecciona la opción “Secundaria” y luego mantén apagado “Permitir cambio de datos celulares” para evitar cobros.',
        textPart2: 'Haz clic en Continuar'
    },
    {
        title: 'Actualiza tu línea preferida de contactos',
        textPart1: 'Si llegas a este paso, te sugerimos elegir “Principal” como tu “línea preferida”.',
        textPart2: 'Haz clic en Listo para finalizar el proceso.'
    }
]

const SwitchingPhoneContainer = ({currentStep, setCurrentStep} : Props) => {
  return (
    <div className='border-custom rounded-custom items-center flex flex-col space-y-24 flex-grow'>
        <div className='flex flex-col justify-center items-center relative border-b-2 w-full'>
            <Image className='-z-[1]'
                src={`/media/installationSteps/iphone-qr-${currentStep}.png`}
                alt='iphone'
                width={200}
                height={500}
            />
            <Image className='absolute -z-[10] bottom-0 left-1/2 -translate-x-1/2'
                src='/media/background-rectangle.png'
                alt=''
                width={300}
                height={150}
            />
        </div>
        <InstallationStepsText currentStep={currentStep} title={iPhoneStepsText[currentStep - 1].title}
        textPart1={iPhoneStepsText[currentStep - 1].textPart1} textPart2={iPhoneStepsText[currentStep - 1].textPart2}/>
        <div className='flex space-x-16'>
            <ButtonDark extraClasses='px-32 py-8' onClick={() => setCurrentStep(prevState => prevState - 1)} deactivated={currentStep.toString() === '1' ? true : false}>Paso Anterior</ButtonDark>
            <ButtonDark extraClasses='px-32 py-8' onClick={() => setCurrentStep(prevState => prevState + 1)} deactivated={currentStep === iPhoneStepsText.length}>Siguiente Paso</ButtonDark>
        </div>
    </div>
  )
}

export default SwitchingPhoneContainer
