import { cookies } from "next/headers.js";
import jwt from "jsonwebtoken"
import { getUserById } from "@/data/user";

const fetchUser = async () => {
    try {
        
        const cookieStore = cookies()
        const userCookie = cookieStore.get('token');            
        if (!userCookie) return null;
        
        const verified = jwt.verify(userCookie?.value, process.env.AUTH_SECRET)
        if (!verified) return null;
        
        // const iat = verified.iat
        // const now = Math.floor(Date.now() / 1000); // Get the current time in seconds
        
        // // Check if the token has expired (1 hour = 3600 seconds)
        // const tokenExpirationTime = iat + 3600; // Add 1 hour to the issued at time
        // console.log({tokenExpirationTime, now});

        // if (now > tokenExpirationTime) {
        //     console.log("Token has expired");
        //     // return null;
        // }
        

        const user = await getUserById(verified?.userId)
        return user;
    } catch (error) {
        console.log(error);
        return null
    }
}

export default fetchUser