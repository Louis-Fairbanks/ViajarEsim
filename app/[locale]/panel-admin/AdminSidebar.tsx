'use client'
import React from 'react'
import ButtonDark from '../components/ReusableComponents/ButtonDark'

type Props = {
    selectedTab : string
    setSelectedTab : React.Dispatch<React.SetStateAction<string>>
}

const AdminSidebar = ({selectedTab, setSelectedTab} : Props) => {
  return (
    <div className='flex flex-col space-y-2 w-256'>
      <ButtonDark extraClasses={`px-32 py-8 ${selectedTab === 'orders' ? 'bg-primary' :  'bg-text-faded'}`} onClick={() => setSelectedTab('orders')}>Ordenes</ButtonDark>
      <ButtonDark extraClasses={`px-32 py-8 ${selectedTab === 'influencers' ? 'bg-primary' :  'bg-text-faded'}`} onClick={() => setSelectedTab('influencers')}>Influencers</ButtonDark>
      <ButtonDark extraClasses={`px-32 py-8 ${selectedTab === 'sendEmail' ? 'bg-primary' :  'bg-text-faded'}`} onClick={() => setSelectedTab('sendEmail')}>Mandar emails</ButtonDark>
      <ButtonDark extraClasses={`px-32 py-8 ${selectedTab === 'purchasePlans' ? 'bg-primary' :  'bg-text-faded'}`} onClick={() => setSelectedTab('purchasePlans')}>Comprar Planes</ButtonDark>
    </div>
  )
}

export default AdminSidebar
