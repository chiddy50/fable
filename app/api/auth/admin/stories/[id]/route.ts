import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest, context: any){
        
    let { params } =  context
    if (!params?.id) {        
        return NextResponse.json({ data: null, error: true, message: "Challenge Id is required" }, { status: 400 });        
    }


    try {
        const challenge = await db.challenge.findFirst({
            where: {
                id: params.id
            }
        })
        if (!challenge) {
            return NextResponse.json({ data: null, error: true, message: "Challenge not found" }, { status: 404 });                    
        }

        const stories = await db.story.findMany({
            where: {
                challengeId: params.id
            },
            include: {
                user: true
            }
        })

        return NextResponse.json({ data: stories, error: false });
    } catch (error) {
        console.log(error); 
        return NextResponse.json({ data: null, error: true, message: "error" }, { status: 500 });        
    }
    
}


export async function PUT(request: NextRequest, context: any){
    let { params } =  context
    if (!params?.id) {        
        return NextResponse.json({ data: null, error: true, message: "Challenge Id is required" }, { status: 400 });        
    }

    try {
        const updatedFields = await request.json()

        const challenge = await db.challenge.findFirst({
            where: { projectId: params.id }
        })

        if (!challenge) {
            return NextResponse.json({ data: null, error: true, message: "Challenge not found" }, { status: 404 });        
        }

        const updatedChallenge = await db.challenge.update({
            where: { id: challenge.id },
            data: updatedFields,
        });


        return NextResponse.json({ data: updatedChallenge, error: false });
    } catch (error) {
        console.log(error); 
        return NextResponse.json({ data: null, error: true, message: "error" }, { status: 500 });        
    }
}

