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
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "@/context/StoryContext";
import axios from "axios";
import { deleteCookie } from 'cookies-next';
import { useDynamicContext } from "@dynamic-labs/sdk-react-core"
import Link from "next/link";

const MobileMenuComponent = () => {
    const { refresh, push } = useRouter()
    const { user, primaryWallet, setShowAuthFlow, handleLogOut } = useDynamicContext()

    const [authUser, setAuthUser] =  useState(null)
    const { userLoggedIn, setUserLoggedIn } = useContext(AppContext)

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

        await deleteCookie('token')
        await localStorage.removeItem("user") 
        await localStorage.removeItem("question") 
        setUserLoggedIn(false)
        // refresh()
        // push("/")       
    }

    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger className="px-4 py-1 text-white outline-none rounded-lg text-sm">
                    <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
                        <i className='bx bx-menu-alt-right text-2xl '></i>
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel className="text-center">
                        { user && `Hi, ${user.username}`}
                        { !user && `Menu`}
                    </DropdownMenuLabel>
                    
                    <DropdownMenuSeparator />

                    <DropdownMenuItem>
                        <Link href="/" className="w-full">
                            <Button className="w-full h-full text-xs uppercase">Home</Button>
                        </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem>
                        <Link href="/user/challenges" className="w-full">
                            <Button className="w-full h-full text-xs uppercase">Tell a story</Button>
                        </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem>
                        <Link href="/admin/challenge/create" className="w-full">
                            <Button className="w-full h-full text-xs uppercase">Create challenge</Button>
                        </Link>
                    </DropdownMenuItem>

                    {
                        user &&
                        <DropdownMenuItem>
                            <Link href="/admin/challenges" className="w-full">
                                <Button className="w-full h-full text-xs uppercase">My challenges</Button>
                            </Link>
                        </DropdownMenuItem>
                    }

                    {
                        user &&
                        <DropdownMenuItem>
                            <Link href="/user/stories" className="w-full">
                                <Button className="w-full h-full text-xs uppercase">My Stories</Button>
                            </Link>
                        </DropdownMenuItem>
                    }                    

                    { user && 
                        <>                        
                            <DropdownMenuItem>
                                <Button onClick={() => handleLogOut()} className="w-full h-full text-xs uppercase">Logout</Button>
                            </DropdownMenuItem>
                        </>
                    }                        

                    { !user && 
                        <>
                            <DropdownMenuItem>
                                <Button onClick={() => setShowAuthFlow(true) } className="w-full h-full text-xs uppercase">Register/Login</Button>
                            </DropdownMenuItem>

                        </>
                    }

                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

export default MobileMenuComponent