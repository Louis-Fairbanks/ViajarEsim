import { Pool} from 'pg';

export async function setPurchaseAsSuccessful(orderId : string, pool : Pool): Promise<boolean | undefined>{

    let client;

    try {
        client = await pool.connect();
        let {rows} = await client.query('UPDATE pedidos SET exitoso = true WHERE id = $1', [orderId]);

        if(rows.length === 0){
            console.log('No purchase found with id:', orderId);
            return false;
        }
        else {
            console.log('Purchase set as successful:', orderId);
            return true;
        }
    } catch(err){
        console.log('Error setting purchase as successful:', err);
        return false;
    } finally{
        client?.release();
    }
}