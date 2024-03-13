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

const MobileMenuComponent = () => {
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
                        { (userLoggedIn && user) && `Hi, ${user?.name}`}
                        { !userLoggedIn && `Menu`}
                    </DropdownMenuLabel>
                    
                    <DropdownMenuSeparator />

                    <DropdownMenuItem>
                        <Button onClick={() => push('/')} className="w-full h-full text-xs uppercase">Home</Button>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Button onClick={() => push('/admin/challenge/create')} className="w-full h-full text-xs uppercase">Create challenge</Button>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Button onClick={() => push('/admin/challenges')} className="w-full h-full text-xs uppercase">My challenges</Button>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Button onClick={() => push('/user/stories')} className="w-full h-full text-xs uppercase">My Stories</Button>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Button onClick={() => push('/user/challenges')} className="w-full h-full text-xs uppercase">Tell a story</Button>
                    </DropdownMenuItem>

                    { userLoggedIn && 
                        <>                        
                            <DropdownMenuItem>
                                <Button onClick={logout} className="w-full h-full text-xs uppercase">Logout</Button>
                            </DropdownMenuItem>
                        </>
                    }
                        

                    { !userLoggedIn && 
                        <>
                            <DropdownMenuItem>
                                <Button onClick={() => bringUpAdminRegisterModal() } className="w-full h-full text-xs uppercase">Register</Button>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Button onClick={() => bringUpAdminLoginModal() } className="w-full h-full text-xs uppercase">Login</Button>
                            </DropdownMenuItem>
                        </>
                    }

                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

export default MobileMenuComponent