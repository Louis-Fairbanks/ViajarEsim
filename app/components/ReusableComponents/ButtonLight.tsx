'use client';
import React, { ReactNode } from 'react'

interface Props {
    children: ReactNode
    extraClasses?: string
    type?: 'button' | 'submit' | 'reset'
}

const ButtonLight = ({ children, extraClasses, type = 'button' }: Props) => {
  return (
    <button 
      className={`border-custom border-primary rounded-custom text-primary bg-background font-medium transition-all 
      duration-300 ease-linear hover:border-button-hover focus:border-button-focused active:border-button-pressed
      hover:text-button-hover focus:text-button-focused active:text-button-pressed ${extraClasses}`}
      type={type}
    >
      {children}
    </button>
  )
}

export default ButtonLight