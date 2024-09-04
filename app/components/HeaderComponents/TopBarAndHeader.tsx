import React from 'react'
import TopBar from './TopBar'
import Header from './Header'

const TopBarAndHeader = () => {
    return (
        <div className='min-h-128 z-[1]'>
            <div className='fixed w-full'>
                <TopBar />
                <Header />
            </div>
        </div>
    )
}

export default TopBarAndHeader
