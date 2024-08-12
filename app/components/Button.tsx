'use client';
import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children }) => {
  return (
    <button className='p-10 border-custom rounded-custom border-light-button-border'>
      {children}
    </button>
  );
};

export default Button;