'use client'
import React from 'react'
import { signIn } from 'next-auth/react'
import ButtonDark from '../components/ReusableComponents/ButtonDark'

const AdminLogin = () => {

    const handleGoogleLogin = async () => {
       await signIn('google', {callbackUrl : '/panel-admin', redirect : false})
    }

  return (
    <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
      <ButtonDark extraClasses='px-32 py-8' onClick={handleGoogleLogin}>Loguear con Google</ButtonDark>
    </div>
  )
}

export default AdminLogin
