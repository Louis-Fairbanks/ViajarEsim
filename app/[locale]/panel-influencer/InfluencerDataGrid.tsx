'use client'
import React, { useState } from 'react'
import UniqueLinks from './UniqueLinks'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import DiscountCodes from './DiscountCodes';
import GeneratedPurchases from './GeneratedPurchases';

interface Props {
  title: string
  tableToShow: string
  influencer: string
  affiliateLinksInformation: affiliate_links[]
  discountCodesInformation: discount_codes[]
  purchasesInformation: purchases[]
  comission: number
}

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

export const InfluencerDataGrid = ({ title, tableToShow, influencer, affiliateLinksInformation, discountCodesInformation, purchasesInformation, comission }: Props) => {
  const [isOpened, setIsOpened] = useState<boolean>(false)

  return (
    <div className={`cursor-pointer h-fit mt-12 flex flex-col p-24 mb-16 justify-between border-custom rounded-custom transition-all duration-300 ease-linear 
    ${isOpened ? 'border-light-button-border' : 'hover:border-light-button-border'}`}
      onClick={() => setIsOpened(!isOpened)}>
      <div className="flex justify-between">
        <h1 className="font-medium text-subheading">{title}</h1>
        <KeyboardArrowDownIcon className={`
       ${isOpened ? 'rotate-180' : ''}`}></KeyboardArrowDownIcon>
      </div>
      <div className={`transition-all duration-300 ease-linear overflow-hidden ${isOpened ? 'max-h-[500px]' : 'max-h-0'}`}>
        <hr className='my-24 border-accent'></hr>
        {tableToShow === 'links' && <UniqueLinks affiliateLinksInformation={affiliateLinksInformation} comission={comission} />}
        {tableToShow === 'codes' && <DiscountCodes discountCodesInformation={discountCodesInformation} />}
        {tableToShow === 'purchases' && <GeneratedPurchases purchasesInformation={purchasesInformation} comission={comission} />}
      </div>
    </div>
  )
}

export const DataGridHeader = ({ username, earnings }: { username: string | null | undefined, earnings: number }) => {
  return <div className="flex justify-between">
    <h1 className="text-heading font-medium">Bienvenido a tu panel, <span className="text-primary font-bold">{username}</span></h1>
    <h3 className="text-subheading font-medium">Mis ganancias: <span className="text-primary font-bold">${earnings.toFixed(2)}</span></h3>
  </div>
}