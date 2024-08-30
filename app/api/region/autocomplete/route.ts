//get all region + city names and their city pictures and return them in an array
import pg, { QueryResultRow } from 'pg';

const { Pool } = pg;

const pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
})

export async function GET() {

    let client;
    let rows: QueryResultRow[];

    try {
        client = await pool.connect();

        ({ rows } = await client.query(
            "SELECT nombre, imgurl FROM regiones UNION ALL SELECT nombre, imgurl FROM ciudades"
        ))
        if (!rows || rows.length === 0) {
            return Response.json({ message: 'búsqueda fallida' })
        }
        else {
            return Response.json({ data: rows })
        }
    } catch (err) {
        client?.release();
        return Response.json({ error: err })
    } finally {
        client?.release()
    }
}