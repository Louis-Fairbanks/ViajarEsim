import React from 'react'
import LoginForm from './LoginForm'
import TopBarAndHeader from '../components/HeaderComponents/TopBarAndHeader'


const page = () => {
  return (
    <>
    <TopBarAndHeader/>
    <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
      <LoginForm/>
    </div>
    </>
  )
}

export default page
