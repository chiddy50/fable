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
import { useDynamicContext, useUserUpdateRequest, getAuthToken, useWalletConnectorEvent } from "@dynamic-labs/sdk-react-core"
import axiosInterceptorInstance from "@/axiosInterceptorInstance";
import { transfer, transfer2 } from "@/lib/transfer";
import Link from "next/link";

const MenuComponent = () => {
    const { refresh, push } = useRouter()
    const { user, primaryWallet, setShowAuthFlow, handleLogOut } = useDynamicContext()

    const [authUser, setAuthUser] =  useState(null)
    const { userLoggedIn, setUserLoggedIn } = useContext(AppContext)

    const { updateUserWithModal } = useUserUpdateRequest();
    const dynamicJwtToken = getAuthToken();
    
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

    useWalletConnectorEvent(
        primaryWallet?.connector,
        'accountChange',
        ({ accounts }, connector) => {
          console.group('accountChange');
          console.log('accounts', accounts);
          console.log('connector that emitted', connector);
          console.groupEnd();
        },
    );

    const sendTokenToServer = async () => {

        try {

            const res = await axiosInterceptorInstance.post("/token", {token: dynamicJwtToken}, {
                headers: {
                    Authorization: `Bearer ${dynamicJwtToken}`
                }
            })
            console.log(res);
        } catch (error) {
            console.log(error);
            
        }
        
    };

    const handleUpdateUserProfile = async () => {
        
        let updatedFields = await updateUserWithModal(["email", "username"])
        try {
            console.log('Updated fields:', updatedFields);
            let { email, username } = updatedFields;
            let current_email = user?.email
            let lastVerifiedCredentialId = user?.lastVerifiedCredentialId
            let userId = user?.userId

        } catch (error) {
            console.error('Update failed:', error);            
        }
         
    };
    
    return (
        <div className="">
            <DropdownMenu>
                <DropdownMenuTrigger className="px-4 py-1 text-white outline-none rounded-lg text-sm">
                    <div className="w-10 h-10 bg-gray-400 rounded-full flex items-center justify-center">
                        <i className='bx bx-menu-alt-right text-2xl '></i>
                    </div>
                </DropdownMenuTrigger>

                <DropdownMenuContent>
                    <DropdownMenuLabel className="text-center">
                        { (user) && `${user.username}`}
                        { !user && `Menu`}
                    </DropdownMenuLabel>
                    
                    <DropdownMenuSeparator />

                    <DropdownMenuItem>
                        <Link href="/" className="w-full">
                            <Button 
                            className="w-full h-full text-xs">Home</Button>
                        </Link>
                    </DropdownMenuItem>

                    { user && 
                        <>
                            <DropdownMenuItem>
                                <Button onClick={handleUpdateUserProfile} className="w-full h-full text-xs">Profile</Button>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Button onClick={() => handleLogOut()} type="submit" className="w-full h-full text-xs">Logout</Button>
                            </DropdownMenuItem>
                        </>
                    }
                        

                    { !user && 
                        <>
                            <DropdownMenuItem>
                                <Button onClick={() => setShowAuthFlow(true) } className="w-full h-full text-xs">Login/Register</Button>
                            </DropdownMenuItem>
                        </>
                    }

                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

export default MenuComponent