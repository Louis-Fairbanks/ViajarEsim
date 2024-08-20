'use client';
import React, { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  extraClasses?: string;
  onClick? : () => void;
}

const HeaderButton = ({ children, extraClasses, onClick}: Props) => {
  return (
    <button onClick={onClick} 
      className={`p-6 border-custom rounded-custom border-light-button-border cursor-pointer ${extraClasses}`}
    >
      {children}
    </button>
  );
};

export default HeaderButton;