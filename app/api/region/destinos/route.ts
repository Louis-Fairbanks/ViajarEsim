
import pg, { QueryResult } from 'pg';
import { NextResponse } from 'next/server';

const { Pool } = pg;

const pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
    ssl: {
        rejectUnauthorized: false
    }
})

export async function GET(){

    let client;
    let rows : QueryResult[];

    try{

        client = await pool.connect();

        ({ rows } = await client.query("SELECT * FROM region_precio_mas_bajo ORDER BY nombre ASC"));

        if(rows.length > 0){
            return NextResponse.json({ data: rows})
        }
        else return NextResponse.json({ message: 'No se encontraron destinos'})
    }catch (err){
        return NextResponse.json({ err: err})
    } finally{
        client?.release();
    }
}