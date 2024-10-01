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
import ChatScript from '../components/ReusableComponents/ChatScript'
import { redirect } from '@/routing'


const page = () => {

  redirect('/ref/vivirviajando')

  return (<>
    <div className="lg:h-screen flex flex-col">
      <TopBarAndHeader/>
      <HeroSection/>
    </div>
    <Advantages />
    <NextTrip />
    <StepByStep />
    <Benefits stepsToShow={6} showButton={true}/>
    <Testimonials />
    <PaymentMethods />
    <Faqs />
    <FooterAbove />
    <Footer />
    <ChatScript/>
  </>
  )
}

export default page
