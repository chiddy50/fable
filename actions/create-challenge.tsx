"use server";

import { ChallengeSchema } from "@/schemas";
import * as z from "zod"
import bcrpyt from "bcrypt"
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";

export const createChallenge = async (values: z.infer<typeof ChallengeSchema>) => {
    const { userId, image, date, time, price } = values

    // const existingUser = await getUserByEmail("emmanuel@email.com");
    // console.log(existingUser);
    // return { data: existingUser }
    
    let challenge = await db.challenge.create({
        data: {
            userId, 
            image, 
            date, 
            time, 
            price
        }
    })

    return { success: "Challenge created", data: challenge }
}