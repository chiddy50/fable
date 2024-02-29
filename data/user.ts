import { db } from "@/lib/db";

export const getUserByEmail = async (email: string) => {
    try {
        const user = await db.user.findUnique({ 
            where: { email },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                publicKey: true
                // Exclude password from the returned user object
            }
        })
        return user;
    } catch (error) {
        console.log(error);
        
        return null;
    }
}

export const getUserById = async (id: string) => {
    try {
        const user = await db.user.findUnique({ 
            where: { id },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                // Exclude password from the returned user object
            }
        })
        return user;
    } catch (error) {
        return null;
    }
}