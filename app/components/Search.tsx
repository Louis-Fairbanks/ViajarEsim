'use client';
import React from 'react'
import dynamic from 'next/dynamic';

const SearchIcon = dynamic(() => import('@material-ui/icons/Search'), { ssr: false });
const PinDropOutlined = dynamic(() => import('@material-ui/icons/PinDropOutlined'), { ssr: false });


const Search = () => {
  return (
    <form className='flex justify-between px-8 py-8 border-custom rounded-custom shadow-input mt-16'>
      <div className='flex items-center space-x-12'>
        <PinDropOutlined style={{fill : '#6C85FF'}}/>
        <hr className='roate-90 h-16 w-1 bg-light-button-border'></hr>
        <input type='text' placeholder="¿A donde quieres ir?" />
      </div>
      <button className='bg-primary rounded-custom p-10'><SearchIcon style={{ fill: 'white' }} /></button>
    </form>
  )
}

export default Search
