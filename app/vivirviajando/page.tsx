import React from 'react'
import TopBarAndHeader from '../components/HeaderComponents/TopBarAndHeader'
import HeroSection from '../components/HomeSections/HeroSection'
import Advantages from '../components/HomeSections/Advantages'
import NextTrip from '../components/HomeSections/NextTrip'
import StepByStep from '../components/HomeSections/StepByStep'
import Benefits from '../components/HomeSections/Benefits'
import Testimonials from '../components/HomeSections/Testimonials'
import PaymentMethods from '../components/HomeSections/PaymentMethods'
import Faqs from '../components/HomeSections/Faqs'
import FooterAbove from '../components/HomeSections/FooterAbove'
import Footer from '../components/HomeSections/Footer'

const page = () => {
  return (<>
    <div className="h-screen flex flex-col">
      <TopBarAndHeader/>
      <HeroSection/>
    </div>
    <Advantages />
    <NextTrip />
    <StepByStep />
    <Benefits />
    <Testimonials />
    <PaymentMethods />
    <Faqs />
    <FooterAbove />
    <Footer />
  </>
  )
}

export default page
