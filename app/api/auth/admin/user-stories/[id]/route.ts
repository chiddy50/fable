import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest, context: any){
        
    let { params } =  context
    console.log({params});
    
    if (!params?.id) {        
        return NextResponse.json({ data: null, error: true, message: "User Id is required" }, { status: 400 });        
    }


    try {
        const user = await db.user.findUnique({
            where: {
                id: params.id
            }
        })
        if (!user) {
            return NextResponse.json({ data: null, error: true, message: "User not found" }, { status: 404 });                    
        }

        const stories = await db.story.findMany({
            where: {
                userId: params.id
            },
            include: {
                challenge: true
            }
        })

        return NextResponse.json({ data: stories, error: false });
    } catch (error) {
        console.log(error); 
        return NextResponse.json({ data: null, error: true, message: error?.message }, { status: 500 });        
    }
    
}