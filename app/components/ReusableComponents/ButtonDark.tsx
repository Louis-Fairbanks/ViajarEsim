'use client'
import React, { ReactNode } from 'react'

interface Props {
    children: ReactNode
    extraClasses?: string
    type?: 'button' | 'submit' | 'reset'
    deactivated? : boolean
}

const ButtonDark = ({ children, extraClasses, type = 'button' , deactivated = false}: Props) => {
  return (
    <button 
      className={`rounded-custom text-background font-medium transition-all duration-300 ease-linear
       hover:bg-button-hover active:bg-button-pressed focus:bg-button-focused ${extraClasses}
       ${deactivated ? 'bg-accent pointer-events-none cursor-not-allowed text-text-faded' : 'bg-primary'}`}  
      type={type}
    >
      {children}
    </button>
  )
}

export default ButtonDark