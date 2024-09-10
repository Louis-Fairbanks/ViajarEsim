import pg, { QueryResultRow } from 'pg';
import { NextRequest, NextResponse } from "next/server";
import { TCartItem } from '@/app/components/Types/TCartItem';
import { Plan } from '@/app/components/Types/TPlan';

type PurchaseOrderInformation = {
    cartItems: TCartItem[],
    appliedDiscount: boolean,
    total: number
}

const { Pool } = pg;
const pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
    ssl: {
        rejectUnauthorized: false
    }
})

export async function POST(requestData: NextRequest) {
    let client;

    try {
        const requestedParams = await requestData.json()
        console.log('Received params:', requestedParams);

        const planesData = requestedParams.planes.split(',').map((plan: string) => {
            const [id, quantity] = plan.split(':').map(Number);
            return { id, quantity };
        });
        console.log('Parsed planes data:', planesData);

        const purchaseOrderInformation: PurchaseOrderInformation = {
            cartItems: [],
            appliedDiscount: requestedParams.descuentoAplicado === 'true',
            total: 0
        }

        client = await pool.connect();
        console.log('Connected to database');

        let rows: QueryResultRow[];

        ({ rows } = await client.query(`SELECT planes.id, data, duracion, proveedor, isocode, precio, regiones.nombre as region_nombre
         FROM planes INNER JOIN regiones ON planes.region_id = regiones.id WHERE planes.id = ANY($1::int[])`, [planesData.map((plan : Plan) => plan.id)]));
        console.log('Query result:', rows);

        if (!rows || rows.length === 0) {
            console.error('No rows found');
            return NextResponse.json({ message: 'No rows found' }, { status: 404 })
        } else {
            purchaseOrderInformation.cartItems = rows.map((row, index) => {
                const plan: Plan = {
                    id: row.id,
                    plan_nombre: row.data,
                    region_nombre: row.region_nombre,
                    region_isocode: row.isocode,
                    precio: row.precio,
                    data: row.data,
                    duracion: row.duracion,
                    is_low_cost: row.proveedor === 'low_cost'
                }
                return { plan, quantity: planesData[index].quantity }
            })
            console.log('Mapped cart items:', purchaseOrderInformation.cartItems);

            // Calculate total
            purchaseOrderInformation.total = purchaseOrderInformation.cartItems.reduce((acc, item) => {
                return acc + (item.plan.precio * item.quantity);
            }, 0);
            console.log('Calculated total before discount:', purchaseOrderInformation.total);

            // Apply 15% discount if descuentoAplicado is true
            if (purchaseOrderInformation.appliedDiscount) {
                console.log('Applying 15% discount');
                const discountAmount = purchaseOrderInformation.total * 0.15;
                purchaseOrderInformation.total -= discountAmount;
                console.log('Applied discount. New total:', purchaseOrderInformation.total);
            }

            // Round total to two decimal places
            purchaseOrderInformation.total = Number(purchaseOrderInformation.total.toFixed(2));
        }

        console.log('Final purchase order information:', purchaseOrderInformation);
        return NextResponse.json(purchaseOrderInformation)
    } catch (err) {
        console.error('Detailed error:', err);
        return NextResponse.json({ message: 'Unable to generate order information', error: (err as Error).message }, { status: 500 })
    } finally {
        if (client) {
            console.log('Releasing database connection');
            client.release()
        }
    }
}