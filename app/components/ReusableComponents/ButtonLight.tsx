'use client';
import React, { ReactNode } from 'react'

interface Props {
    children: ReactNode
    extraClasses?: string
    type?: 'button' | 'submit' | 'reset'
    deactivated? : boolean
    onClick? : () => void
}

const ButtonLight = ({ children, extraClasses, type = 'button', deactivated = false, onClick }: Props) => {
  return (
    <button onClick={onClick}
      className={`border-custom  rounded-custom  bg-background font-medium transition-all 
      duration-300 ease-linear hover:border-button-hover focus:border-button-focused active:border-button-pressed
      hover:text-button-hover focus:text-button-focused active:text-button-pressed ${extraClasses}
      ${deactivated ? 'border-button-light-deactivated text-text-faded pointer-events-none cursor-not-allowed' : 'border-primary text-primary'}`}
      type={type}
    >
      {children}
    </button>
  )
}

export default ButtonLight