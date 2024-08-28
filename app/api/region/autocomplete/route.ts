//get all region + city names and their city pictures and return them in an array
import pg from 'pg';
import { NextRequest } from 'next/server';

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
})

export async function GET(){

    let client;
    // let rows : QueryResultRow[];

    try{
        client = await pool.connect();

        // ({rows} = await client.query(
        //     'SELECT "nombre", "imgurl" FROM 
        // ))

    } catch(err){
        client?.release();
        return Response.json({ error: err})
    } finally{
        client?.release()
        return Response.json({ message: 'Hello!'})
    }
}