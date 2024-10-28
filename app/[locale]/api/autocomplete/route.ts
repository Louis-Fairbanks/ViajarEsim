import { NextResponse } from 'next/server';
import pg, { QueryResultRow } from 'pg';
import { getLocale } from 'next-intl/server';

const { Pool } = pg;

const pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

export async function GET() {
    const locale = await getLocale();
    let client;
    let rows: QueryResultRow[];

    try {
        client = await pool.connect();

        const query = locale === 'es' ? `
            SELECT 
                r.nombre AS nombre,
                r.imgurl AS imgurl,
                'region' AS type,
                r.nombre AS region_nombre
            FROM regiones r
            UNION ALL
            SELECT 
                c.nombre AS nombre,
                c.imgurl AS imgurl,
                'city' AS type,
                r.nombre AS region_nombre
            FROM ciudades c
            JOIN regiones r ON r.id = c.region_id
            ORDER BY nombre ASC
        ` : `
            SELECT 
                COALESCE(t.${locale}, r.nombre) AS nombre,
                r.imgurl AS imgurl,
                'region' AS type,
                r.nombre AS region_nombre
            FROM regiones r
            LEFT JOIN traducciones t ON 
                t.region_id = r.id AND t.ciudad_id IS NULL
            UNION ALL
            SELECT 
                COALESCE(t.${locale}, c.nombre) AS nombre,
                c.imgurl AS imgurl,
                'city' AS type,
                r.nombre AS region_nombre
            FROM ciudades c
            JOIN regiones r ON r.id = c.region_id
            LEFT JOIN traducciones t ON 
                t.ciudad_id = c.id
            ORDER BY nombre ASC
        `;

        ({ rows } = await client.query(query));

        if (!rows || rows.length === 0) {
            return NextResponse.json({ message: 'Search failed' });
        } else {
            return NextResponse.json({ data: rows });
        }
    } catch (err) {
        console.log(err);
        return NextResponse.json({ error: err });
    } finally {
        client?.release();
    }
}