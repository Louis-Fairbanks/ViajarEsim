import pg, { QueryResultRow } from 'pg';
import { NextRequest, NextResponse } from 'next/server';

const { Pool } = pg;

const pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
    ssl: {
        rejectUnauthorized: false
    }
})

export async function GET(
    request: NextRequest,
    { params }: { params: { name: string[] } }) {

    const name = params.name[0].replace(/-/g, ' ');
    let client;

    try {
        client = await pool.connect();

        let rows: QueryResultRow[];

        // First search by country/region in English translations
        ({ rows } = await client.query(`
            SELECT r."nombre", r."imgurl", r."isocode", t."traduccion" as "nombreTraducido"
            FROM regiones r
            INNER JOIN traducciones_ingles t ON r.id = t.region_id
            WHERE lower(unaccent(t.traduccion)) = $1
        `, [name.toLowerCase()]));

        if (rows.length != 0) {
            // Search plans for that region
            const plans = await client.query(`
                SELECT "plan_id" AS "id", "data", "duracion", "plan_nombre", "precio", 
                "is_low_cost", "region_nombre", "region_isocode"
                FROM planes_regiones
                WHERE lower(unaccent(region_nombre)) = $1
            `, [rows[0].nombre.toLowerCase()]);
            
            rows.forEach(row => {
                row.plans = plans.rows;
            });
            return NextResponse.json({ data: rows });
        }
        // If no country/region is found, search by city in English translations
        else {
            const cityQuery = await client.query(`
                SELECT r.id as region_id, t.traduccion as city_name
                FROM traducciones_ingles t
                INNER JOIN regiones r ON t.region_id = r.id
                WHERE lower(unaccent(t.traduccion)) = $1
            `, [name.toLowerCase()]);

            if (cityQuery.rows.length > 0) {
                // If a city is returned, get city info
                ({ rows } = await client.query(`
                    SELECT c."ciudad_nombre" AS "nombre", c."imgurl", c."region_nombre", c."isocode",
                           t."traduccion" as "nombreTraducido"
                    FROM ciudades_info c
                    INNER JOIN traducciones_ingles t ON t.region_id = $1
                    WHERE t.traduccion = $2
                `, [cityQuery.rows[0].region_id, cityQuery.rows[0].city_name]));

                // Search plans for that city's region
                const plans = await client.query(`
                    SELECT "plan_id" AS "id", "data", "duracion", "plan_nombre", "precio", 
                    "is_low_cost", "region_nombre", "region_isocode"
                    FROM planes_regiones
                    WHERE region_nombre = $1
                `, [rows[0].region_nombre]);

                rows.forEach(row => {
                    row.plans = plans.rows;
                });
                return NextResponse.json({ data: rows });
            }
            else {
                // If city not found
                return NextResponse.json({ message: 'City not found' });
            }
        }
    } catch (err) {
        return NextResponse.json({ error: err });
    } finally {
        client?.release();
    }
}