'use client';
import React, { useState, useEffect, useRef } from 'react'
import ButtonDark from './ButtonDark';
import SearchIcon from '@mui/icons-material/Search';
import PinDropOutlined from '@mui/icons-material/PinDropOutlined';
import Fuse from 'fuse.js';
import DestinationDropdown from './DestinationDropdown';
import { useTranslations } from 'next-intl';
import { useLocale }from 'next-intl';

interface Props {
  extraClasses?: string
  unstyledSearchbar?: boolean
  callAPIimmediately: boolean
}

interface SearchResult {
  item: { nombre: string, imgurl: string },
  refIndex: number
}

async function fetchAllRegions() {
  const response = await fetch('/api/autocomplete');
  if (!response.ok) {
    throw new Error('Failed to fetch regions');
  }
  const data = await response.json();
  return data.data;
}

const Search = ({ extraClasses, unstyledSearchbar, callAPIimmediately}: Props) => {

  const locale = useLocale();

  const translations = useTranslations('Search')

  //fuzzy search
  const fuseOptions = {
    threshold: 0.2,
    distance: 100,
    keys: [
      'nombre'
    ]
  }

  const fuseRef = useRef<Fuse<any>>();

  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<SearchResult[]>();
  const [showDropdown, setShowDropdown] = useState<Boolean>(true);
  const [allRegions, setAllRegions] = useState<any>([]);

  useEffect(() => {
    const loadRegions = async () => {
        try {
            const regions = await fetchAllRegions();
            setAllRegions(regions);
        } catch (error) {
            console.error('Failed to fetch regions:', error);
        }
    };
    if (callAPIimmediately) {
        loadRegions();
    }
}, [callAPIimmediately]);

  useEffect(() => {
    fuseRef.current = new Fuse(allRegions, fuseOptions);
  }, [allRegions]);

  //handle outside clicks to hide autocomplete
  const searchBarRef: any = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchBarRef.current && !searchBarRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.body.addEventListener('click', handleClickOutside);

    return () => {
      document.body.removeEventListener('click', handleClickOutside);
    };
  }, [searchBarRef]);

  //search for results
  useEffect(() => {
    if (searchTerm === '') return;
    setShowDropdown(true);
    const returnedResults: SearchResult[] | undefined = fuseRef.current?.search(searchTerm)
    returnedResults && returnedResults.length > 0 ? setResults(returnedResults) : setResults([]);
  }, [searchTerm])

  //handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }


  return (
    <>
      <form ref={searchBarRef} className={`bg-background flex flex-col border-custom relative ${extraClasses} 
      ${results ? (showDropdown ? 'rounded-tr-custom rounded-tl-custom' : 'rounded-custom') : 'rounded-custom'}
      ${unstyledSearchbar ? 'p-8 mt-0' : 'px-8 py-8 shadow-input mt-16'}`} style={{ maxHeight: `${unstyledSearchbar ? '40px' : ''}` }}>
        <div className='flex justify-between w-full'>
          <div className='flex items-center space-x-12 w-full'>
            {unstyledSearchbar ? <SearchIcon style={{ fill: '#C7C7C7' }} /> :
              <PinDropOutlined style={{ fill: '#6C85FF' }} />}
            {unstyledSearchbar ? <></> : <hr className='h-16 w-1 bg-light-button-border'></hr>}
            <input className='w-full focus:outline-none' type='text'
              placeholder={`${unstyledSearchbar ? translations('buscaPais') : translations('aDondeQuieresIr')}`}
              value={searchTerm}
              onChange={handleInputChange} />
          </div>
          {unstyledSearchbar ? <></> : <ButtonDark extraClasses='p-10' type='submit'>
            <SearchIcon style={{ fill: 'white' }} />
          </ButtonDark>}
        </div>
        {results && showDropdown && <div className='absolute -left-2 px-8 top-full border-b-custom border-r-custom border-l-custom
         bg-background rounded-bl-custom rounded-br-custom z-50'
          style={{ width: 'calc(100% + 4px)' }}>
          <p className='my-8 text-left'>Destinos</p>
          {results.length === 0 && <div className='border-t-custom text-small text-text-faded text-center py-16'>No hay resultados para tu búsqueda</div> }
          {results.length > 0 && results?.map((result, index) => {
            if (index > 2) {
              return;
            }
            return <DestinationDropdown key={result.refIndex} name={result.item.nombre} imgurl={result.item.imgurl} />
          })}
        </div>}
      </form>
    </>
  )
}

export default Search
