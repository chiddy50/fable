import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, response: NextResponse){

    try {
        const userId: string = request.nextUrl.searchParams.get('id')!
        
        const challenges = await db.challenge.findMany({
            where: {
                userId: userId
            },
            include: {
                stories: true
            }
        })
        
        return NextResponse.json({ data: challenges, error: false });
    } catch (error) {
        console.log(error);   
        return NextResponse.json({ data: null, error: true, message: error?.message }, { status: 500 });        
    }
    
}

