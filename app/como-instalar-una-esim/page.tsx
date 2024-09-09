import React from 'react'
import TopBarAndHeader from '../components/HeaderComponents/TopBarAndHeader'
import FooterAbove from '../components/HomeSections/FooterAbove'
import Footer from '../components/HomeSections/Footer'
import MainInstallationSection from './MainInstallationSection'

const page = () => {
  return (
    <div>
      <TopBarAndHeader/>
    <MainInstallationSection/>
    <FooterAbove/>
    <Footer/>
    </div>
  )
}

export default page
