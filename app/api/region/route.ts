import pg from 'pg';

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
})


export async function POST(){

    const client = await pool.connect();

    try {
      await client.query(`
        INSERT INTO regiones ("nombre", "imgurl", "isocode", "proveedoresim") VALUES 
        ('');
      `); // fill that out with post data
    } catch (err){
      return Response.json({ error: err });
    } finally {
      client.release();
    }

}