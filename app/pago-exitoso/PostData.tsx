'use client'
import React, { useEffect } from 'react'
import { useShopping } from '../components/ShoppingContext/ShoppingContext'

type Props = {
    body: string
}



const PostData = ({ body }: Props) => {
    const { resetAfterConfirmedPurchase } = useShopping();
    useEffect(() => {
        const postData = async () => {
            const data = await fetch('/api/enviar-esim', {
                method: 'POST',
                body: body,
            })
            if (!data.ok) {
                console.error('Failed to post data');
                return;
            }
            else {
                resetAfterConfirmedPurchase();
            }
        }
        postData();
    }, [])


    return (
        <></>
    )
}

export default PostData
