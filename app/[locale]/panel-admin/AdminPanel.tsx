'use client'
import React, { useState } from 'react'
import AdminSidebar from './AdminSidebar'
import AllOrderSummary from './AllOrderSummary'
import PurchasePlans from './PurchasePlans'
import InfluencerInfo from './InfluencerInfo'
import Statistics from './Statistics'

const AdminPanel = () => {

    const [selectedTab, setSelectedTab] = useState<string>("orders")

    return (
        <div className='flex p-8 space-x-16'>
            <AdminSidebar setSelectedTab={setSelectedTab} selectedTab={selectedTab}/>
            <div>
                {selectedTab === "orders" && <AllOrderSummary />}
                {selectedTab === "influencers" &&  <InfluencerInfo/>}
                {selectedTab === "purchasePlans" && <PurchasePlans/>}
                {selectedTab === 'statistics' && <Statistics/>}
            </div>
        </div>
    )
}

export default AdminPanel
