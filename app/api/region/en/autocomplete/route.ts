import { NextResponse } from 'next/server';
import pg, { QueryResultRow } from 'pg';

const { Pool } = pg;

const pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

export async function GET() {
    let client;
    let rows: QueryResultRow[];

    try {
        client = await pool.connect();

        ({ rows } = await client.query(`
            SELECT 
                t.traduccion AS nombre, 
                COALESCE(r.imgurl, c.imgurl) AS imgurl
            FROM 
                traducciones_ingles t
            LEFT JOIN 
                regiones r ON t.region_id = r.id
            LEFT JOIN 
                ciudades c ON t.region_id = c.id
            WHERE 
                r.id IS NOT NULL OR c.id IS NOT NULL
        `));

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