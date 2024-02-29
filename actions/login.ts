"use server";

import { LoginSchema } from "@/schemas";
import * as z from "zod"
import { signIn } from "@/auth"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";


export const login = async (values: z.infer<typeof LoginSchema>, redirect = true) => {
    const validatedFields = LoginSchema.safeParse(values)

    if (!validatedFields.success) {
        return { error: "Invalid fields!" }
    }

    const { email, password } = validatedFields.data;

    const config = {        
        email,
        password,
        redirect: redirect,
        redirectTo: DEFAULT_LOGIN_REDIRECT        
    }

    try {
        await signIn("credentials", config)
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: "Invalid credentials" }
            
                default:
                    return { error: "Something went wrong" }
            }
        }

        throw error;
    }
};
