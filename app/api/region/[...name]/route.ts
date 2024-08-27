import pg from 'pg';
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

        // Function to create a case-insensitive, accent-insensitive pattern
        const createSearchPattern = (str: string) => {
            return str.toLowerCase()
                .replace(/[aáàäâ]/g, '[aáàäâ]')
                .replace(/[eéèëê]/g, '[eéèëê]')
                .replace(/[iíìïî]/g, '[iíìïî]')
                .replace(/[oóòöô]/g, '[oóòöô]')
                .replace(/[uúùüû]/g, '[uúùüû]')
                .replace(/[nñ]/g, '[nñ]');
        };

        const searchPattern = createSearchPattern(name);

        const isCity = await client.query(`
            SELECT * FROM ciudades_info 
            WHERE lower(unaccent(ciudad_nombre)) ~ $1
        `, [searchPattern]);

        let rows;

        if (isCity.rows.length > 0) {
            ({ rows } = await client.query(`
                SELECT "ciudad_nombre", "ciudades.imgurl", "region_nombre", "isocode" 
                FROM ciudades_info 
                WHERE lower(unaccent(ciudad_nombre)) ~ $1
            `, [searchPattern]));
        } else {
            ({ rows } = await client.query(`
                SELECT "nombre", "imgurl", "isocode", "proveedoresim" 
                FROM regiones 
                WHERE lower(unaccent(nombre)) ~ $1
            `, [searchPattern]));
        }
        return Response.json({ data: rows });

    } catch (err) {
        console.error(err);
        return Response.json({ error: err });
    } finally {
        client?.release();
    }
}
// CREATE VIEW ciudades_info AS
// SELECT ciudades.nombre AS ciudad_nombre, ciudades.imgurl, regiones.nombre AS region_nombre, isocode
// FROM ciudades
// INNER JOIN regiones ON ciudades.region_id = regiones.id;