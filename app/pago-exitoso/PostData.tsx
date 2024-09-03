'use client'
import React, {useEffect} from 'react'

type Props = {
    body: string
}


const PostData = ({body} : Props) => {
    useEffect(() => {
        fetch('/api/enviar-esim', {
            method: 'POST',
            body: body,

        })
    }, [])


    return (
        <></>
    )
}

export default PostData
