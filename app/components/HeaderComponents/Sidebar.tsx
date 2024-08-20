import React from 'react'
import CloseIcon from '@mui/icons-material/Close';

interface Props {
    header: string
    children: React.ReactNode
    setActivatedSidebar : React.Dispatch<React.SetStateAction<string>>
    setOverlayActivated : React.Dispatch<React.SetStateAction<boolean>>
    selected : boolean
}

const Sidebar = ({ header, children, setActivatedSidebar, setOverlayActivated, selected }: Props) => {
    return (
        <div className={`fixed right-0 top-0 h-full w-1/3 bg-background rounded-tl-2xl rounded-bl-2xl px-24 pt-24 pb-64 z-50
        transition-all duration-1000 ease-in-out ${selected ? '' : 'translate-x-full'}`}>
            <div className='flex justify-between items-center'>
                <h2 className='font-medium text-heading leading-body'>{header}</h2>
                <CloseIcon onClick={() => {
                    setActivatedSidebar('')
                    setOverlayActivated(false)
                }
                } style={{cursor : 'pointer'}}></CloseIcon>
            </div>
            {children}
        </div>
    )
}

export default Sidebar
