'use client'
import React, { useState, useRef, useEffect } from 'react'
import { countryCodes, CountryCode } from './CountryCodes'
import { KeyboardArrowDown, Search } from '@mui/icons-material';
import Fuse from 'fuse.js';
import 'flag-icons/css/flag-icons.min.css';

interface Props {
    celular: string;
    setCelular: React.Dispatch<React.SetStateAction<string>>;
    countryCode: CountryCode;
    setCountryCode: React.Dispatch<React.SetStateAction<CountryCode>>;
    placeholder: string;
}

const PhoneInput = ({ celular, setCelular, countryCode, setCountryCode, placeholder }: Props) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const dropdownRef = useRef<HTMLDivElement>(null);

    const fuseOptions = {
        threshold: 0.1,
        distance: 100,
        keys: ['name']
    }

    const fuse = new Fuse(countryCodes, fuseOptions);

    const handleCountryCodeChange = (country: CountryCode) => {
        setCountryCode(country);
        setIsDropdownOpen(false);
        setSearchTerm('');
    };

    const handleCelularChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, '');
        setCelular(value);
    };

    const handleDropdownToggle = () => {
        setIsDropdownOpen(!isDropdownOpen);
        setSearchTerm('');
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
                setSearchTerm('');
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const filteredCountries = searchTerm
        ? Array.from(
            new Map(
                fuse.search(searchTerm)
                    .map(result => result.item)
                    .map(item => [item.isocode, item])
            ).values()
          )
        : countryCodes;

    return (
        <div className='flex w-full sm:w-1/2 relative' ref={dropdownRef}>
            <div className='w-1/2 relative'>
                <div
                    className='rounded-tl-custom border-custom p-8 w-full cursor-pointer flex items-center justify-between'
                    onClick={handleDropdownToggle}
                    tabIndex={0}
                >
                    <div className='flex items-center'>
                        <div className="relative w-32 h-32 overflow-hidden pb-6 rounded-full border-custom mr-8">
                            <span className={`fi fi-${countryCode.isocode} h-32 w-32 absolute left-1/2 top-1/2 -translate-x-1/2 scale-200 -translate-y-1/2`}></span>
                        </div>
                        <span>{countryCode.code}</span>
                    </div>
                    <span className="ml-2"><KeyboardArrowDown className='text-text-faded'></KeyboardArrowDown></span>
                </div>
                {isDropdownOpen && (
                    <div className='absolute z-10 w-full max-h-256 bg-background overflow-y-auto rounded-custom border-custom rounded-t-none rounded-b-lg shadow-lg'>
                        <div className='relative'>
                            <Search className='text-text-faded right-8 absolute top-1/2 -translate-y-1/2' />
                            <input type='text' value={searchTerm} onChange={handleSearchChange} tabIndex={0}
                            className="w-full p-8 border-b-custom flex items-center"/>
                        </div>
                        {filteredCountries.map((country) => (
                            <div
                                key={country.isocode}
                                className='country-item p-8 cursor-pointer flex items-center'
                                onClick={() => handleCountryCodeChange(country)}
                            >
                                <div className="relative w-32 h-32 overflow-hidden pb-6 rounded-full border-custom mr-8">
                                    <span className={`fi fi-${country.isocode} h-32 w-32 absolute left-1/2 top-1/2 -translate-x-1/2 scale-200 -translate-y-1/2`}></span>
                                </div>
                                <span>({country.code})</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <input
                type='tel'
                className='rounded-r-custom border-custom p-8 w-1/2'
                placeholder={placeholder}
                onChange={handleCelularChange}
                value={celular}
            />
        </div>
    )
}

export default PhoneInput