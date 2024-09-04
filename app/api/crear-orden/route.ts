import { NextResponse } from "next/server";


export async function GET(){
    return NextResponse.json({message: "We should get this message back before redirecting to success page"})
}