import { NextRequest, NextResponse } from "next/server";
import CryptoJS from "crypto-js";

export async function POST(request : NextRequest, response : NextResponse){
    return NextResponse.json({message: 'hi'})
    // const { amount, currency } = request.body;

    // const data = {
    //     amount,
    //     currency,
    //     order_id : crypto.randomBytes(12).toString("hex"), //this could be used later with webhooks t
    // }
    // const response = await fetch()
}