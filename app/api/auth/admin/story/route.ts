import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest, response: NextResponse){

    const { 
        userId,                
        challengeId,           
        story,
        userAddress                            
    } = await request.json()
   
    

    try {
        const challenge = await db.challenge.findFirst({
            where: { id: challengeId }
        })

        if (!challenge) {
            return NextResponse.json({ data: null, error: true, message: "Challenge not found" }, { status: 404 });        
        }

        
        const updatedUser = await db.user.update({
            where: { id: userId },
            data: {
                publicKey: userAddress
            },
        });

        let newStory = await db.story.create({
            data: {
                userId,                
                challengeId,           
                story,
                projectId: challenge?.projectId
            }
        })
        console.log(newStory);
        return NextResponse.json({ data: newStory, error: false });
    } catch (error) {
        console.log(error); 
        return NextResponse.json({ data: null, error: true, message: error?.message }, { status: 500 });        
    }
    
}


