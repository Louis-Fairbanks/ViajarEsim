'use client'
import React, { ReactNode } from 'react'

interface Props {
    children: ReactNode
    extraClasses?: string
    type?: 'button' | 'submit' | 'reset'
}

const ButtonDark = ({ children, extraClasses, type = 'button' }: Props) => {
  return (
    <button 
      className={`bg-primary rounded-custom text-background font-medium transition-all duration-300 ease-linear
       hover:bg-button-hover active:bg-button-pressed focus:bg-button-focused ${extraClasses}`}  
      type={type}
    >
      {children}
    </button>
  )
}

export default ButtonDark