import pg from 'pg'

const { Pool } = pg;

const pool = new Pool({
   connectionString: process.env.POSTGRES_URL,
   ssl: {
       rejectUnauthorized: false
   }
});

const countryToCurrencyMap = [
   { country: 'AR', currency: 'ARS' },
   { country: 'MX', currency: 'MXN' },
   { country: 'CO', currency: 'COP' },
   { country: 'CL', currency: 'CLP' },
   { country: 'ES', currency: 'EUR' },
   { country: 'PE', currency: 'PEN' },
   { country: 'US', currency: 'USD' },
   { country: 'UY', currency: 'UYU' },
   { country: 'VE', currency: 'VES' },
   { country: 'BR', currency: 'BRL' },
   { country: 'CA', currency: 'CAD' },
   { country: 'GB', currency: 'GBP' },
   { country: 'AU', currency: 'AUD' },
   { country: 'JP', currency: 'JPY' },
   { country: 'DE', currency: 'EUR' },
   { country: 'FR', currency: 'EUR' },
   { country: 'IT', currency: 'EUR' }
];

export async function GET() {
   const exchangeRateApiKey = process.env.EXCHANGE_RATE_API_KEY ?? '';

   const exchangeRateResponse = await fetch(`https://v6.exchangerate-api.com/v6/${exchangeRateApiKey}/latest/USD`)

   if (!exchangeRateResponse.ok) {
       console.error('Couldn\'t fetch exchange rate data')
   }

   const exchangeRateData = await exchangeRateResponse.json();

   let client;

   try {
       client = await pool.connect();

       // Create values array for the UPSERT operation - using country code as isocode
       const values = countryToCurrencyMap.map((item) => {
           const rate = exchangeRateData.conversion_rates[item.currency];
           return `('${item.country}', '${item.currency}', ${rate}, CURRENT_TIMESTAMP)`;
       }).join(',');

       // Perform UPSERT operation
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
   } catch (error) {
       console.error('Error updating exchange rates:', error);
   } finally {
       client?.release();
   }
}