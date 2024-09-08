import React from 'react'
import NumberAndStepName from './NumberAndStepName'

type Props = {
    currentStep: number
}

const stepNamesAndNumbers = [
    {
        stepNumber : '1',
        stepName: 'Instalar'
    },
    {
        stepNumber : '2',
        stepName: 'Agregar'
    },
    {
        stepNumber : '3',
        stepName: 'Etiquetas'
    },
    {
        stepNumber : '4',
        stepName: 'Lineas predeterminadas'
    },
    {
        stepNumber : '5',
        stepName: 'iMessage'
    },
    {
        stepNumber : '6',
        stepName: 'Datos celulares'
    },
    {
        stepNumber : '7',
        stepName: 'Contactos'
    },
]

const InstallationSteps = ({currentStep} : Props) => {
  return (
    <div className='border-custom rounded-custom p-24'>
      {
        stepNamesAndNumbers.map((step, index) => {
            return <NumberAndStepName key={index} stepReached={currentStep < parseInt(step.stepNumber)}
            stepChecked={currentStep > parseInt(step.stepNumber)} stepName={step.stepName} stepNumber={step.stepNumber} lastStep={stepNamesAndNumbers.length}/>
        })
      }
    </div>
  )
}

export default InstallationSteps
