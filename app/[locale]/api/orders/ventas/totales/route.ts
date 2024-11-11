import pg, { QueryResultRow } from 'pg';

const { Pool } = pg;
const pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
    ssl: {
        rejectUnauthorized: false
    }
});


export async function GET() {
    let client;
    let rows: QueryResultRow[];

    try {
        client = await pool.connect();

        const query = `
        SELECT
          DATE_TRUNC('month', fecha) AS month,
          SUM(total) AS total_sales
        FROM
          pedidos
        WHERE
          id > 22
        GROUP BY
          month
        ORDER BY
          month;
      `;


        ({ rows } = await client.query(query));
    } catch (error) {
        return new Response(JSON.stringify({ error: "Error fetching order data" }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    } finally {
        client?.release();
    }

    return new Response(JSON.stringify({ data: rows }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    });
}