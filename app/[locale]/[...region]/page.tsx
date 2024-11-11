import React from 'react'
import { getTranslations, getLocale } from 'next-intl/server';
import { redirect } from 'next/navigation';
import Image from 'next/image';
import { Pool } from 'pg';
import TopBarAndHeader from '../components/HeaderComponents/TopBarAndHeader';
import Breadcrumbs from '../components/HeaderComponents/Breadcrumbs';
import DestinationMain from './DestinationMain';
import PaymentMethods from '../components/HomeSections/PaymentMethods';
import WhyUseSim from '../components/ReusableComponents/WhyUseSim';
import Benefits from '../components/HomeSections/Benefits';
import SectionHeader from '../components/ReusableComponents/SectionHeader';
import FastAndReliable from '../components/ReusableComponents/FastAndReliable';
import HowToActivate from '../components/ReusableComponents/HowToActivate';
import FooterAbove from '../components/HomeSections/FooterAbove';
import Footer from '../components/HomeSections/Footer';
import ChatScript from '../components/ReusableComponents/ChatScript';

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

type SupportedLanguage = 'es' | 'en' | 'fr' | 'de' | 'it' | 'br';

async function getRegionData(name: string, currentLocale: string) {
  const client = await pool.connect();
  try {
    // First search: Look only in the requested locale
    const localeSearchQuery = currentLocale === 'es' ? `
      WITH locale_search AS (
        SELECT 
          r.id as region_id,
          r.nombre as region_nombre,
          r.imgurl as region_imgurl,
          r.isocode,
          NULL as city_id,
          NULL as city_nombre,
          NULL as city_imgurl,
          t.*,
          'region' as type,
          'current' as search_result
        FROM regiones r
        LEFT JOIN traducciones t ON t.region_id = r.id AND t.ciudad_id IS NULL
        WHERE lower(unaccent(r.nombre)) = lower(unaccent($1))

        UNION ALL

        SELECT 
          r.id as region_id,
          r.nombre as region_nombre,
          r.imgurl as region_imgurl,
          r.isocode,
          c.id as city_id,
          c.nombre as city_nombre,
          c.imgurl as city_imgurl,
          t.*,
          'city' as type,
          'current' as search_result
        FROM ciudades c
        JOIN regiones r ON c.region_id = r.id
        LEFT JOIN traducciones t ON t.ciudad_id = c.id
        WHERE lower(unaccent(c.nombre)) = lower(unaccent($1))
      )
      SELECT * FROM locale_search
      LIMIT 1
    ` : `
      WITH locale_search AS (
        SELECT 
          r.id as region_id,
          r.nombre as region_nombre,
          r.imgurl as region_imgurl,
          r.isocode,
          NULL as city_id,
          NULL as city_nombre,
          NULL as city_imgurl,
          t.*,
          'region' as type,
          'current' as search_result
        FROM regiones r
        LEFT JOIN traducciones t ON t.region_id = r.id AND t.ciudad_id IS NULL
        WHERE lower(unaccent(t.${currentLocale})) = lower(unaccent($1))

        UNION ALL

        SELECT 
          r.id as region_id,
          r.nombre as region_nombre,
          r.imgurl as region_imgurl,
          r.isocode,
          c.id as city_id,
          c.nombre as city_nombre,
          c.imgurl as city_imgurl,
          t.*,
          'city' as type,
          'current' as search_result
        FROM ciudades c
        JOIN regiones r ON c.region_id = r.id
        LEFT JOIN traducciones t ON t.ciudad_id = c.id
        WHERE lower(unaccent(t.${currentLocale})) = lower(unaccent($1))
      )
      SELECT * FROM locale_search
      LIMIT 1
    `;

    let { rows } = await client.query(localeSearchQuery, [name]);

    // If not found in requested locale, try full search
    if (rows.length === 0) {
      const fullSearchQuery = `
        WITH full_search AS (
          SELECT 
            r.id as region_id,
            r.nombre as region_nombre,
            r.imgurl as region_imgurl,
            r.isocode,
            NULL as city_id,
            NULL as city_nombre,
            NULL as city_imgurl,
            t.*,
            'region' as type,
            CASE
              WHEN lower(unaccent(r.nombre)) = lower(unaccent($1)) THEN 'es'
              WHEN lower(unaccent(t.en)) = lower(unaccent($1)) THEN 'en'
              WHEN lower(unaccent(t.fr)) = lower(unaccent($1)) THEN 'fr'
              WHEN lower(unaccent(t.de)) = lower(unaccent($1)) THEN 'de'
              WHEN lower(unaccent(t.it)) = lower(unaccent($1)) THEN 'it'
              WHEN lower(unaccent(t.br)) = lower(unaccent($1)) THEN 'br'
            END as found_in_lang,
            'other' as search_result
          FROM regiones r
          LEFT JOIN traducciones t ON t.region_id = r.id AND t.ciudad_id IS NULL
          WHERE 
            lower(unaccent(r.nombre)) = lower(unaccent($1)) OR
            lower(unaccent(t.en)) = lower(unaccent($1)) OR
            lower(unaccent(t.fr)) = lower(unaccent($1)) OR
            lower(unaccent(t.de)) = lower(unaccent($1)) OR
            lower(unaccent(t.it)) = lower(unaccent($1)) OR
            lower(unaccent(t.br)) = lower(unaccent($1))

          UNION ALL

          SELECT 
            r.id as region_id,
            r.nombre as region_nombre,
            r.imgurl as region_imgurl,
            r.isocode,
            c.id as city_id,
            c.nombre as city_nombre,
            c.imgurl as city_imgurl,
            t.*,
            'city' as type,
            CASE
              WHEN lower(unaccent(c.nombre)) = lower(unaccent($1)) THEN 'es'
              WHEN lower(unaccent(t.en)) = lower(unaccent($1)) THEN 'en'
              WHEN lower(unaccent(t.fr)) = lower(unaccent($1)) THEN 'fr'
              WHEN lower(unaccent(t.de)) = lower(unaccent($1)) THEN 'de'
              WHEN lower(unaccent(t.it)) = lower(unaccent($1)) THEN 'it'
              WHEN lower(unaccent(t.br)) = lower(unaccent($1)) THEN 'br'
            END as found_in_lang,
            'other' as search_result
          FROM ciudades c
          JOIN regiones r ON c.region_id = r.id
          LEFT JOIN traducciones t ON t.ciudad_id = c.id
          WHERE 
            lower(unaccent(c.nombre)) = lower(unaccent($1)) OR
            lower(unaccent(t.en)) = lower(unaccent($1)) OR
            lower(unaccent(t.fr)) = lower(unaccent($1)) OR
            lower(unaccent(t.de)) = lower(unaccent($1)) OR
            lower(unaccent(t.it)) = lower(unaccent($1)) OR
            lower(unaccent(t.br)) = lower(unaccent($1))
        )
        SELECT * FROM full_search
        WHERE found_in_lang IS NOT NULL
        LIMIT 1
      `;

      const result = await client.query(fullSearchQuery, [name]);
      rows = result.rows;
    }

    if (rows.length === 0) {
      return null;
    }

    const location = rows[0];
    const isCity = location.type === 'city';

    // Fetch plans for the region
    const { rows: plans } = await client.query(`
      SELECT DISTINCT ON (pr.plan_id)
        pr.plan_id AS id, 
        pr.data, 
        pr.duracion, 
        pr.plan_nombre, 
        pr.precio, 
        pr.is_low_cost, 
        pr.region_nombre, 
        pr.region_isocode,
        json_build_object(
          'es', r.nombre,
          'en', COALESCE(t.en, r.nombre),
          'fr', COALESCE(t.fr, r.nombre),
          'de', COALESCE(t.de, r.nombre),
          'it', COALESCE(t.it, r.nombre),
          'br', COALESCE(t.br, r.nombre)
        ) AS region_nombre_translations
      FROM planes_regiones pr
      JOIN regiones r ON pr.region_nombre = r.nombre
      LEFT JOIN traducciones t ON r.id = t.region_id AND t.ciudad_id IS NULL
      WHERE pr.region_nombre = $1
    `, [location.region_nombre]);

    return {
      nombre: isCity ? location.city_nombre : location.region_nombre,
      imgurl: isCity ? location.city_imgurl : location.region_imgurl,
      isocode: location.isocode,
      type: location.type,
      plans,
      translations: {
        es: isCity ? location.city_nombre : location.region_nombre,
        en: location.en,
        fr: location.fr,
        de: location.de,
        it: location.it,
        br: location.br
      },
      search_result: location.search_result,
      needs_redirect: location.search_result === 'other',
      current_lang: currentLocale
    };

  } finally {
    client.release();
  }
}

