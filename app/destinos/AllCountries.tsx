'use client'
import React from 'react'
import Tab from '../components/ReusableComponents/Tab'

interface Props {
    category: string;
    setCategory: React.Dispatch<React.SetStateAction<string>>;
}

const AllCountries = ({ category, setCategory }: Props) => {
    const tabs = [
        { text: 'A - A', value: 'A' },
        { text: 'B - B', value: 'B' },
        { text: 'C - D', value: 'CD' },
        { text: 'E - F', value: 'EF' },
        { text: 'H - K', value: 'HK' },
        { text: 'I - M', value: 'IM' },
        { text: 'N - P', value: 'NP' },
        { text: 'R - T', value: 'RT' },
        { text: 'V - S', value: 'VS' },
    ];

    return (
        <div className='p-24 sm:p-64 flex flex-col space-y-24'>
            <h3 className='text-center text-subheading'>Filtrar por letra</h3>
            <div className='flex flex-wrap gap-y-8 lg:flex-nowrap w-full space-x-8 xl:space-x-24 justify-center'>
                {tabs.map((tab) => (
                    <span key={tab.value} onClick={() => setCategory(tab.value)}>
                        <Tab 
                            innerText={tab.text} 
                            extraClasses='py-8 px-24' 
                            category={category} 
                            setCategory={setCategory} 
                        />
                    </span>
                ))}
            </div>
        </div>
    )
}

export default AllCountries