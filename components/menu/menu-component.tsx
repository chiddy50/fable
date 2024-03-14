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
// import { signOut } from "next-auth/react"
import { useContext, useEffect, useState } from "react";
import { AppContext } from "@/context/StoryContext";
import axios from "axios";
import { deleteCookie } from 'cookies-next';

const MenuComponent = () => {
    const { refresh, push } = useRouter()

    const [authUser, setAuthUser] =  useState(null)
    const { userLoggedIn, setUserLoggedIn, user } = useContext(AppContext)

    // let auth = localStorage.getItem("user");
    // let local_user = JSON.parse(auth)
    useEffect(() => {
        if (userLoggedIn) {
            // let auth = localStorage.getItem("user");
            // let local_user = JSON.parse(auth)
            // setAuthUser(local_user)
            // console.log({authUser});
            
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

        await deleteCookie('token')
        await localStorage.removeItem("user") 
        await localStorage.removeItem("question") 
        setUserLoggedIn(false)
        // refresh()
        // push("/")       
    }
    
    return (
        <div className="">
        {/* <div className="absolute top-2 right-4"> */}
            <DropdownMenu>
                <DropdownMenuTrigger className="px-4 py-1 text-white outline-none rounded-lg text-sm">
                    <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
                        <i className='bx bx-menu-alt-right text-2xl '></i>
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel className="text-center">
                        { (userLoggedIn) && `Hi, `}
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