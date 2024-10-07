'use client'
import React, { useState } from 'react'
import AdminSidebar from './AdminSidebar'
import AllOrderSummary from './AllOrderSummary'
import EmailSending from './EmailSending'
import PurchasePlans from './PurchasePlans'

const AdminPanel = () => {

    const [selectedTab, setSelectedTab] = useState<string>("orders")

    return (
        <div className='flex p-8 space-x-16'>
            <AdminSidebar setSelectedTab={setSelectedTab} selectedTab={selectedTab}/>
            <div>
                {selectedTab === "orders" && <AllOrderSummary />}
                {selectedTab === "sendEmail" && <EmailSending/>}
                {selectedTab === "purchasePlans" && <PurchasePlans/>}
            </div>
        </div>
    )
}

export default AdminPanel
