import React from 'react'

const Steps = () => {
    return (
        <div className='flex flex-col px-18 h-100 items-center' style={{maxWidth : '100px'}}>
            <div className='w-64 h-64 flex justify-center items-center rounded-full font-medium text-background bg-primary'>1</div>
            <div className='bg-primary w-1 h-64'></div>
            <div className='bg-accent w-1 h-64'></div>
            <div className='border-custom w-64 h-64 flex justify-center items-center rounded-full font-medium text-accent'>2</div>
            <div className='bg-accent w-1 h-64'></div>
            <div className='bg-accent w-1 h-64'></div>
            <div className='border-custom w-64 h-64 flex justify-center items-center rounded-full font-medium text-accent'>3</div>
        </div>
    )
}

export default Steps
