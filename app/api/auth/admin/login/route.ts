import { getUserByEmail } from "@/data/user";
import { NextRequest, NextResponse } from "next/server";

import bcrpyt from "bcrypt"
import jwt from "jsonwebtoken"
import { cookies } from "next/headers";

export async function POST(request: NextRequest, response: NextResponse){
    try {
        const cookieStore = cookies()
        
        const { email, password } = await request.json();
        
        const user = await getUserByEmail(email)
        if (!user) {
            return NextResponse.json({ data: null, error: true, message: "User not found" }, { status: 400 });        
        }
    
        
        const matched = await bcrpyt.compare(password, user?.password)
        console.log({matched});
    
        if (!matched) {
            return NextResponse.json({ data: null, error: true, message: "Invalid credentials" }, { status: 400 });        
        }

        let secret = process.env.AUTH_SECRET ?? "096a32cf02e08862675462a54d922d0959efc826d817bbe81d551ac1054937fc"

    
        const token = jwt.sign(
            {
                userId: user.id,
                name: user.name,
                role: user.role
            },
            secret
        )

        cookieStore.set("token", token)

        const { password: _, ...userWithoutPassword } = user;
                
        return NextResponse.json({ data: user, error: false, message: "success", token });
        
    } catch (error) {
        
    }

}