import authConfig from "@/auth.config";
import NextAuth from "next-auth";
import {
    DEFAULT_LOGIN_REDIRECT,
    apiAuthPrefix,
    authRoutes,
    isAPublicRoute,
    publicRoutes
} from "@/routes"

import { NextResponse, type NextRequest } from 'next/server'
import fetchUser from "./lib/fetchUser";

const { auth } = NextAuth(authConfig)

export default auth((request) => {
    const { nextUrl } = request;
    const isLoggedIn = !!request.auth;

    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
    const isAuthRoute = authRoutes.includes(nextUrl.pathname)

    const user = fetchUser()   

    // console.log({cookies: request.cookies});
    
    if (isApiAuthRoute) {
        return null;
    }

    const token = request.cookies?.token?.value
    console.log({ user: !user, isAPublicRoute: isAPublicRoute(nextUrl.pathname) });
    
    if (!user && !isAPublicRoute(nextUrl.pathname)) {
        console.log("Redirect....");
        
        return NextResponse.redirect(new URL("/options", nextUrl))
    }


    
    
    // if (isAuthRoute && isLoggedIn && nextUrl.pathname !== DEFAULT_LOGIN_REDIRECT) {
    //     return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
    // }

    // const loginOrRegister = nextUrl.pathname !== "/auth/login" && nextUrl.pathname !== "/auth/register"

    // if (!isLoggedIn && !isPublicRoute && loginOrRegister) {
    //     return NextResponse.redirect(new URL("/auth/login", nextUrl));
    // }
   
    return null;
})

// Optionally, don't invoke Middleware on some paths
export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"]
    // matcher:["/auth/login", "/auth/register"]
}
