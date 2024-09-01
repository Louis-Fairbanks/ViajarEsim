
import pg, { QueryResult } from 'pg';

const { Pool } = pg;

const pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
})

export async function GET(){

    let client;
    let rows : QueryResult[];

    try{

        client = await pool.connect();

        ({ rows } = await client.query("SELECT * FROM region_precio_mas_bajo ORDER BY nombre ASC"));

        if(rows.length > 0){
            return Response.json({ data: rows})
        }
        else return Response.json({ message: 'No se encontraron destinos'})
    }catch (err){
        return Response.json({ err: err})
    } finally{
        client?.release();
    }
}