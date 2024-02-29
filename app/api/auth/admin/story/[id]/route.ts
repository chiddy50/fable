import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest, context: any){
        
    let { params } =  context
    if (!params?.id) {        
        return NextResponse.json({ data: null, error: true, message: "Story Id is required" }, { status: 400 });        
    }

    try {
        
        const story = await db.story.findFirst({
            where: {
                id: params.id
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,                        
                        email: true,  
                        publicKey: true                      
                    }
                },
                challenge: true
            }
        })
        if (!story) {
            return NextResponse.json({ data: null, error: true, message: "Story not found" }, { status: 404 });                    
        }

        const first_place_story = await db.story.findFirst({
            where: { 
                challengeId: story.challengeId,
                award: "FIRST"
            }
        })
        const second_place_story = await db.story.findFirst({
            where: { 
                challengeId: story.challengeId,
                award: "SECOND"
            }
        })
        const third_place_story = await db.story.findFirst({
            where: { 
                challengeId: story.challengeId,
                award: "THIRD"
            }
        })

        let response = {
            submission: story,
            first_place_story,
            second_place_story,
            third_place_story
        }


        return NextResponse.json({ data: response, error: false });
    } catch (error) {
        console.log(error); 
        return NextResponse.json({ data: null, error: true, message: error?.message }, { status: 500 });        
    }
    
}

export async function PUT(request: NextRequest, context: any){
    let { params } =  context
    if (!params?.id) {        
        return NextResponse.json({ data: null, error: true, message: "Story Id is required" }, { status: 400 });        
    }

    try {
        const updatedFields = await request.json()

        const story = await db.story.findFirst({
            where: { id: params.id }
        })
        
        if (!story) {
            return NextResponse.json({ data: null, error: true, message: "Story not found" }, { status: 404 });        
        }

        const updatedStory = await db.story.update({
            where: { id: story.id },
            data: updatedFields,
        });


        return NextResponse.json({ data: updatedStory, error: false });
    } catch (error) {
        console.log(error); 
        return NextResponse.json({ data: null, error: true, message: error?.message }, { status: 500 });        
    }
}