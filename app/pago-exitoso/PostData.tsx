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
            if(!data){
                console.log('Error confirming the purchase but it probably went through')
            } else{
                console.log('Purchase confirmed')
            }
        }
        postData();
        resetAfterConfirmedPurchase();
    }, [])


    return (
        <></>
    )
}

export default PostData
