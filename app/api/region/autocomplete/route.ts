//get all region + city names and their city pictures and return them in an array
import { NextResponse } from 'next/server';
import pg, { QueryResultRow } from 'pg';

const { Pool } = pg;

//ignore ssl


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

        ({ rows } = await client.query(
            "SELECT nombre, imgurl FROM regiones UNION ALL SELECT nombre, imgurl FROM ciudades"
        ))
        if (!rows || rows.length === 0) {
            return NextResponse.json({ message: 'búsqueda fallida' })
        }
        else {
            console.log(rows)
            return NextResponse.json({ data: rows })
        }
    } catch (err) {
        console.log(err)
        return NextResponse.json({ error: err })
    } finally {
        client?.release()
    }
}