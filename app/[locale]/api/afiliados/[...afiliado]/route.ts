import pg, { QueryResultRow } from 'pg';
import { NextRequest, NextResponse } from 'next/server';

const { Pool } = pg;

const pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
    ssl: {
        rejectUnauthorized: false
    }
})

export async function GET(request: NextRequest,
    { params }: { params: { afiliado: string[] } }) {

    const link = params.afiliado[0]
    let client;

    try {
        client = await pool.connect();
        let rows : QueryResultRow[];

        console.log('searching for influencer link' + link);
        ({rows} = await client.query(`SELECT id, influencer_id, url FROM enlaces_afiliados WHERE url = $1`, [link]))

        if(rows.length === 0){
            return NextResponse.json({status: 404});
        }
        else {
            console.log(rows)
            await client.query(`UPDATE enlaces_afiliados SET clics = clics + 1 WHERE url = $1`, [link]);
            return NextResponse.json({data: rows});
        }
    } catch (err){
        return NextResponse.json({message: 'Error searching for influencer'}, {status: 500});
    }finally {
        client?.release();
    }
}