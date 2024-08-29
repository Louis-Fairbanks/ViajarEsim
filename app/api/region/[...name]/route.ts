import pg, { QueryResultRow } from 'pg';
import dotenv from 'dotenv';
import { NextRequest, NextResponse } from 'next/server';
dotenv.config();

const { Pool } = pg;

const pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
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
                SELECT "nombre", "imgurl", "isocode", "proveedoresim" 
                FROM regiones 
                WHERE lower(unaccent(nombre)) ~ $1
            `, [name])); // lower(unaccent) removes accents and makes the search case-insensitive

        //if no country is found, search by city
        if (rows.length === 0) {
            const isCity = await client.query(`
            SELECT * FROM ciudades_nombres 
            WHERE lower(unaccent(nombre)) ~ $1
        `, [name]);
        if (isCity.rows.length > 0) {
                //if a city is returned, return city info)
                ({ rows } = await client.query(`
                SELECT "ciudad_nombre" AS "nombre", "imgurl", "region_nombre", "isocode" 
                FROM ciudades_info WHERE lower(unaccent(ciudad_nombre)) ~ $1
            `, [name]))
            }
            else {
                //else return city not found
                return Response.json({ message: 'ciudad no encontrado' })
            }
        }
        //this can also return an empty array if no region is found
        return Response.json({ data: rows });

    } catch (err) {
        client?.release;
        return Response.json({ error: err });
    } finally {
        client?.release();
    }
}
// CREATE VIEW ciudades_info AS
// SELECT ciudades.nombre AS ciudad_nombre, ciudades.imgurl, regiones.nombre AS region_nombre, isocode
// FROM ciudades
// INNER JOIN regiones ON ciudades.region_id = regiones.id;