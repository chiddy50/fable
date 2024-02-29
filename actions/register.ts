"use server";

import { RegisterSchema } from "@/schemas";
import * as z from "zod"
import bcrpyt from "bcrypt"
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
    const validatedFields = RegisterSchema.safeParse(values)

    if (!validatedFields.success) {
        return { error: "Invalid fields!" }
    }

    const { email, name, password } = validatedFields.data

    const hashed_password = await bcrpyt.hash(password, 10);
    
    const existingUser = await getUserByEmail(email);

    console.log(existingUser);

    if (existingUser) {
        return { error: "Email already taken!" }
    }
    
    await db.user.create({
        data: {
            name,
            email,
            password: hashed_password
        }
    })
    return { success: "User registered" }
};

