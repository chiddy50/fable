import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import bcrpyt from "bcrypt"
import { getUserByEmail } from "@/data/user";
import jwt from "jsonwebtoken"
import { cookies } from "next/headers";

export async function POST(request: NextRequest, response: NextResponse){

    try {
        const cookieStore = cookies()

        const { email, name, password } = await request.json()
    
        const hashed_password = await bcrpyt.hash(password, 10);
        
        const existingUser = await getUserByEmail(email);
    
        console.log(existingUser);
    
        if (existingUser) {
            return NextResponse.json({ data: null, error: true, message: "Email already taken" }, { status: 400 });
        }
        
        const user = await db.user.create({
            data: {
                name,
                email,
                password: hashed_password,
                role: "ADMIN"
            },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                publicKey: true
                // Exclude password from the returned user object
            }
        })

        let secret = process.env.NEXT_PUBLIC_AUTH_SECRET ?? "096a32cf02e08862675462a54d922d0959efc826d817bbe81d551ac1054937fc"

        const token = jwt.sign(
            {
                userId: user.id,
                name,
                role: user.role
            },
            secret
        )
        cookieStore.set("token", token)
        
        return NextResponse.json({ data: user, error: false, message: "success", token }, { status: 201 });
        
    } catch (error) {
        console.log(error);
        return NextResponse.json({ data: null, error: true, message: "error" }, { status: 500 });        
    }
}