'use client';
import React, { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  extraClasses?: string;
}

const HeaderButton = ({ children, extraClasses = ''}: Props) => {
  return (
    <button 
      className={`p-6 border-custom rounded-custom border-light-button-border ${extraClasses}`}
    >
      {children}
    </button>
  );
};

export default HeaderButton;