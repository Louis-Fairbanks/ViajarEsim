//get all region + city names and their city pictures and return them in an array
import pg, { QueryResultRow } from 'pg';

const { Pool } = pg;

//ignore ssl


const pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
    // user: process.env.DB_USER,
    // host: process.env.DB_HOST,
    // database: process.env.DB_NAME,
    // password: process.env.DB_PASSWORD,
    // port: 25060,
    // ssl: {
    //     rejectUnauthorized: false
    // }
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
            return Response.json({ message: 'búsqueda fallida' })
        }
        else {
            console.log(rows)
            return Response.json({ data: rows })
        }
    } catch (err) {
        console.log(err)
        return Response.json({ error: err })
    } finally {
        client?.release()
    }
}