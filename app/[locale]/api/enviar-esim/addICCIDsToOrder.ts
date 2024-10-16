import { Pool, PoolClient } from 'pg';
import { NextResponse } from 'next/server';

export async function addICCIDsToOrder(pedidos_plan_id: number, iccid: string, qrcode: string, pool: Pool): Promise<NextResponse> {
    let client: PoolClient | null = null;

    try {
        client = await pool.connect();
        await client.query('BEGIN');

        const result = await client.query(
            `UPDATE planes_pedidos SET iccid = $2, qrcode = $3 WHERE id = $1 RETURNING *`,
            [pedidos_plan_id, iccid, qrcode]
        );

        if (result.rowCount === 0) {
            await client.query('ROLLBACK');
            return NextResponse.json({ message: 'No matching record found' }, { status: 404 });
        }

        await client.query('COMMIT');
        return NextResponse.json({ message: 'ICCID added successfully', updatedRecord: result.rows[0] }, { status: 200 });

    } catch (err) {
        await client?.query('ROLLBACK');
        console.error('Error adding ICCID:', err);
        return NextResponse.json({ message: 'Error adding ICCID' }, { status: 500 });
    } finally {
        client?.release();
    }
}