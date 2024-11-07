import React from 'react'
import TopBarAndHeader from '../components/HeaderComponents/TopBarAndHeader'
import { Metadata } from 'next'
import AdminPanel from './AdminPanel'
import { redirect } from '@/routing'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/auth'

export const metadata: Metadata = {
    robots: {
        index: false,
        follow: false
    },
}

const page = async () => {

    const session = await getServerSession(authOptions);

    if (!session || session.user && (session.user.email !== 'viajaresimoficial@gmail.com' && !session.user.access)) {
        console.log(session?.user)
        redirect('/login-admin')
    }


    return (
        <>
            <TopBarAndHeader />
            <div className='py-24'>
                <AdminPanel />
            </div>
        </>
    )
}

export default page
