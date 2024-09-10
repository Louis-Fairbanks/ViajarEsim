'use client';
import React, { useState } from 'react'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

interface Props {
  question: string
  category: string
  currentCategory: string
  answer?: string
}

const Faq = (props: Props) => {

  const [isOpened, setIsOpened] = useState<boolean>(false)

  return (
      <div className={`cursor-pointer h-fit flex flex-col p-24 justify-between border-custom rounded-custom transition-all duration-300 ease-linear 
       ${isOpened ? 'border-light-button-border' : 'hover:border-light-button-border'}
       ${props.currentCategory ? props.currentCategory === props.category ? '' : 'hidden' : ""}`}
       onClick={() => setIsOpened(!isOpened)}>
        <div className="flex justify-between">
          <p className="">{props.question}</p>
          <KeyboardArrowDownIcon className={`
          ${isOpened ? 'rotate-180': ''}`}></KeyboardArrowDownIcon>
        </div>
        <div className={`transition-all duration-300 ease-linear overflow-hidden ${isOpened ? 'max-h-[500px]' : 'max-h-0'}`}>
          <hr className='my-24 border-accent'></hr>
          <p>{props.answer}</p>
        </div>
      </div> 
  )
}

export default Faq
