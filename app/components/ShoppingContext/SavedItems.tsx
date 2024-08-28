import React from 'react'
import ButtonDark from '../ReusableComponents/ButtonDark'
import ButtonLight from '../ReusableComponents/ButtonLight'
import SavedItem from './SavedItem'

const SavedItems = () => {
  return (
    <div className='flex flex-col justify-between h-full'>
      <div className='flex flex-col'>
        <SavedItem planName='eSIM Estados Unidos' price='$6,00' region='us'/>
        <SavedItem planName='eSIM Estados Unidos' price='$6,00' region='us'/>
        <SavedItem planName='eSIM Estados Unidos' price='$6,00' region='us'/>
      </div>
      <div className='flex flex-col border-t-custom space-y-16'>
        <div className='flex justify-between pt-16'>
            <p className='font-semibold text-subheading'>Total</p>
            <div className='font-semibold text-subheading'>$6,00 <span className='text-small text-text-faded'>USD</span></div>
        </div>
        <ButtonDark  extraClasses='py-8'>Enviar todo al carrito</ButtonDark>
        <ButtonLight extraClasses='py-8'>Seguir comprando</ButtonLight>
      </div>
    </div>
  )
}

export default SavedItems
