'use client'
import React from 'react'

interface Props {
    category?: string;
    setCategory?: React.Dispatch<React.SetStateAction<string>>;
    innerText : string
    extraClasses?: string
}


const Tab = (props: Props) => {
    const handleClick = () => {
        if (props.setCategory) {
            if(props.category === props.innerText){
                props.setCategory('');
            }
            else{
            props.setCategory(props.innerText);}
        }
    };

    return (
        <button
            className={`rounded-custom whitespace-nowrap ${props.extraClasses} transition-all duration-300 ease-linear
            hover:bg-button-hover hover:text-background hover:border-button-hover
            active:bg-button-pressed active:text-background active:border-button-pressed
            ${props.category === props.innerText ? 'bg-primary text-white border-primary border-custom' : 'text-light-button-border border-custom border-light-button-border'}`}
            onClick={handleClick}
        >
            {props.innerText}
        </button>
    );
};

export default Tab;
