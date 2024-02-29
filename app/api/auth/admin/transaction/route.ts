import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest, response: NextResponse){

    const { 
        userId,
        transactionFee,
        transactionFeeSol,
        totalCharge,
        totalChargeSol,
        status                            
    } = await request.json()
   
    
    try {
        
        let transaction = await db.transaction.create({
            data: {
                userId,
                transactionFee,
                transactionFeeSol,
                totalCharge,
                totalChargeSol,
                status
            }
        })
        console.log(transaction);
        return NextResponse.json({ data: transaction, error: false });
    } catch (error) {
        console.log(error); 
        return NextResponse.json({ data: null, error: true, message: "error" }, { status: 500 });        
    }
    
}


