
import React from 'react'
import TopBarAndHeader from '../components/HeaderComponents/TopBarAndHeader'
import FooterAbove from '../components/HomeSections/FooterAbove'
import Footer from '../components/HomeSections/Footer'
import MainInstallationSection from './MainInstallationSection'
import ChatScript from '../components/ReusableComponents/ChatScript'

const page = () => {
  return (
    <>
      <TopBarAndHeader/>
    <MainInstallationSection/>
    <FooterAbove/>
    <Footer/>
    <ChatScript/>
    </>
  )
}

export default page
