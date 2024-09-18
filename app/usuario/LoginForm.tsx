'use client'
import React from 'react'
import {signIn, signOut, useSession} from 'next-auth/react'
import { redirect } from "next/navigation";
import ButtonDark from '../components/ReusableComponents/ButtonDark';

const LoginForm = () => {


function AuthButton() {
    const {data: session} = useSession();

    //this should probably be a redirect
    if(session){
        redirect('/panel-influencer')
    }
    return   (
   
    <ButtonDark extraClasses='px-32 py-8' onClick={() => signIn()}>Por favor, logueate a través de este link</ButtonDark>
    )
}
  return (
    <div className='flex flex-col'>
      <AuthButton/>
    </div>
  )
}

export default LoginForm