type Props = {
  params: { region: string | string[] }
  searchParams?: { [key: string]: string | string[] | undefined };
}

export async function generateMetadata({ params }: { params: { region: string | string[] } }) {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: 'RegionMetadata' });

  const regionName = Array.isArray(params.region) ? params.region.join('-') : params.region;
  const regionNameNoDashes = regionName.replace(/-/g, ' ');
  const regionNameUppercase = regionNameNoDashes.split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return {
    title: t('title', { region: regionNameUppercase }),
    description: t('description', { region: regionNameUppercase }),
  }
}

export default async function Page(props: Props) {
  const locale = await getLocale();
  const translations = await getTranslations('RegionPage');

  const regionName = Array.isArray(props.params.region) ? props.params.region.join('-') : props.params.region;
  const cleanRegionName = regionName.replace(/-/g, ' ');
  const regionData = await getRegionData(cleanRegionName, locale);

  if (!regionData) {
    redirect('/');
  }

  return (
    <>
      <div className='flex flex-col min-h-screen'>
        <TopBarAndHeader />
        <Breadcrumbs />
        <div className='relative'>
          <Image className='lg:hidden absolute left-0 w-screen -top-128 -z-10'
            src='/media/destinos-top.svg'
            alt=''
            width={100}
            height={20}
          />
        </div>
        <DestinationMain regionData={regionData} />
      </div>
      <PaymentMethods />
      <WhyUseSim backgroundColor='yellow' />
      <div className='flex flex-col sm:px-0 space-y-12 relative'>
        <Image className='absolute left-0 top-0 -z-10 hidden lg:block'
          src='/media/avioncito.png'
          alt=''
          height={300}
          width={300}
        />
        <div className='px-12'>
          <SectionHeader title={translations('beneficios')} header={translations('loQueDebes')} />
        </div>
        <Benefits stepsToShow={3} showButton={false} showHeader={false} />
      </div>
      <FastAndReliable />
      <HowToActivate />
      <div className='p-24 sm:p-64 '>
        <div className='overflow-hidden xl:overflow-visible bg-green-gradient rounded-2xl px-48 pb-24 pt-48 xl:py-64 flex flex-col gap-y-16 relative text-center xl:text-start'>
          <h1 className='font-semibold text-large-heading leading-body'>{translations('teEnviaremos')}</h1>
          <p className='w-full xl:w-1/2'>{translations('unaVezCompletes')}</p>
          <Image className='absolute bottom-0 hidden xl:block xl:right-0 xl:scale-100'
            src='/media/destinos1.png'
            alt='persona sacando una foto junto a un edifico'
            height={338}
            width={487}
          />
          <Image className='absolute left-0 -top-24 xl:hidden'
            src='/media/nube.png'
            alt=''
            width={200}
            height={200}
          />
        </div>
      </div>
      <Benefits stepsToShow={6} showButton={true} />
      <FooterAbove />
      <Footer />
      <ChatScript />
    </>
  )
}