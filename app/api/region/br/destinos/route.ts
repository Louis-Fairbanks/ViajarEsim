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
                COALESCE(c.imgurl, r.imgurl) AS imgurl,
                rp.min_price
            FROM 
                traducciones_portugues t
            JOIN 
                regiones r ON t.region_id = r.id
            LEFT JOIN 
                (SELECT DISTINCT ON (region_id) region_id, imgurl 
                 FROM ciudades 
                 ORDER BY region_id, id) c ON c.region_id = r.id
            LEFT JOIN
                region_precio_mas_bajo rp ON rp.nombre = r.nombre
            ORDER BY 
                t.traduccion ASC
        `));

        if (!rows || rows.length === 0) {
            return NextResponse.json({ message: 'No destinations found' });
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