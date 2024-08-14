import React from 'react'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

interface Props {
    question : string
}

const Faq = (props : Props) => {
  return (
    <div className='flex p-24 justify-between border-custom rounded-custom'>
      <p className="">{props.question}</p>
      <KeyboardArrowDownIcon/>
    </div>
  )
}

export default Faq
