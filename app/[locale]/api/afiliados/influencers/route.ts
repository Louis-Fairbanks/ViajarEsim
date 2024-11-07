import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/auth";
import pg, { QueryResultRow } from "pg";
import { InfluencerInformation } from "@/app/[locale]/components/Types/TInfluencerInformation";

const { Pool } = pg;
const pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

export async function GET() {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user || (session.user.email != 'viajaresimoficial@gmail.com' && !session.user.access)) {
        return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
            status: 401,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    let client;
    let rows: QueryResultRow[];

    try {
        client = await pool.connect();

        const query = `
        WITH influencer_data AS (
            SELECT 
                i.id, 
                i.nombre, 
                i.tasa_comision
            FROM 
                influencers i
        ),
        affiliate_links AS (
            SELECT 
                ea.influencer_id,
                ea.url,
                SUM(ea.clics) AS clics,
                COUNT(DISTINCT p.id) AS compras_generadas,
                COALESCE(SUM(p.total), 0) AS ingresos_generados
            FROM 
                enlaces_afiliados ea
            LEFT JOIN 
                pedidos p ON p.enlace_afiliado = ea.id
            GROUP BY 
                ea.influencer_id, ea.url
        ),
        discount_codes AS (
            SELECT 
                cd.influencer_id,
                cd.nombre AS codigo_descuento,
                COUNT(p.id) AS veces_aplicado,
                COALESCE(SUM(p.total), 0) AS ingresos_generados_descuento
            FROM 
                codigos_descuentos cd
            LEFT JOIN 
                pedidos p ON p.descuento_aplicado = cd.id
            GROUP BY 
                cd.influencer_id, cd.nombre
        ),
        purchases AS (
            SELECT 
                COALESCE(ea.influencer_id, cd.influencer_id) AS influencer_id,
                p.id AS numero_orden,
                p.fecha,
                p.total AS sale_price,
                cd.nombre AS descuento_aplicado,
                json_agg(json_build_object(
                    'region', r.nombre,
                    'planName', pl.nombre,
                    'duracion', pl.duracion
                )) AS plans
            FROM 
                pedidos p
            LEFT JOIN 
                enlaces_afiliados ea ON p.enlace_afiliado = ea.id
            LEFT JOIN 
                codigos_descuentos cd ON p.descuento_aplicado = cd.id
            JOIN 
                planes_pedidos pp ON p.id = pp.pedido_id
            JOIN 
                planes pl ON pp.plan_id = pl.id
            JOIN 
                regiones r ON pl.region_id = r.id
            WHERE 
                p.exitoso = true
            GROUP BY 
                COALESCE(ea.influencer_id, cd.influencer_id), p.id, p.fecha, p.total, cd.nombre
        )
        SELECT 
            id.nombre,
            COALESCE(al.url, '') AS link,
            COALESCE(al.clics, 0) AS clics,
            COALESCE(dc.codigo_descuento, '') AS codigo_descuento,
            COALESCE(dc.veces_aplicado, 0) AS veces_aplicado,
            COUNT(DISTINCT p.numero_orden) AS compras_generadas,
            COALESCE(SUM(p.sale_price), 0) AS ingresos_generados,
            id.tasa_comision AS comision,
            COALESCE(SUM(p.sale_price), 0) * (id.tasa_comision / 100) AS ganancias,
            json_agg(json_build_object(
                'fecha', p.fecha,
                'numeroOrden', p.numero_orden,
                'salePrice', p.sale_price,
                'descuentoAplicado', p.descuento_aplicado,
                'plans', p.plans
            )) AS compras
        FROM 
            influencer_data id
        LEFT JOIN 
            affiliate_links al ON id.id = al.influencer_id
        LEFT JOIN 
            discount_codes dc ON id.id = dc.influencer_id
        LEFT JOIN 
            purchases p ON id.id = p.influencer_id
        GROUP BY 
            id.nombre, al.url, al.clics, dc.codigo_descuento, dc.veces_aplicado, id.tasa_comision
        `;

        ({ rows } = await client.query(query));

        if (!rows || rows.length === 0) {
            return NextResponse.json({ message: 'No influencer data found' });
        }
        const influencerData: InfluencerInformation[] = rows.map(row => ({
            nombre: row.nombre,
            link: row.link,
            clics: row.clics,
            codigoDescuento: row.codigo_descuento,
            vecesAplicado: row.veces_aplicado,
            comprasGeneradas: row.compras_generadas,
            ingresosGenerados: row.ingresos_generados,
            comision: row.comision,
            ganancias: row.ganancias,
            compras: row.compras
        }));

        return NextResponse.json(influencerData);
    } catch (err) {
        console.error('Error fetching influencer data:', err);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    } finally {
        client?.release();
    }
}