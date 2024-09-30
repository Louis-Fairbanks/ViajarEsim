'use client'
import { usePathname } from '@/routing'
import React, { useEffect } from 'react'
import { setCookie } from 'cookies-next'
import { useRouter } from '@/routing'

const SetAffiliateInfo = () => {
  const pathname = usePathname()
  const pathParts = pathname.split('/')
  const router = useRouter()

  useEffect(() => {
    const getAffiliateInformation = async () => {
      try {
        const response = await fetch(`/api/afiliados/${pathParts[2]}`)
        
        if (!response.ok) {
          throw new Error('Affiliate not found')
        }

        const affiliateData = await response.json()

        setCookie('affiliate_id', affiliateData.data[0].influencer_id, {
          maxAge: 90 * 24 * 60 * 60, // 90 days
          path: '/',
        })

        setCookie('affiliate_link_id', affiliateData.data[0].id, {
          maxAge: 90 * 24 * 60 * 60,
          path: '/',
        })

        setCookie('affiliate_link', affiliateData.data[0].url, {
          maxAge: 90 * 24 * 60 * 60,
          path: '/',
        })
      } catch (error) {
        console.error('Error fetching affiliate information:', error)
        router.push('/')
      }
    }

    getAffiliateInformation()
  }, [])

  return <></>
}

export default SetAffiliateInfo