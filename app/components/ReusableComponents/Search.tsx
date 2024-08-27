'use client';
import React, { useState, useEffect, useRef } from 'react'
import ButtonDark from './ButtonDark';
import SearchIcon from '@mui/icons-material/Search';
import PinDropOutlined from '@mui/icons-material/PinDropOutlined';
import Fuse from 'fuse.js';
import DestinationDropdown from './DestinationDropdown';


interface Props {
  extraClasses?: string
  unstyledSearchbar?: boolean
}

interface SearchResult {
  item: string,
  refIndex: number
}


const Search = ({ extraClasses, unstyledSearchbar }: Props) => {

  //fuzzy search
  const fuseOptions = {
    threshold: 0.2,
    distance: 100,
    keys: [
      ''
    ]
  }

  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<SearchResult[]>();
  const [showDropdown, setShowDropdown] = useState<Boolean>(true);


  //handle outside clicks to hide autocomplete
  const searchBarRef : any = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event : MouseEvent ) => { 
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
    const returnedResults: SearchResult[] = fuse.search(searchTerm);
    returnedResults.length > 0 ? setResults(returnedResults) : setResults([]);
  }, [searchTerm])

  //handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }

  const RegionesCompletos : any = [];

  const fuse = new Fuse(RegionesCompletos, fuseOptions)
  return (
    <>
      <form ref={searchBarRef} className={`bg-background flex flex-col border-custom relative ${extraClasses} 
      ${results ? (showDropdown ? 'rounded-tr-custom rounded-tl-custom' : 'rounded-custom') : 'rounded-custom'}
      ${unstyledSearchbar ? 'p-8 mt-0' : 'px-8 py-8 shadow-input mt-16'}`}  style={{ maxHeight :  `${unstyledSearchbar ? '40px' : ''}`}}>
        <div className='flex justify-between w-full'>
          <div className='flex items-center space-x-12 w-full'>
            {unstyledSearchbar ? <SearchIcon style={{ fill: '#C7C7C7' }} /> :
              <PinDropOutlined style={{ fill: '#6C85FF' }} />}
            {unstyledSearchbar ? <></> : <hr className='h-16 w-1 bg-light-button-border'></hr>}
            <input className='w-full focus:outline-none' type='text'
              placeholder={`${unstyledSearchbar ? 'Busca el país que más te guste' : '¿A donde quieres ir?'}`}
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
          {results.length === 0 && <div className='border-t-custom text-small text-text-faded text-center py-16'>No hay resultados para tu búsqueda</div>}
          {results.length > 0 && results?.map((result, index) => {
            if (index > 2) {
              return;
            }
            return <DestinationDropdown key={result.refIndex} name={result.item} />
          })}
        </div>}
      </form>
    </>
  )
}

export default Search
