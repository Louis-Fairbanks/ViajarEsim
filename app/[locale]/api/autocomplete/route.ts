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

        let query;
        switch (locale) {
            case 'en':
                query = `
                    SELECT 
                        COALESCE(ti.traduccion, r.nombre, c.nombre) AS nombre,
                        COALESCE(r.imgurl, c.imgurl) AS imgurl,
                        CASE
                            WHEN r.id IS NOT NULL THEN 'region'
                            WHEN c.id IS NOT NULL THEN 'city'
                        END AS type,
                        COALESCE(r.nombre, (SELECT nombre FROM regiones WHERE id = c.region_id)) AS region_nombre
                    FROM 
                        traducciones_ingles ti
                    LEFT JOIN 
                        regiones r ON ti.region_id = r.id
                    LEFT JOIN 
                        ciudades c ON ti.ciudad_id = c.id
                    WHERE 
                        r.id IS NOT NULL OR c.id IS NOT NULL
                `;
                break;
            case 'br':
                query = `
                    SELECT 
                        COALESCE(tp.traduccion, r.nombre, c.nombre) AS nombre,
                        COALESCE(r.imgurl, c.imgurl) AS imgurl,
                        CASE
                            WHEN r.id IS NOT NULL THEN 'region'
                            WHEN c.id IS NOT NULL THEN 'city'
                        END AS type,
                        COALESCE(r.nombre, (SELECT nombre FROM regiones WHERE id = c.region_id)) AS region_nombre
                    FROM 
                        traducciones_portugues tp
                    LEFT JOIN 
                        regiones r ON tp.region_id = r.id
                    LEFT JOIN 
                        ciudades c ON tp.ciudad_id = c.id
                    WHERE 
                        r.id IS NOT NULL OR c.id IS NOT NULL
                `;
                break;
            default: // 'es' and any other locale
                query = `
                    SELECT 
                        COALESCE(r.nombre, c.nombre) AS nombre,
                        COALESCE(r.imgurl, c.imgurl) AS imgurl,
                        CASE
                            WHEN r.id IS NOT NULL THEN 'region'
                            WHEN c.id IS NOT NULL THEN 'city'
                        END AS type,
                        COALESCE(r.nombre, (SELECT nombre FROM regiones WHERE id = c.region_id)) AS region_nombre
                    FROM 
                        regiones r
                    FULL OUTER JOIN 
                        ciudades c ON false
                    WHERE 
                        r.id IS NOT NULL OR c.id IS NOT NULL
                `;
        }

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