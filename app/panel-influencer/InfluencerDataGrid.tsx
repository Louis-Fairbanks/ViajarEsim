'use client'
import React, {useState} from 'react'
import UniqueLinks from './UniqueLinks'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import DiscountCodes from './DiscountCodes';
import GeneratedPurchases from './GeneratedPurchases';

interface Props {
    title: string
    tableToShow : string
}

const InfluencerDataGrid = ({title, tableToShow} : Props) => {
    const [isOpened, setIsOpened] = useState<boolean>(false)

  return (
    <div className={`cursor-pointer h-fit flex flex-col p-24 mb-16 justify-between border-custom rounded-custom transition-all duration-300 ease-linear 
    ${isOpened ? 'border-light-button-border' : 'hover:border-light-button-border'}`}
    onClick={() => setIsOpened(!isOpened)}>
     <div className="flex justify-between">
       <h1 className="font-medium text-subheading">{title}</h1>
       <KeyboardArrowDownIcon className={`
       ${isOpened ? 'rotate-180': ''}`}></KeyboardArrowDownIcon>
     </div>
     <div className={`transition-all duration-300 ease-linear overflow-hidden ${isOpened ? 'max-h-[500px]' : 'max-h-0'}`}>
       <hr className='my-24 border-accent'></hr>
       {tableToShow === 'links' && <UniqueLinks/>}
       {tableToShow === 'codes' && <DiscountCodes/>}
       {tableToShow === 'purchases' && <GeneratedPurchases/>}
     </div>
   </div> 
  )
}

export default InfluencerDataGrid
