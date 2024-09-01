'use client'
import React from 'react'
import Tab from '../components/ReusableComponents/Tab'
import Link from 'next/link'

interface Props {
    category: string;
}

const AllCountries = ({ category}: Props) => {
    const tabs = [
        { text: 'A - A', value: 'a' },
        { text: 'B - B', value: 'b' },
        { text: 'C - D', value: 'cd' },
        { text: 'E - G', value: 'eg' },
        { text: 'H - K', value: 'hk' },
        { text: 'L - M', value: 'lm' },
        { text: 'N - P', value: 'np' },
        { text: 'R - S', value: 'rs' },
        { text: 'T - V', value: 'tv' },
    ];

    return (
        <div className='p-24 flex flex-col space-y-24'>
            <h3 className='text-center text-subheading'>Filtrar por letra</h3>
            <div className='flex flex-wrap gap-y-8 lg:flex-nowrap w-full space-x-8 xl:space-x-24 justify-center'>
                {tabs.map((tab) => (
                    <span key={tab.value}>
                        <Link href={`/destinos?categoria=${tab.value}`}>
                            <Tab
                                innerText={tab.text}
                                extraClasses='py-8 px-24'
                                category={category}
                            />
                        </Link>
                    </span>
                ))}
            </div>
        </div>
    )
}

export default AllCountries