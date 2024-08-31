import pg, { QueryResultRow } from 'pg';
import { NextRequest, NextResponse } from 'next/server';

const { Pool } = pg;

const pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
})

export async function GET(
    request: NextRequest,
    { params }: { params: { region: string[] } }) {

    const regionName = params.region[0].replace(/-/g, ' ');
    let client;

    try {
        client = await pool.connect();
        let rows: QueryResultRow[];

        //this might need to include more information like the proveedor to make api calls but we need to hide that information from the user
        ({ rows } = await client.query(`SELECT "plan_id" AS "id", "data", "duracion", "plan_nombre", "precio", 
"is_low_cost", "region_nombre", "region_isocode"
FROM planes_regiones
WHERE lower(unaccent(region_nombre)) = $1
`, [regionName]));
        if (rows.length === 0) {
            return Response.json({ message: 'no se encontraron planes para esta región' })
        }
        return Response.json({ data : rows })

    } catch (err) {
        return Response.json({ error: err });
    } finally {
        client?.release();
    }
}