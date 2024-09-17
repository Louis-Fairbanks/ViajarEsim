import { Pool} from 'pg';
import { NextResponse } from 'next/server';
import { Stripe } from 'stripe';

type PlanData = {
    id: number;
    quantity: number;
}

type OrderData = {
    nombre: string;
    apellido: string;
    correo: string;
    celular: string;
    paymentIntent: string;
    planes: PlanData[];
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);


export async function insertOrderIntoDatabase(orderData : OrderData, pool : Pool): Promise<number | NextResponse | undefined>{
    let client;
    let rowId : number = 0;

    

    try {
        const paymentIntent = await stripe.paymentIntents.retrieve(orderData.paymentIntent);
        if(paymentIntent.status != 'succeeded'){
            return NextResponse.json({message: 'Payment intent not found, due not proceed'})
        }

        client = await pool.connect();
        const insertedOrder = await client.query(`INSERT INTO pedidos (payment_intent, nombre, apellido, correo, celular, exitoso)
        VALUES ($1, $2, $3, $4, $5, false) RETURNING id`, [orderData.paymentIntent, orderData.nombre, orderData.apellido, orderData.correo, orderData.celular]);
        if(insertedOrder.rows.length === 0){
            return NextResponse.json({message: 'No se pudo insertar el pedido'})
        }
        else{
            rowId = insertedOrder.rows[0].id;
            const values = orderData.planes.map(plan => `(${rowId}, ${plan.id}, ${plan.quantity})`).join(', ');
            const insertedRows = await client.query(`INSERT INTO ordenes_pedidos (pedido_id, plan_id, cantidad) VALUES ${values}`);
            if (insertedRows.rowCount !== orderData.planes.length){
                return NextResponse.json({message: 'No se pudieron insertar los planes'})
            }
        }
    }catch(err){
        console.log(err)
    }
    finally{
        client?.release();
        return rowId;
    }
}