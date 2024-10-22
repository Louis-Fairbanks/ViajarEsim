const { Pool } = require('pg');
// const dotenv = require('dotenv');
// const path = require('path');

// Only for local development
// dotenv.config({
//     path: path.resolve(process.cwd(), '.env.development.local')
// });

const pool = new Pool({
   connectionString: process.env.POSTGRES_URL,
   ssl: {
       rejectUnauthorized: false
   }
});

const countryToCurrencyMap = [
    { country: 'AR', currency: 'ARS' }, // Argentina
    { country: 'MX', currency: 'MXN' }, // Mexico
    { country: 'CO', currency: 'COP' }, // Colombia
    { country: 'CL', currency: 'CLP' }, // Chile
    { country: 'ES', currency: 'EUR' }, // Spain
    { country: 'PE', currency: 'PEN' }, // Peru
    { country: 'US', currency: 'USD' }, // United States
    { country: 'UY', currency: 'UYU' }, // Uruguay
    { country: 'VE', currency: 'VES' }, // Venezuela
    { country: 'BR', currency: 'BRL' }, // Brazil
    { country: 'CA', currency: 'CAD' }, // Canada
    { country: 'GB', currency: 'GBP' }, // United Kingdom
    { country: 'AU', currency: 'AUD' }, // Australia
    { country: 'JP', currency: 'JPY' }, // Japan
    { country: 'DE', currency: 'EUR' }, // Germany
    { country: 'FR', currency: 'EUR' }, // France
    { country: 'IT', currency: 'EUR' }, // Italy
];

async function updateExchangeRates() {
   const exchangeRateApiKey = process.env.EXCHANGE_RATE_API_KEY;

   if (!exchangeRateApiKey) {
       console.error('No API key provided');
       process.exit(1);
   }

   let client;

   try {
       const exchangeRateResponse = await fetch(`https://v6.exchangerate-api.com/v6/${exchangeRateApiKey}/latest/USD`);

       if (!exchangeRateResponse.ok) {
           throw new Error('Failed to fetch exchange rates');
       }

       const exchangeRateData = await exchangeRateResponse.json();
       
       client = await pool.connect();

       const values = countryToCurrencyMap.map((item) => {
           const rate = exchangeRateData.conversion_rates[item.currency];
           return `('${item.country}', '${item.currency}', ${rate}, CURRENT_TIMESTAMP)`;
       }).join(',');

       const query = `
           INSERT INTO tasas_de_cambio (isocode, codigo_moneda, tasa, ultima_actualizacion)
           VALUES ${values}
           ON CONFLICT (isocode) 
           DO UPDATE SET 
               codigo_moneda = EXCLUDED.codigo_moneda,
               tasa = EXCLUDED.tasa,
               ultima_actualizacion = CURRENT_TIMESTAMP;
       `;

       await client.query(query);
       console.log('Exchange rates updated successfully');

   } catch (error) {
       console.error('Error updating exchange rates:', error);
       process.exit(1);
   } finally {
       await client?.release();
       process.exit(0);
   }
}

updateExchangeRates();