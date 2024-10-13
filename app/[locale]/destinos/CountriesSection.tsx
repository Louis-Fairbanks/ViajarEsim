'use client'
import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useLocale } from 'next-intl'
import AllCountries from './AllCountries'
import CountryCard from './CountryCard'
import { Link } from '@/routing'

type Region = {
  nombre: string,
  imgurl: string,
  min_price: string
}

interface Props {
  initialRegions: Region[];
  category: string;
}

const CountriesSection: React.FC<Props> = ({ initialRegions, category }) => {
  const locale = useLocale();

  const getCategoryRegex = (category: string) => {
    switch (category) {
      case 'a': return 'a';
      case 'b': return 'b';
      case 'cd': return 'c|d';
      case 'eg': return 'e|f|g';
      case 'hk': return 'h|i|j|k';
      case 'lm': return 'l|m';
      case 'np': return 'n|o|p';
      case 'rs': return 'r|s';
      case 'tv': return 't|u|v';
      default: return '';
    }
  }

  const [loadedRegions, setLoadedRegions] = useState<Region[]>([])
  const [regionChunks, setRegionChunks] = useState<Region[][]>([])
  const [loadNext40, setLoadNext40] = useState<boolean>(false)
  const [loadNext80, setLoadNext80] = useState<boolean>(false)
  const [loadNext120, setLoadNext120] = useState<boolean>(false)
  const [loadNext160, setLoadNext160] = useState<boolean>(false)
  const [loadObserver, setLoadObserver] = useState<boolean>(false);

  const observerTarget = useRef(null);

  useEffect(() => {
    const chunks = Array.from({ length: Math.ceil(initialRegions.length / 40) }, (v, i) =>
      initialRegions.slice(i * 40, i * 40 + 40)
    );
    
    if (category !== '') {
      const categoryRegex = getCategoryRegex(category);
      const regex = new RegExp(`^${categoryRegex}`, 'i');

      let filteredRegions: Region[] = initialRegions.filter((region: Region) => {
        return regex.test(region.nombre.charAt(0));
      });
      setLoadedRegions(filteredRegions)
    } else {
      setRegionChunks(chunks)
      setLoadedRegions(chunks[0])
      setLoadObserver(true)
    }
  }, [category, initialRegions])

  const addNext40Functions = useCallback(() => {
    if(category !== ''){
      return;
    }
    if (!loadNext40) {
      setLoadNext40(true);
      setLoadedRegions(prevState => [...prevState, ...regionChunks[1]])
    } else if (loadNext40 && !loadNext80) {
      setLoadNext80(true);
      setLoadedRegions(prevState => [...prevState, ...regionChunks[2]])
    } else if (loadNext40 && loadNext80 && !loadNext120) {
      setLoadNext120(true);
      setLoadedRegions(prevState => [...prevState, ...regionChunks[3]])
    } else if (loadNext40 && loadNext80 && loadNext120 && !loadNext160) {
      setLoadNext160(true);
      setLoadedRegions(prevState => [...prevState, ...regionChunks[4]])
    }
  }, [loadNext40, loadNext80, loadNext120, loadNext160, regionChunks, category])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          addNext40Functions();
        }
      },
      {
        root: null,
        rootMargin: `0px 0px ${window.innerHeight * 0.33}px 0px`,
        threshold: 0,
      }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [addNext40Functions]);

  console.log(loadedRegions)

  return (
    <div>
      <AllCountries category={category} />
      <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pb-64 mx-24 sm:mx-64 gap-24 border-b-custom'>
        {loadedRegions && loadedRegions.map((region, index) => {
          let url = region.nombre.toLowerCase();
          url = url.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
          url = url.replace(/\s+/g, '-');

          return (
            <Link href={`${url}`} key={index}>
              <CountryCard
                region={region.nombre}
                min_price={region.min_price}
                imgPath={region.imgurl}
                category={category}
              />
            </Link>
          );
        })}
      </div>
      {loadObserver && <div ref={observerTarget} style={{ height: '1px' }}></div>}
    </div>
  )
}

export default CountriesSection