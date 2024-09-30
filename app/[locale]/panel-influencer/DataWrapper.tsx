'use client'
import React, { useEffect, useState } from 'react'
import { DataGridHeader, InfluencerDataGrid } from './InfluencerDataGrid'

interface affiliate_links {
  url: string,
  clics: number,
  sales: number,
  total_sales: number
}
interface discount_codes {
  discount_code: string,
  porcentaje_descuento: number,
  times_applied: number,
  total_savings: number
}
interface purchases {
  fecha: string,
  total: number,
  purchase_id: number,
  discount_code: string,
  plans: {
    plan_id: number,
    plan_name: string,
    cantidad: number,
    region_id: number,
    region_name: string
  }[]
}

const DataWrapper = ({ username }: { username: string | null | undefined }) => {
  const [affiliateLinksInformation, setAffiliateLinksInformation] = useState<affiliate_links[]>([])
  const [discountCodesInformation, setDiscountCodesInformation] = useState<discount_codes[]>([])
  const [purchasesInformation, setPurchasesInformation] = useState<purchases[]>([])
  const [comission, setComission] = useState<number>(0)
  const [earnings, setEarnings] = useState<number>(0)

  useEffect(() => {
    const fetchInfluencerData = async () => {
      const response = await fetch(`/api/afiliados/influencers/${username}`)
      if (!response.ok) {
        throw new Error('Influencer not found')
      }
      const influencerData = await response.json()
      setAffiliateLinksInformation(influencerData.data.affiliate_links)
      setDiscountCodesInformation(influencerData.data.discount_codes)
      setPurchasesInformation(influencerData.data.purchases)
      setComission(influencerData.data.tasa_comision)
      
      // Calculate total earnings
      const totalEarnings = influencerData.data.purchases.reduce((total : any, purchase : any) => {
        return total + (purchase.total * influencerData.data.tasa_comision / 100)
      }, 0)
      setEarnings(totalEarnings)
    }
    fetchInfluencerData()
  }, [username])

  return (
    <div>
      <DataGridHeader username={username} earnings={earnings} />
      <InfluencerDataGrid 
        title='Mis Enlaces de Afiliado' 
        tableToShow="links" 
        influencer={username || ''} 
        affiliateLinksInformation={affiliateLinksInformation}
        discountCodesInformation={discountCodesInformation}
        purchasesInformation={purchasesInformation}
        comission={comission}
      />
      <InfluencerDataGrid 
        title='Mis códigos de descuento' 
        tableToShow="codes" 
        influencer={username || ''} 
        affiliateLinksInformation={affiliateLinksInformation}
        discountCodesInformation={discountCodesInformation}
        purchasesInformation={purchasesInformation}
        comission={comission}
      />
      <InfluencerDataGrid 
        title='Mis compras generadas' 
        tableToShow="purchases" 
        influencer={username || ''} 
        affiliateLinksInformation={affiliateLinksInformation}
        discountCodesInformation={discountCodesInformation}
        purchasesInformation={purchasesInformation}
        comission={comission}
      />
    </div>
  )
}

export default DataWrapper