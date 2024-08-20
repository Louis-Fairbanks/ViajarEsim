import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import NavAndHeaderButtons from './NavAndHeaderButtons'

const Header = () => {
  return (
    <div className='flex px-32 py-16 justify-between items-center flex-shrink-0 border-b-custom border-accent'>
      <Link href='/'>
      <div className='flex space-x-8 items-center text-subheading'>
      <Image
        src='/media/favicon.png'
        alt='logo viajar esim'
        width={36}
        height={36}
      />
      <h1 className='font-semibold'>ViajareSIM</h1>
      </div>
      </Link>
      <NavAndHeaderButtons/>
    </div>
  )
}
export default Header
