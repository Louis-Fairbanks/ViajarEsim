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

async function getRegionData(name: string, currentLocale: string) {
  const client = await pool.connect();
  try {
    const query = `
      WITH combined_search AS (
        -- Regions
        SELECT r.id, r.nombre AS es_name, r.imgurl, r.isocode, 'region' AS type, r.nombre AS region_nombre, 'es' AS lang, r.id AS region_id
        FROM regiones r
        WHERE lower(unaccent(r.nombre)) = $1
        UNION ALL
        SELECT r.id, ti.traduccion AS en_name, r.imgurl, r.isocode, 'region' AS type, r.nombre AS region_nombre, 'en' AS lang, r.id AS region_id
        FROM regiones r
        JOIN traducciones_ingles ti ON r.id = ti.region_id
        WHERE lower(unaccent(ti.traduccion)) = $1 AND ti.ciudad_id IS NULL
        UNION ALL
        SELECT r.id, tp.traduccion AS br_name, r.imgurl, r.isocode, 'region' AS type, r.nombre AS region_nombre, 'br' AS lang, r.id AS region_id
        FROM regiones r
        JOIN traducciones_portugues tp ON r.id = tp.region_id
        WHERE lower(unaccent(tp.traduccion)) = $1 AND tp.ciudad_id IS NULL
        UNION ALL
        -- Cities
        SELECT c.id, c.nombre AS es_name, c.imgurl, r.isocode, 'city' AS type, r.nombre AS region_nombre, 'es' AS lang, r.id AS region_id
        FROM ciudades c
        JOIN regiones r ON c.region_id = r.id
        WHERE lower(unaccent(c.nombre)) = $1
        UNION ALL
        SELECT c.id, ti.traduccion AS en_name, c.imgurl, r.isocode, 'city' AS type, r.nombre AS region_nombre, 'en' AS lang, r.id AS region_id
        FROM ciudades c
        JOIN regiones r ON c.region_id = r.id
        JOIN traducciones_ingles ti ON c.id = ti.ciudad_id
        WHERE lower(unaccent(ti.traduccion)) = $1
        UNION ALL
        SELECT c.id, tp.traduccion AS br_name, c.imgurl, r.isocode, 'city' AS type, r.nombre AS region_nombre, 'br' AS lang, r.id AS region_id
        FROM ciudades c
        JOIN regiones r ON c.region_id = r.id
        JOIN traducciones_portugues tp ON c.id = tp.ciudad_id
        WHERE lower(unaccent(tp.traduccion)) = $1
      )
      SELECT * FROM combined_search
      ORDER BY 
        CASE 
          WHEN lang = $2 THEN 0 
          WHEN lang = 'es' THEN 1 
          ELSE 2 
        END
    `;

    const { rows } = await client.query(query, [name.toLowerCase(), currentLocale]);

    if (rows.length === 0) {
      return null; // Location not found in any locale
    }

    const location = rows[0];

    // Fetch plans for the region
    const { rows: plans } = await client.query(`
    SELECT 
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
    'en', COALESCE(ti.traduccion, r.nombre),
    'br', COALESCE(tp.traduccion, r.nombre)
  ) AS region_nombre_translations
FROM 
  planes_regiones pr
JOIN
  regiones r ON pr.region_nombre = r.nombre
LEFT JOIN 
  traducciones_ingles ti ON r.id = ti.region_id AND ti.ciudad_id IS NULL
LEFT JOIN 
  traducciones_portugues tp ON r.id = tp.region_id AND tp.ciudad_id IS NULL
WHERE 
  pr.region_nombre = $1
  `, [location.region_nombre]);


    // Fetch translations for all languages
    //uses the type flag to see which table it should get the translations from
    const translationsQuery = location.type === 'region'
      ? `
        SELECT 'es' AS lang, nombre AS translation FROM regiones WHERE id = $1
        UNION ALL
        SELECT 'en' AS lang, traduccion AS translation FROM traducciones_ingles WHERE region_id = $1 AND ciudad_id IS NULL
        UNION ALL
        SELECT 'br' AS lang, traduccion AS translation FROM traducciones_portugues WHERE region_id = $1 AND ciudad_id IS NULL
      `
      : `
        SELECT 'es' AS lang, nombre AS translation FROM ciudades WHERE id = $1
        UNION ALL
        SELECT 'en' AS lang, traduccion AS translation FROM traducciones_ingles WHERE ciudad_id = $1
        UNION ALL
        SELECT 'br' AS lang, traduccion AS translation FROM traducciones_portugues WHERE ciudad_id = $1
      `;

    const { rows: translations } = await client.query(translationsQuery, [location.id]);
    return {
      nombre: location.type === 'region' ? location.region_nombre : location[`${location.lang}_name`],
      imgurl: location.imgurl,
      isocode: location.isocode,
      type: location.type,
      plans: plans.map(plan => ({
        ...plan,
        region_nombre_translations: Object.entries(plan.region_nombre_translations).map(([locale, translatedName]) => ({
          locale,
          translatedName
        }))
      })),
      translations: translations.reduce((acc, { lang, translation }) => {
        acc[lang] = translation;
        return acc;
      }, {}),
      current_lang: location.lang,
      region_nombre: location.region_nombre
    };

  } finally {
    client.release();
  }
}

type Props = {
  params: {region : string | string[]}
  searchParams? : { [key: string]: string | string[] | undefined };
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

export default async function Page(props : Props) {
  const locale = await getLocale();
  const translations = await getTranslations('RegionPage');
  console.log(props.searchParams)

  const regionName = Array.isArray(props.params.region) ? props.params.region.join('-') : props.params.region;
  const regionData = await getRegionData(regionName.replace(/-/g, ' '), locale);

  if (!regionData) {
    redirect('/');
  }

  if (regionData.current_lang !== locale) {
    const translatedName = regionData.translations[locale];
    if (translatedName) {
      if(props.searchParams?.dias && props.searchParams?.datos){
        redirect(`/${locale}/${translatedName.replace(/ /g, '-').toLowerCase()}?dias=${props.searchParams.dias}&datos=${props.searchParams.datos}`);
      }
      redirect(`/${locale}/${translatedName.replace(/ /g, '-').toLowerCase()}`);
    }
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