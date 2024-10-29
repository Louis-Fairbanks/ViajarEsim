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
    { params }: { params: { region: string[] } }) {

    const regionName = params.region[0].replace(/-/g, ' ');
    let client;

    try {
        client = await pool.connect();
        let rows: QueryResultRow[];

        ({ rows } = await client.query(`
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
            WHERE lower(unaccent(pr.region_nombre)) = $1
        `, [regionName]));

        if (rows.length === 0) {
            return Response.json({ message: 'no se encontraron planes para esta región' })
        }
        return Response.json({ data: rows })

    } catch (err) {
        return Response.json({ error: err });
    } finally {
        client?.release();
    }
}