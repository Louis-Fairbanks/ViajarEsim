import React from 'react'
import Header from '../components/HeaderComponents/Header'
import TopBar from '../components/HeaderComponents/TopBar'
import Image from 'next/image'

const page = () => {
    return (
        <>
            <div className='flex flex-col h-screen'>
                <TopBar />
                <Header />
                <div className='flex-grow h-full relative'>
                    <Image className='absolute w-full z-20'
                        src='/media/fondoOlas.png'
                        alt=''
                        width={650}
                        height={78}
                    />
                    <Image className='absolute w-full bottom-0 rotate-180'
                        src='/media/fondoOlas.png'
                        alt=''
                        width={650}
                        height={78}
                    />
                    <Image className='absolute right-0 top-32'
                        src='/media/lightbulb.svg'
                        alt=''
                        width="300"
                        height="300"
                    />
                    <Image className='absolute bottom-32 -left-64 scale-150 -z-10'
                        src='/media/campana.svg'
                        alt=''
                        width='300'
                        height='300'
                    />
                </div>
            </div>
        </>
    )
}

export default page
