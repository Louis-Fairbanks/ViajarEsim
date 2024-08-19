'use client'
import React from 'react'

interface Props {
    category: string;
    setCategory: React.Dispatch<React.SetStateAction<string>>;
    innerText : string
    extraClasses?: string
}


const Tab = (props  : Props) => {
    return (
        <button className={`rounded-custom ${props.extraClasses} transition-all duration-300 ease-linear
        hover:bg-button-hover hover:text-background hover:border-none
        active:bg-button-pressed active:text-background active:border-none
${props.category === props.innerText ? 'bg-primary text-white' : 'text-light-button-border border-custom border-light-button-border'}`}
            onClick={() => props.setCategory(props.innerText)}>{props.innerText}</button>
    )
}

export default Tab
