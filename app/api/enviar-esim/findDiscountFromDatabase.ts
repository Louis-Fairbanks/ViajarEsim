import { Pool} from 'pg';

export async function findDiscountFromDatabase(discountName : string, pool: Pool){

    let client;

    try {
        client = await pool.connect();

        let {rows} = await client.query(`SELECT id FROM codigos_descuentos WHERE nombre = $1`, [discountName])

        if(rows.length === 0){
            return null;
        }
        else {
            return rows[0].id;
        }
    }catch (error){
        console.log('Error finding discount:', error);
        return null;
    }finally{
        client?.release();
    }
}