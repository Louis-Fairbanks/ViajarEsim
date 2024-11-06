import React from 'react'
import TopBarAndHeader from '../components/HeaderComponents/TopBarAndHeader'
import AdminLogin from './AdminLogin'
import { redirect } from '@/routing'

const page = async () => {

  return (
    <>
        <TopBarAndHeader/>
        <AdminLogin/>
    </>
  )
}

export default page
