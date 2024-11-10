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

    if (!session || !session.user || (session.user.email != 'viajaresimoficial@gmail.com' && !session.user.access)) {
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
    const search = url.searchParams.get('search') || '';

    try {
        client = await pool.connect();

        const query = `
            SELECT 
                p.id, p.fecha, p.nombre, p.apellido, p.correo, p.celular, 
                p.payment_intent, p.exitoso, p.total, p.reembolsado, p.locale, p.total_pagado AS moneda,
                pp.iccid,
                pp.qrcode,
                pl.nombre AS plan_nombre, pl.precio AS plan_precio, pl.proveedor AS plan_proveedor, pl.data AS plan_data, pl.duracion AS plan_duracion,
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
            AND (
                pp.iccid ILIKE $1 OR
                p.nombre ILIKE $1 OR
                p.apellido ILIKE $1 OR
                p.correo ILIKE $1 OR
                p.celular ILIKE $1 OR
                CAST(p.id AS TEXT) ILIKE $1
            )
            ORDER BY p.id DESC
        `;

        ({ rows } = await client.query(query, [`%${search}%`]));

        if (!rows || rows.length === 0) {
            return NextResponse.json({ message: 'No se encontraron resultados' });
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
                        metodoPago: row.payment_intent.includes('pi_') ? 'Tarjeta' : row.payment_intent.includes('crypto') ? 'Criptomonedas'  : 'Paypal',
                        ordenCompletada: row.exitoso,
                        reembolsado: row.reembolsado,
                        locale: row.locale,
                        moneda: row.moneda,
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
                        region: row.region_nombre,
                        data: row.plan_data,
                        duration: row.plan_duracion,
                        qrcode: row.qrcode
                    });
                }
                
                return acc;
            }, {} as Record<number, OrderObject & { id: number }>);

            const data: OrderObject[] = Object.values(groupedData)
                .sort((a, b) => b.id - a.id)
                .map(({ id, ...rest }) => rest);

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