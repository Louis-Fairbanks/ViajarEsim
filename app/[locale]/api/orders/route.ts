import { NextRequest, NextResponse } from "next/server";
import pg, { QueryResultRow } from "pg";
import { OrderObject } from "@/app/[locale]/components/Types/TOrderObject";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/auth";

const { Pool } = pg;
const pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

export async function GET(req: NextRequest) {

    const session = await getServerSession(authOptions);

    if (!session || !session.user || session.user.email != 'viajaresimoficial@gmail.com') {
        return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
            status: 401,
            headers: { 'Content-Type': 'application/json' }
        });
    }
    let client;
    let rows: QueryResultRow[];

    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get('page') || '1', 10);
    const limit = parseInt(url.searchParams.get('limit') || '10', 10);

    try {
        client = await pool.connect();

        const query = `
            SELECT 
                p.id, p.fecha, p.nombre, p.apellido, p.correo, p.celular, 
                p.payment_intent, p.exitoso, p.total,
                pp.iccid,
                pl.nombre AS plan_nombre, pl.precio AS plan_precio, pl.proveedor AS plan_proveedor,
                r.nombre AS region_nombre,
                i.nombre AS influencer_nombre,
                cd.nombre AS codigo_descuento,
                cd.porcentaje_descuento
            FROM pedidos p
            LEFT JOIN planes_pedidos pp ON p.id = pp.pedido_id
            LEFT JOIN planes pl ON pp.plan_id = pl.id
            LEFT JOIN regiones r ON pl.region_id = r.id
            LEFT JOIN enlaces_afiliados ea ON p.enlace_afiliado = ea.id
            LEFT JOIN influencers i ON ea.influencer_id = i.id
            LEFT JOIN codigos_descuentos cd ON p.descuento_aplicado = cd.id
            WHERE p.id > 22
            ORDER BY p.id DESC
        `;

        ({ rows } = await client.query(query));

        if (!rows || rows.length === 0) {
            return NextResponse.json({ message: 'búsqueda fallida' });
        } else {
            const groupedData = rows.reduce((acc, row) => {
                if (!acc[row.id]) {
                    acc[row.id] = {
                        id: row.id,  // Add this line
                        fecha: row.fecha,
                        numeroOrden: row.id + 1000000,
                        nombre: row.nombre,
                        apellido: row.apellido,
                        correo: row.correo,
                        celular: row.celular,
                        metodoPago: row.payment_intent.includes('pi_') ? 'Tarjeta' : 'Paypal',
                        ordenCompletada: row.exitoso,
                        total: row.total,
                        influencer: row.influencer_nombre || '',
                        codigoDescuento: row.codigo_descuento || '',
                        porcentajeDescuento: row.porcentaje_descuento || 0,
                        planes: []
                    };
                }

                if (row.iccid) {
                    acc[row.id].planes.push({
                        iccid: row.iccid,
                        nombre: row.plan_nombre,
                        proveedor: row.plan_proveedor,
                        precio: row.plan_precio,
                        region: row.region_nombre
                    });
                }

                return acc;
            }, {} as Record<number, OrderObject & { id: number }>);

            // Sort the grouped data by id in descending order
            const data: OrderObject[] = Object.values(groupedData)
                .sort((a, b) => b.id - a.id)
                .map(({ id, ...rest }) => rest);  // Remove the temporary id field

            const totalItems = data.length;
            const totalPages = Math.ceil(totalItems / limit);

            const startIndex = (page - 1) * limit;
            const endIndex = page * limit;
            const paginatedData = data.slice(startIndex, endIndex);

            return NextResponse.json({
                data: paginatedData,
                pagination: {
                    currentPage: page,
                    itemsPerPage: limit,
                    totalItems: totalItems,
                    totalPages: totalPages
                }
            });
        }
    } catch (err) {
        console.log(err);
        return NextResponse.json({ error: err }, { status: 500 });
    } finally {
        client?.release();
    }
}