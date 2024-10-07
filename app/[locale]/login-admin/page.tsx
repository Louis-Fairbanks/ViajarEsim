import React from 'react'
import TopBarAndHeader from '../components/HeaderComponents/TopBarAndHeader'
import AdminLogin from './AdminLogin'
import { getServerSession } from 'next-auth'
import { redirect } from '@/routing'

const page = async () => {

  const session = await getServerSession();

  if(session && session.user && session.user.email === 'viajaresimoficial@gmail.com'){
      redirect('/panel-admin')
  }

  return (
    <>
        <TopBarAndHeader/>
        <AdminLogin/>
    </>
  )
}

export default page
