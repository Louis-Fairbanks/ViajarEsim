import pg, { QueryResultRow } from 'pg';
import { NextRequest } from 'next/server';

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


        //first search by country
        ({ rows } = await client.query(`
                SELECT "nombre", "imgurl", "isocode" 
                FROM regiones 
                WHERE lower(unaccent(nombre)) = $1
            `, [name])); // lower(unaccent) removes accents and makes the search case-insensitive

        if (rows.length != 0) {
            //search plans for that region
            const plans = await client.query(`SELECT "plan_id" AS "id", "data", "duracion", "plan_nombre", "precio", 
            "is_low_cost", "region_nombre", "region_isocode"
            FROM planes_regiones
            WHERE lower(unaccent(region_nombre)) = $1`, [name]);
            rows.forEach(row => {
                row.plans = plans.rows;
            });
            return Response.json({ data: rows });
        }
        //if no country is found, search by city
        else {
            const isCity = await client.query(`
            SELECT * FROM ciudades_nombres 
            WHERE lower(unaccent(nombre)) = $1
        `, [name]);
            if (isCity.rows.length > 0) {
                //if a city is returned, return city info)
                ({ rows } = await client.query(`
                SELECT "ciudad_nombre" AS "nombre", "imgurl", "region_nombre", "isocode" 
                FROM ciudades_info WHERE lower(unaccent(ciudad_nombre)) = $1
            `, [name]))
                //search plans for that city
                const plans = await client.query(`SELECT "plan_id" AS "id", "data", "duracion", "plan_nombre", "precio", 
            "is_low_cost", "region_nombre", "region_isocode"
            FROM planes_regiones
            WHERE region_nombre = $1`, [rows[0].region_nombre]);
            rows.forEach(row => {
                row.plans = plans.rows;
            });
            return Response.json({ data: rows });
            }
            else {
                //else return city not found
                return Response.json({ message: 'ciudad no encontrado' })
            }
        }
    } catch (err) {
        return Response.json({ error: err });
    } finally {
        client?.release();
    }
}