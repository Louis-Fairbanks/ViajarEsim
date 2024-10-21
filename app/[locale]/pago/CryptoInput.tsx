import React, { useState, useRef, useEffect } from 'react';
import { KeyboardArrowDown, Search } from '@mui/icons-material';
import Fuse from 'fuse.js';

// Define the CryptoCurrency type
interface CryptoCurrency {
    name: string;
    network: string;
}

// Create the list of cryptocurrencies
const cryptocurrencies: CryptoCurrency[] = [
    { name: 'AVAX', network: 'avalanche' },
    { name: 'BCH', network: 'bch' },
    { name: 'BNB', network: 'bsc' },
    { name: 'BTC', network: 'btc' },
    { name: 'DAI', network: 'polygon' },
    { name: 'DAI', network: 'bsc' },
    { name: 'DAI', network: 'eth' },
    { name: 'DASH', network: 'dash' },
    { name: 'DOGE', network: 'doge' },
    { name: 'ETH', network: 'arbitrum' },
    { name: 'ETH', network: 'eth' },
    { name: 'ETH', network: 'bsc' },
    { name: 'HMSTR', network: 'ton' },
    { name: 'LTC', network: 'ltc' },
    { name: 'MATIC', network: 'eth' },
    { name: 'MATIC', network: 'polygon' },
    { name: 'SHIB', network: 'eth' },
    { name: 'SOL', network: 'sol' },
    { name: 'TON', network: 'ton' },
    { name: 'TRX', network: 'tron' },
    { name: 'USDC', network: 'eth' },
    { name: 'USDC', network: 'avalanche' },
    { name: 'USDC', network: 'polygon' },
    { name: 'USDC', network: 'arbitrum' },
    { name: 'USDC', network: 'bsc' },
    { name: 'USDT', network: 'polygon' },
    { name: 'USDT', network: 'arbitrum' },
    { name: 'USDT', network: 'eth' },
    { name: 'USDT', network: 'ton' },
    { name: 'USDT', network: 'bsc' },
    { name: 'USDT', network: 'tron' },
    { name: 'USDT', network: 'sol' },
    { name: 'USDT', network: 'avalanche' },
    { name: 'VERSE', network: 'eth' },
    { name: 'XMR', network: 'xmr' },
];

interface Props {
    selectedCrypto: CryptoCurrency | null;
    setSelectedCrypto: React.Dispatch<React.SetStateAction<CryptoCurrency | null>>;
}

const CryptoInput: React.FC<Props> = ({ selectedCrypto, setSelectedCrypto }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const dropdownRef = useRef<HTMLDivElement>(null);

    const fuseOptions = {
        threshold: 0.3,
        keys: ['name', 'network']
    };

    const fuse = new Fuse(cryptocurrencies, fuseOptions);

    const handleCryptoChange = (crypto: CryptoCurrency) => {
        setSelectedCrypto(crypto);
        setIsDropdownOpen(false);
        setSearchTerm('');
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

    const filteredCryptos = searchTerm
        ? fuse.search(searchTerm).map(result => result.item)
        : cryptocurrencies;

    return (
        <div className="relative" ref={dropdownRef}>
            <div
                className="border border-gray-300 rounded-custom p-8 flex items-center justify-between cursor-pointer"
                onClick={handleDropdownToggle}
            >
                <span>{selectedCrypto ? `${selectedCrypto.name} (${selectedCrypto.network})` : 'Seleccionar moneda y red'}</span>
                <KeyboardArrowDown className='text-text-faded'></KeyboardArrowDown>
            </div>
            {isDropdownOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                    <div className="sticky top-0 bg-white p-2 border-gray-300">
                        <div className="relative">
                            <Search className="absolute right-0 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={handleSearchChange}
                                className="w-full pl-8 pr-2 py-1 border border-gray-300 rounded-md"
                            />
                        </div>
                    </div>
                    {filteredCryptos.map((crypto, index) => (
                        <div
                            key={index}
                            className="p-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => handleCryptoChange(crypto)}
                        >
                            {crypto.name} ({crypto.network})
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CryptoInput;