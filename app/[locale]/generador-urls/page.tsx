import React from 'react'
import URLGenerator from './URLGenerator'
import type { Metadata } from 'next';

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false
  },
}

const page = () => {
  return (
    <div>
      <URLGenerator/>
    </div>
  )
}

export default page
