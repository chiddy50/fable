import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest, response: NextResponse){

    const { 
        userId, 
        image, 
        date, 
        title, 
        time, 
        price, 
        currency, 
        symbol,
        projectMintAddress,  
        projectTransactionId,
        projectId,
        nftId,
        nftTransactionId
    } = await request.json()
    console.log({ 
        userId, 
        image, 
        date, 
        title, 
        time, 
        price, 
        currency, 
        symbol,
        projectMintAddress,  
        projectTransactionId,
        projectId,
        nftId,
        nftTransactionId
    });
    

    try {
        
        let challenge = await db.challenge.create({
            data: {
                image, 
                userId, 
                title, 
                date, 
                time, 
                price,
                currency, 
                symbol,
                projectTransactionId,
                projectMintAddress,
                projectId,
                nftId,
                nftTransactionId
            }
        })
        console.log(challenge);
        return NextResponse.json({ challenge, error: false });
    } catch (error) {
        console.log(error); 
        return NextResponse.json({ data: null, error: true, message: "error" }, { status: 500 });        
    }
    
}


