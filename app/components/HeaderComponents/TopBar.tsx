'use client';
import React from 'react';
import dynamic from 'next/dynamic';

const WhatsApp = dynamic(() => import('@mui/icons-material/WhatsApp'), { ssr: false });

const TopBar = () => {
  return (
    <div className="flex justify-center items-center gap-8 bg-background-alternate py-12 flex-shrink-0">
      <WhatsApp fontSize="small" />
      <p className="font-normal">
        WhatsApp 24/7: +549 112 513 7092<span className="font-medium underline"></span>
      </p>
    </div>
  )
}

export default TopBar;