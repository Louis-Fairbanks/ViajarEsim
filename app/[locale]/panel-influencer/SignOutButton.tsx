'use client'
import React from 'react'
import { signOut } from "next-auth/react";

const SignOutButton = () => {
  return (
        <button className="ml-auto py-8 px-32 border-custom border-alert rounded-custom w-1/4" onClick={() => signOut()}>Salir</button>
  )
}

export default SignOutButton
