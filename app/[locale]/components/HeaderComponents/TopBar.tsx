'use client';
import React from 'react';
import dynamic from 'next/dynamic';
import { Link } from '@/routing';

const WhatsApp = dynamic(() => import('@mui/icons-material/WhatsApp'), { ssr: false });

const TopBar = () => {
  const phoneNumber = '+5491125137092'; // Remove spaces and add country code
  const whatsappUrl = `https://wa.me/${phoneNumber}`;

  return (
    <div className="flex justify-center items-center gap-8 bg-background-alternate py-12 flex-shrink-0">
      <WhatsApp fontSize="small" />
      <Link href={whatsappUrl}>
        <p className="font-normal">
          WhatsApp 24/7: <span className="font-medium underline">+549 112 513 7092</span>
        </p>
      </Link>
    </div>
  )
}

export default TopBar;