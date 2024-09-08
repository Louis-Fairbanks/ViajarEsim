import React from 'react'
import TopBarAndHeader from '../components/HeaderComponents/TopBarAndHeader'
import HowToInstallHero from './HowToInstallHero'
import BeginInstallation from './BeginInstallation'
import FooterAbove from '../components/HomeSections/FooterAbove'
import Footer from '../components/HomeSections/Footer'

const page = () => {
  return (
    <div>
      <TopBarAndHeader/>
    <HowToInstallHero/>
    <BeginInstallation/>
    <FooterAbove/>
    <Footer/>
    </div>
  )
}

export default page
