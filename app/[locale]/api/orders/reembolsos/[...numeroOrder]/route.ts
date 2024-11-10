import pg from 'pg';
import { NextResponse, NextRequest } from 'next/server';

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

export async function POST(
  request: NextRequest,
  { params }: { params: { numeroOrder: string[] } }
) {
  const orderNumber = params.numeroOrder[0];
  let client;

  try {
    client = await pool.connect();

    const orderNumberInt = parseInt(orderNumber, 10);
    if (isNaN(orderNumberInt)) {
      return NextResponse.json({ error: 'Invalid order number' }, { status: 400 });
    }

    const adjustedOrderId = orderNumberInt - 1000000;

    const result = await client.query(
      'UPDATE pedidos SET reembolsado = true WHERE id = $1',
      [adjustedOrderId]
    );

    if (result.rowCount === 0) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Order marked as refunded' }, { status: 200 });
  } catch (err) {
    console.error('Error updating order:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  } finally {
    client?.release();
  }
}