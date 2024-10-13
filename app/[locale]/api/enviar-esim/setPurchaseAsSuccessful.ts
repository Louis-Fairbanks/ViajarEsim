import { Pool} from 'pg';

interface SuccessfulOrderInfo {
    orderId : string,
    enlace_afiliado : number, //id from enlaces_afiliados table
    total : number, 
    descuento_aplicado : number  | null//id from descuentos table of applied discount
    pool : Pool
}

export async function setPurchaseAsSuccessful({orderId, enlace_afiliado, total, descuento_aplicado, pool} : SuccessfulOrderInfo): Promise<boolean | undefined>{

    let client;
    if(descuento_aplicado === 0){
        descuento_aplicado = null;
    }

    try {
        client = await pool.connect();
        let {rows} = await client.query(`UPDATE pedidos SET exitoso = true, enlace_afiliado = $1, total = $2, 
        descuento_aplicado = $3 WHERE id = $4 RETURNING *`, [enlace_afiliado, total, descuento_aplicado, orderId]);

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