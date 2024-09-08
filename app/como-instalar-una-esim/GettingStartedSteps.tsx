import React from 'react'
import GettingStartedStep from './GettingStartedStep'

type Props = {
    installationMethod: string
}


const QRCards = [
    {
        number: '1',
        title: 'Revisa tu correo electrónico',
        text: 'Usa un dispositivo diferente al que usarás para la instalación, accede a tu correo y localiza el email con el código QR. Si no lo recibiste, ponte en contacto con nosotros.'
    },
    {
        number: '2',
        title: 'Escanea el código QR',
        text: 'Abre la cámara del iPhone donde instalarás la eSIM y escanea el código. Otra opción es ir a “Ajustes”, luego “Red celular”, y elegir “Añadir plan de datos” para escanear el código.'
    },
    {
        number: '3',
        title: 'Sigue los pasos de instalación de tu iPhone',
        text: 'Al escanear el código, se iniciará la instalación. Utiliza la guía siguiente para configurar todo paso a paso.'
    }
]

const manualCards = [
    {
        number: '1',
        title: 'Abre tu correo electrónico',
        text: 'Te enviamos los códigos “SM-DAP + Address” y “Activation Code” al email.'
    },
    {
        number: '2',
        title: 'Abre “Configuración” en tu iPhone',
        text: 'Luego ve a “Red Celular”, presiona “Agregar eSIM” o “Agregar plan de datos” y selecciona “Usar código QR” .'
    },
    {
        number: '3',
        title: 'Sigue los pasos de instalación de tu iPhone',
        text: 'Una vez estés en “Escanear código QR”, selecciona ingresar detalles manualmente y sigue los pasos que despliega tu iPhone.'
    }
]

const GettingStartedSteps = ({ installationMethod } : Props) => {
    return (
      <div className='grid grid-cols-3 gap-x-48'>
        {installationMethod === 'QR' ? QRCards.map((card, index) => {
          return <GettingStartedStep key={index} stepNumber={card.number} title={card.title} text={card.text}></GettingStartedStep>
        }) : manualCards.map((card, index) => {
          return <GettingStartedStep key={index} stepNumber={card.number} title={card.title} text={card.text}></GettingStartedStep>
        })
        }
      </div>
    )
  }
  

export default GettingStartedSteps
