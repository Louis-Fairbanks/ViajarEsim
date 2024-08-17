'use client';
import React from 'react'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

interface Props {
  question: string
  category: string
  currentCategory: string
  answer?: string
}

const Faq = (props: Props) => {

  return (
      <div className={`flex p-24 justify-between border-custom rounded-custom ${props.currentCategory === props.category ? '' : 'hidden'}`}>
        <p className="">{props.question}</p>
        <KeyboardArrowDownIcon />
      </div>
  )
}

export default Faq
