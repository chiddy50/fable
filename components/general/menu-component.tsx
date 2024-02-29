"use client"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button";
// import { signOut } from "@/auth";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react"
import { useContext, useEffect, useState } from "react";
import { AppContext } from "@/context/StoryContext";
import axios from "axios";

const MenuComponent = () => {
    const { refresh, push } = useRouter()

    const [authUser, setAuthUser] =  useState(null)
    const { userLoggedIn, setUserLoggedIn, user } = useContext(AppContext)

    useEffect(() => {
        if (userLoggedIn) {
            let auth = user ?? localStorage.getItem("user");
            setAuthUser(auth)
        }
    }, [userLoggedIn, user])

    const bringUpAdminRegisterModal = () => {
        let adminRegisterModal = document.getElementById("admin-register-modal")
        if (adminRegisterModal) {            
            adminRegisterModal.style.display = "block";    
        }
    }

    const bringUpAdminLoginModal = () => {
        let adminLoginModal = document.getElementById("admin-login-modal")
        if (adminLoginModal) {            
            adminLoginModal.style.display = "block";    
        }
    }

    const logout = async () => {
        try {            
            const res = await axios.post("/api/auth/admin/logout", { data: "" })
            console.log(res);
            localStorage.removeItem("user") 
            localStorage.removeItem("question") 
            setUserLoggedIn(false)
            refresh()
            push("/")
        } catch (error) {
            console.log(error);
            
        }
    }
    
    return (
        <div className="absolute top-2 right-4">
            <DropdownMenu>
                <DropdownMenuTrigger className="px-4 py-1 bg-gray-800 text-white outline-none rounded-lg text-sm">Menu</DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel className="text-center">
                        { (userLoggedIn && user) && `Hi, ${user?.name}`}
                        { !userLoggedIn && `Menu`}
                    </DropdownMenuLabel>
                    
                    <DropdownMenuSeparator />

                    <DropdownMenuItem>
                        <Button onClick={() => push('/')} className="w-full h-full text-xs">Home</Button>
                    </DropdownMenuItem>

                    { userLoggedIn && 
                        <>
                            {/* <DropdownMenuItem >                            
                                <Button className="w-full h-full text-xs">Profile</Button>                        
                            </DropdownMenuItem> */}
                            <DropdownMenuItem>
                                <Button onClick={logout} type="submit" className="w-full h-full text-xs">Logout</Button>
                            </DropdownMenuItem>
                        </>
                    }
                        

                    { !userLoggedIn && 
                        <>
                            <DropdownMenuItem>
                                <Button onClick={() => bringUpAdminRegisterModal() } className="w-full h-full text-xs">Register</Button>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Button onClick={() => bringUpAdminLoginModal() } className="w-full h-full text-xs">Login</Button>
                            </DropdownMenuItem>
                        </>
                    }

                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

export default MenuComponent