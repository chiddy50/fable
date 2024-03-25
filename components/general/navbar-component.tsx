"use client"

import { cn } from "@/lib/utils"
import { Bangers } from "next/font/google";
import MenuComponent from "@/components/menu/menu-component";
import { Button } from "@/components/ui/button";
import GeneralMenuComponent from "@/components/menu/general-menu-component";
import { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "@/context/StoryContext";
import MobileMenuComponent from "@/components/menu/mobile-menu-component";
import CountdownComponent from "@/components/general/countdown-component";
import { usePathname } from "next/navigation";
import { useRouter } from 'next/navigation';
import { useDynamicContext } from "@dynamic-labs/sdk-react-core"
import { DynamicWidget, getAuthToken, useEmbeddedWallet, useUserWallets, useUserUpdateRequest } from '@dynamic-labs/sdk-react-core';
import { toast } from "@/components/ui/use-toast";
import Link from "next/link";

const bangers = Bangers({
    subsets: ["latin"],
    weight: ["400"]
})

const NavbarComponent = () => {
    const [hasEmbeddedWallet, setHasEmbeddedWallet] = useState(false)
    const copyTextRef = useRef(null);

    const { userLoggedIn, selectedChallenge } = useContext(AppContext)
    const { push } = useRouter();
    const { user, primaryWallet, setShowAuthFlow, setShowDynamicUserProfile } = useDynamicContext()
    const { updateUserWithModal,  } = useUserUpdateRequest();

    const { userHasEmbeddedWallet } = useEmbeddedWallet();
    const userWallets = useUserWallets();


    useEffect(() => {
        console.log({primaryWallet});
        
        if (user && primaryWallet) {
          console.log("The authenticated user has a connected wallet.");
          if (primaryWallet.connector?.isEmbeddedWallet) {
            console.log("The user's wallet is an embedded wallet.");
          } else {
            console.log("The user's wallet is not an embedded wallet.");
          }
        } else if (!user) {
          console.log("No authenticated user found.");
        } else {
            setHasEmbeddedWallet(false)
            console.log("The authenticated user does not have a connected wallet.");
        }
    }, [])

    
    const pathname = usePathname();

    const dynamicJwtToken = getAuthToken();
    
    const challengeMenu = [ 
        { label: "Create Challenge", href: "/admin/challenge/create", show: true } ,
        { label: "My Challenges", href: "/admin/challenges", show: user ? true : false }, 
    ];
    
    const storyMenu = [ 
        { label: "Tell a Story", href: "/user/challenges", show: true } ,
        { label: "My Stories", href: "/user/stories", show: user ? true : false }, 
    ];

    function checkURL(url: string) {
        return url.startsWith("/user/start");
    }

    const copyToClipboard = () => {
        let address:string = primaryWallet?.address;
        if (address) {            
            navigator.clipboard.writeText(address);
            toast({
                description: "Wallet address copied!",
                className: cn(
                    'top-20 right-0 flex fixed md:max-w-[420px] md:top-20 md:right-4'
                ),
            })
        }
        
      };

    const bringUpDynamicUserProfile = () => {
        setShowDynamicUserProfile(true)
    }

    function truncateString(inputString: string) {
        if (inputString.length <= 8) {
            return inputString; // If the string is already 8 characters or less, return it unchanged
        } else {
            const truncatedString = inputString.slice(0, 4) + '...' + inputString.slice(-4);
            return truncatedString;
        }
    }

    return (
        <div style={{ height: "80px" }} className="
        flex items-center gap-5 w-full py-2 bg-[#1b1c1d] px-7 fixed top-0 z-10
        xs:justify-between sm:justify-between md:justify-between lg:justify-between xl:justify-between 2xl:justify-between
        ">
            

            {
                !checkURL(pathname) &&
                <div>
                    <Link href="/" >
                        <svg className="cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 298.380615234375 235.0001983642578" width="45" height="47.25525714735764">
                            <title>Fable</title>
                            <g fillRule="evenodd">
                                <path d="M89.05 0h199.33a10 10 0 0 1 9.39 13.44l-19 52a10 10 0 0 1-9.44 6.56H70a10 10 0 0 1-9.39-13.44l19-52A10 10 0 0 1 89.05 0z" fill="#555"></path>
                                <path d="M60.05 80h129.09a10 10 0 0 1 9.39 13.44l-19.05 52a10 10 0 0 1-9.39 6.56H41a10 10 0 0 1-9.39-13.44l19-52A10 10 0 0 1 60.05 80z" fill="#999"></path>
                                <path d="M29.05 163h59.13a10 10 0 0 1 10 10 9.86 9.86 0 0 1-.61 3.44l-19 52a10 10 0 0 1-9.43 6.56H10a10 10 0 0 1-9.39-13.44l19.05-52a10 10 0 0 1 9.39-6.56z" fill="#ccc"></path>
                            </g>
                        </svg>
                    </Link>
                </div>
            }


            {
                (selectedChallenge && checkURL(pathname)) && 
                <div className="flex items-center gap-5">
                    <img src={selectedChallenge.image} alt={selectedChallenge.title} className="h-10 w-10 rounded-full cursor-pointer" />

                    {/* <p className="text-xs">
                        <CountdownComponent date={`${selectedChallenge?.date}`}/> 
                    </p> */}
                    

                </div>
            }

            <div className="flex items-center justify-center gap-5 xs:hidden sm:hidden md:flex lg:flex xl:flex 2xl:flex">

                <GeneralMenuComponent label="CHALLENGE" options={challengeMenu} />
                <GeneralMenuComponent label="STORY" options={storyMenu} />                            
                {primaryWallet && <div className="flex items-center bg-white py-2 px-3  gap-2 rounded-3xl">
                    <div className=" cursor-pointer  h-5 w-5 rounded-full flex items-center justify-center">
                        <img src="/images/solana-sol-logo.svg" alt="" />
                    </div>
                    <div onClick={copyToClipboard} className="border cursor-pointer border-gray-700 h-6 w-6 rounded-full flex items-center justify-center hover:bg-gray-700 hover:text-white hover:border-white">
                        <i className='bx bx-copy text-xs'></i>
                    </div>
                    <p className="text-[9px]" ref={copyTextRef} id="primary-wallet-address">
                        {truncateString(primaryWallet?.address)}
                    </p>
                    <div onClick={bringUpDynamicUserProfile} className="border cursor-pointer border-gray-700 h-6 w-6 rounded-full flex items-center justify-center hover:bg-gray-700 hover:text-white hover:border-white">
                        <i className="bx bx-user text-xs"></i>
                    </div>

                </div>}
                <div className=" hidden">
                    <DynamicWidget />
                </div>
                <MenuComponent />
            </div>

            <div className="items-center xs:flex sm:flex md:hidden lg:hidden xl:hidden 2xl:hidden">
                {primaryWallet && <div className="flex items-center bg-white py-2 px-3  gap-2 rounded-3xl">
                    <div className=" cursor-pointer  h-5 w-5 rounded-full flex items-center justify-center">
                        <img src="/images/solana-sol-logo.svg" alt="" />
                    </div>
                    <div onClick={copyToClipboard} className="border cursor-pointer border-gray-700 h-6 w-6 rounded-full flex items-center justify-center hover:bg-gray-700 hover:text-white hover:border-white">
                        <i className='bx bx-copy text-xs'></i>
                    </div>
                    <p className="text-[9px]" ref={copyTextRef} id="primary-wallet-address">
                        {truncateString(primaryWallet?.address)}
                    </p>
                    <div onClick={bringUpDynamicUserProfile} className="border cursor-pointer border-gray-700 h-6 w-6 rounded-full flex items-center justify-center hover:bg-gray-700 hover:text-white hover:border-white">
                        <i className="bx bx-user text-xs"></i>
                    </div>

                </div>}
                <MobileMenuComponent/>
            </div>

        </div>
    )
}

export default NavbarComponent

