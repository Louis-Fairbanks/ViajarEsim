import { NextRequest, NextResponse } from 'next/server';
import pg, {QueryResultRow} from 'pg'

const { Pool } = pg;

const pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
    ssl: {
        rejectUnauthorized: false
    }
});


export async function GET(req: NextRequest, { params }: { params: { moneda: string[] } }){
    const currencyCode = params.moneda[0]

    let client;
    let rows: QueryResultRow[];

    try{

        client = await pool.connect();

        ({ rows } = await client.query(`SELECT tasa, locale_format FROM tasas_de_cambio WHERE codigo_moneda = $1`, [currencyCode]))

        if(!rows){
            console.log('Ninguna moneda encontrada por ' + currencyCode)
            return NextResponse.json({message : 'Ninguna moneda encontrada'}, { status: 200})
        }
        else{
            console.log(rows)
            return NextResponse.json({data : rows},{ status: 200})
        }
    } catch(error){
        console.log(error)
        return NextResponse.json({message : error}, {status: 500})
    }finally{
        client?.release()
    }
}