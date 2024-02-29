import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";


export async function POST(){
    const cookieStore = cookies()

    cookieStore.delete('token')
    return NextResponse.json({ success: true });        
}