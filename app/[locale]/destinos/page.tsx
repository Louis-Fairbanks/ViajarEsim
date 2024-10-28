import React from 'react'
import { getTranslations, getLocale } from 'next-intl/server'
import { Suspense } from 'react'
import Image from 'next/image'
import { Pool } from 'pg'
import Search from '../components/ReusableComponents/Search'
import Footer from '../components/HomeSections/Footer'
import FooterAbove from '../components/HomeSections/FooterAbove'
import CountriesSection from './CountriesSection'
import TopBarAndHeader from '../components/HeaderComponents/TopBarAndHeader'
import ChatScript from '../components/ReusableComponents/ChatScript'

const pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

async function getRegionsData() {
    const locale = await getLocale();
    const client = await pool.connect();
    try {
        const query = locale === 'es' ? `
            SELECT 
                nombre,
                imgurl,
                min_price
            FROM region_precio_mas_bajo
            ORDER BY nombre ASC
        ` : `
            SELECT 
                COALESCE(t.${locale}, rpb.nombre) as nombre,
                rpb.imgurl,
                rpb.min_price
            FROM region_precio_mas_bajo rpb
            LEFT JOIN ciudades c ON c.nombre = rpb.nombre
            LEFT JOIN regiones r ON r.nombre = rpb.nombre
            LEFT JOIN traducciones t ON 
                (c.id IS NOT NULL AND t.ciudad_id = c.id) OR
                (r.id IS NOT NULL AND t.region_id = r.id AND t.ciudad_id IS NULL)
            ORDER BY nombre ASC
        `;

        const { rows } = await client.query(query, locale === 'es' ? [] : []);
        return rows.map(row => ({
            nombre: row.nombre,
            imgurl: row.imgurl,
            min_price: row.min_price
        }));
    } finally {
        client.release();
    }
}

export default async function page({ searchParams }: any) {
    const translations = await getTranslations('Destinations');
    const category = searchParams.categoria || '';

    const regions = await getRegionsData();

    return (
        <div className='relative'>
            <div className='z-10 relative bg-background'>
                <TopBarAndHeader />
            </div>
            <div className='relative p-24 sm:px-64 sm:py-24 justify-start flex flex-col items-center'>
                <div className='flex flex-col space-y-12 lg:space-y-24 text-center w-full sm:w-3/4 justify-center items-center'>
                    <h1 className='font-medium text-large-heading leading-body'>{translations('heading')}</h1>
                    <p className='text-center leading-body'>
                        {translations('subheading')}
                    </p>
                    <Search extraClasses='w-full lg:w-2/3' callAPIimmediately={true} />
                </div>
            </div>
            <Suspense fallback={<div>Loading...</div>}>
                <CountriesSection initialRegions={regions} category={category} />
            </Suspense>
            <FooterAbove />
            <Footer />
            <ChatScript />
        </div>
    )
}