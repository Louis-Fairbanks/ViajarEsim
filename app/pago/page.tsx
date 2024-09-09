import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import FooterAbove from '../components/HomeSections/FooterAbove'
import Footer from '../components/HomeSections/Footer'
import PaymentForm from './PaymentForm'
import CartSummary from './CartSummary'

const page = () => {
    return (
        <>
            <div className='flex flex-col'>
                <div className='flex px-32 py-16 justify-center lg:justify-between items-center flex-shrink-0 border-b-custom border-accent'>
                    <Link href='/'>
                        <div className='flex space-x-8 items-center text-subheading'>
                            <Image
                                src='/img/favicon.png'
                                alt='logo viajar esim'
                                width={36}
                                height={36}
                            />
                            <h1 className='font-semibold'>ViajareSIM</h1>
                        </div>
                    </Link>
                </div>
                <div className='flex-grow border-b-custom flex flex-col-reverse lg:flex-row justify-center lg:space-x-12 xl:space-x-48 py-32'>
                    <PaymentForm />
                    <CartSummary />
                </div>
            </div>
            <FooterAbove alternateCopy={true} hideButton={true}/>
            <Footer />
        </>
    )
}

export default page
