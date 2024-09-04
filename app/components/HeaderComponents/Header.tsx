import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import NavAndHeaderButtons from './NavAndHeaderButtons'
import CartOpener from './CartOpener'

const Header = () => {
  return (
    <div className='bg-background flex flex-row-reverse lg:flex-row px-32 lg:px-16 xl:px-32 py-16 justify-between items-center flex-shrink-0 border-b-custom border-accent'>
      <CartOpener/>
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
