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
    { params }: { params: { influencer: string[] } }) {

    const influencerName = params.influencer[0]
    let client;

    try {
        client = await pool.connect();

        // First, get the influencer's ID
        const influencerResult = await client.query('SELECT id FROM influencers WHERE nombre = $1', [influencerName]);
        
        if (influencerResult.rows.length === 0) {
            return NextResponse.json({ status: 404, message: 'Influencer not found' });
        }

        const influencerId = influencerResult.rows[0].id;

        const query = `
        WITH influencer_data AS (
            SELECT i.id, i.nombre AS influencer_name, i.tasa_comision
            FROM influencers i
            WHERE i.id = $1
        ),
        affiliate_links AS (
            SELECT ea.id, ea.url, ea.clics,
                   COUNT(DISTINCT p.id) AS sales,
                   COALESCE(SUM(p.total), 0) AS total_sales
            FROM enlaces_afiliados ea
            LEFT JOIN pedidos p ON p.enlace_afiliado = ea.id
            WHERE ea.influencer_id = $1
            GROUP BY ea.id, ea.url, ea.clics
        ),
        discount_codes AS (
            SELECT cd.id, cd.nombre AS discount_code, cd.porcentaje_descuento,
                   COUNT(p.id) AS times_applied,
                   COALESCE(SUM(p.total * ((cd.porcentaje_descuento / 100) / (1 - (cd.porcentaje_descuento / 100)))), 0) AS total_savings
            FROM codigos_descuentos cd
            LEFT JOIN pedidos p ON p.descuento_aplicado = cd.id
            WHERE cd.influencer_id = $1
            GROUP BY cd.id, cd.nombre, cd.porcentaje_descuento
        ),
        purchases AS (
            SELECT p.id AS purchase_id, p.fecha, p.total,
                   cd.nombre AS discount_code,
                   json_agg(json_build_object(
                       'plan_id', pl.id, 
                       'plan_name', pl.nombre, 
                       'region_id', r.id,
                       'region_name', r.nombre,
                       'cantidad', pp.cantidad
                   )) AS plans
            FROM pedidos p
            LEFT JOIN codigos_descuentos cd ON p.descuento_aplicado = cd.id
            JOIN planes_pedidos pp ON p.id = pp.pedido_id
            JOIN planes pl ON pp.plan_id = pl.id
            JOIN regiones r ON pl.region_id = r.id
            WHERE p.exitoso = true
              AND (p.enlace_afiliado IN (SELECT id FROM enlaces_afiliados WHERE influencer_id = $1)
                   OR p.descuento_aplicado IN (SELECT id FROM codigos_descuentos WHERE influencer_id = $1))
            GROUP BY p.id, p.fecha, p.total, cd.nombre
        )
        SELECT 
            id.influencer_name,
            id.tasa_comision,
            json_agg(DISTINCT jsonb_build_object(
                'url', al.url,
                'clics', al.clics,
                'sales', al.sales,
                'total_sales', al.total_sales
            )) AS affiliate_links,
            json_agg(DISTINCT jsonb_build_object(
                'discount_code', dc.discount_code,
                'porcentaje_descuento', dc.porcentaje_descuento,
                'times_applied', dc.times_applied,
                'total_savings', dc.total_savings
            )) AS discount_codes,
            json_agg(DISTINCT jsonb_build_object(
                'purchase_id', p.purchase_id,
                'fecha', p.fecha,
                'total', p.total,
                'discount_code', p.discount_code,
                'plans', p.plans
            )) AS purchases,
            COUNT(DISTINCT p.purchase_id) AS total_purchases,
            COALESCE(SUM(p.total), 0) AS total_sales
        FROM influencer_data id
        LEFT JOIN affiliate_links al ON true
        LEFT JOIN discount_codes dc ON true
        LEFT JOIN purchases p ON true
        GROUP BY id.influencer_name, id.tasa_comision;
        `;

        const { rows } = await client.query(query, [influencerId]);

        if (rows.length === 0) {
            return NextResponse.json({ status: 404, message: 'No data found for influencer' });
        } else {
            return NextResponse.json({ status: 200, data: rows[0] });
        }

    } catch (error) {
        console.error('Error in GET /api/influencer/[...influencer]:', error);
        return NextResponse.json({ status: 500, message: 'Internal server error' });
    } finally {
        client?.release();
    }
}
// PEDIDOS
//id  |  nombre   | apellido  |               correo                |         payment_intent          | exitoso |   celular    | enlace_afiliado |             fecha             | total | descuento_aplicado
//PLANES_PEDIDOS
//id  | pedido_id | plan_id | cantidad |        iccid
//INFLUENCERS
//id |        nombre         | tasa_comision
//ENLACES_AFILIADOS
// id |          url          | clics | influencer_id
//CODIGOS_DESCUENTOS
// id |        nombre         | porcentaje_descuento | influencer_id
//enlaces de afiliado table
//need to return : name of enlace_afiliado, clics for that enlace, sales generated through that enlace, total amount of sales generated through that enlace
//conversion rate can be calculated through clics/sales for that enlace, tasa_comision which will be multiplied by sales total to get total commission generated
//descuentos table
//need to also return codigo descuento, the total amount of times it was applied, and the total savings generated
//purchases table
//id number of purchases associated with the influencer, timestamp, total, comision which is calculated, discount code if applied, and what plans were bought
//the plans associated with an order can be found by joining the planes_pedidos table with the planes table and joining the planes_pedido by id with the pedidos table by id