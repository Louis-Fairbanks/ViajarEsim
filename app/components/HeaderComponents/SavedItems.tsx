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
        <ButtonDark children={'Enviar todo al carrito'} extraClasses='py-8'/>
        <ButtonLight children={'Seguir comprando'} extraClasses='py-8'/>
      </div>
    </div>
  )
}

export default SavedItems
