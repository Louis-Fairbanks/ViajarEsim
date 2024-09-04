import React from 'react'

const RegionSkeletonLoader = () => {
    return (
        <div className='p-24 sm:p-64 flex h-screen space-x-0 md:space-x-48'>
            <div className='hidden lg:block w-1/2 h-3/4 rounded-64 bg-accent'></div>
            <div className='w-full lg:w-1/2'>
                <div className='flex h-48 gap-x-12 items-center'>
                    <div className='h-48 rounded-full  w-48 bg-accent'></div>
                    <div className='h-24 rounded-20 w-1/2 bg-accent'></div>
                </div>
                <div className='flex justify-between'>
                    <div className='w-full'>
                        <div className='flex h-48 gap-x-12 items-center'>
                            <div className='h-32 w-32 rounded-full bg-accent'></div>
                            <div className='h-24 rounded-20 w-2/3 bg-accent'></div>
                        </div>
                        <div className='flex h-48 gap-x-12 items-center'>
                            <div className='h-32 w-32 rounded-full bg-accent'></div>
                            <div className='h-24 rounded-20 w-2/3 bg-accent'></div>
                        </div>
                        <div className='flex h-48 gap-x-12 items-center'>
                            <div className='h-32 w-32 rounded-full bg-accent'></div>
                            <div className='h-24 rounded-20 w-1/3 bg-accent'></div>
                        </div>
                        <div className='flex h-48 gap-x-12 items-center'>
                            <div className='h-32 w-32 rounded-full bg-accent'></div>
                            <div className='h-24 rounded-20 w-1/3 bg-accent'></div>
                        </div>
                    </div>
                    <div className='bg-accent h-48 w-256 rounded-20'></div>
                </div>
                <div className='bg-accent h-12 w-256 my-12 rounded-custom'></div>
                <div className='grid grid-cols-2 gap-8'>
                    <div className='h-128 w-full bg-accent rounded-20'></div>
                    <div className='h-128 w-full bg-accent rounded-20'></div>
                    <div className='h-128 w-full bg-accent rounded-20'></div>
                    <div className='h-128 w-full bg-accent rounded-20'></div>
                    <div className='h-128 w-full bg-accent rounded-20'></div>
                    <div className='h-128 w-full bg-accent rounded-20'></div>
                    <div className='h-128 w-full bg-accent rounded-20'></div>
                    <div className='h-128 w-full bg-accent rounded-20'></div>
                </div>
            </div>
        </div>
    )
}

export default RegionSkeletonLoader
