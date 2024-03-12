"use client"

import { cn } from "@/lib/utils"
import { Bangers } from "next/font/google";
import MenuComponent from "@/components/menu/menu-component";
import { Button } from "@/components/ui/button";
import GeneralMenuComponent from "@/components/menu/general-menu-component";
import { useContext } from "react";
import { AppContext } from "@/context/StoryContext";
import MobileMenuComponent from "@/components/menu/mobile-menu-component";
import CountdownComponent from "@/components/general/countdown-component";
import { usePathname } from "next/navigation";

const bangers = Bangers({
    subsets: ["latin"],
    weight: ["400"]
})

const NavbarComponent = () => {
    const { userLoggedIn, selectedChallenge } = useContext(AppContext)

    const pathname = usePathname();
    console.log(pathname);
    
    const challengeMenu = [ 
        { label: "Create Challenge", href: "/admin/challenge/create", show: true } ,
        { label: "My Challenges", href: "/admin/challenges", show: userLoggedIn ? true : false }, 
    ];
    
    const storyMenu = [ 
        { label: "Tell a Story", href: "/user/challenges", show: true } ,
        { label: "My Stories", href: "/user/stories", show: userLoggedIn ? true : false }, 
    ];

    function checkURL(url: string) {
        return url.startsWith("/user/start");
    }


    return (
        <div style={{ height: "80px" }} className="
        flex items-center gap-5 w-full py-2 bg-gray-50 px-7 fixed top-0 z-10
        xs:justify-between sm:justify-between md:justify-between lg:justify-between xl:justify-between 2xl:justify-between
        ">
            

            {
                !checkURL(pathname) &&
                <div>
                    {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 53.479 46.509" width="53.479" height="46.509">
                        <rect fill="#333" fill-opacity="0" stroke-width="2" x="0" y="0" width="53.479" height="46.509" className="image-rect"/>

                        <svg x="0" y="0" width="53.479" height="46.509" className="image-svg-svg primary" style={{overflow: "visible"}}>
                            <path fill="#aaa" d="M0 0l26.365 46.509 6.639-11.472L13.184 0H0z"/>
                            <path fill="#999" opacity="0.8" d="M0 0h53.479l-6.638 11.472H6.638L0 0z"/>
                            <path fill="#999" opacity="0.8" d="M7.211 15.933h38.057l-6.639 11.472H13.85L7.211 15.933z"/>
                        </svg>
                    </svg> */}
                    {/* <g className="iconsvg-imagesvg" transform="translate(0,0)"><g><rect fill="#333" fill-opacity="0" stroke-width="2" x="0" y="0" width="60" height="59.72823652381663" className="image-rect"></rect> <svg x="0" y="0" width="45" height="59.72823652381663" filtersec="colorsb9369026410" className="image-svg-svg primary" style={{overflow: "visible"}}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0.00651046447455883 0.009852190501987934 100.47256469726562 100.01704406738281"><path d="M17.14 87.69L45.2 29.56a21.75 21.75 0 0 1 19.57-12.24h23.07a50 50 0 1 0-70.7 70.37z" fill="#999"></path><path d="M100 17.32a13.62 13.62 0 0 1-13.62 13.62H66.7a13.66 13.66 0 0 0-12.3 7.69l-3.18 6.54-6.58 13.61-17.25 35.83a50 50 0 0 0 69.33-62.46c2.5-2.87 4.78-7.61 3.28-14.83zM80.94 45.17a13.61 13.61 0 0 1-13.62 13.61H48.39L55 45.17z" fill="#aaa"></path></svg></svg> </g></g> */}

                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 298.380615234375 235.0001983642578" width="45" height="47.25525714735764">
                        <title>资源 72</title>
                        <g fillRule="evenodd">
                            <path d="M89.05 0h199.33a10 10 0 0 1 9.39 13.44l-19 52a10 10 0 0 1-9.44 6.56H70a10 10 0 0 1-9.39-13.44l19-52A10 10 0 0 1 89.05 0z" fill="#555"></path>
                            <path d="M60.05 80h129.09a10 10 0 0 1 9.39 13.44l-19.05 52a10 10 0 0 1-9.39 6.56H41a10 10 0 0 1-9.39-13.44l19-52A10 10 0 0 1 60.05 80z" fill="#999"></path>
                            <path d="M29.05 163h59.13a10 10 0 0 1 10 10 9.86 9.86 0 0 1-.61 3.44l-19 52a10 10 0 0 1-9.43 6.56H10a10 10 0 0 1-9.39-13.44l19.05-52a10 10 0 0 1 9.39-6.56z" fill="#ccc"></path>
                        </g>
                    </svg>
                </div>
            }


            {
                (selectedChallenge && checkURL(pathname)) && 
                <div className="flex items-center gap-5">
                    <img src={selectedChallenge.image} alt={selectedChallenge.title} className="h-10 w-10 rounded-full cursor-pointer" />

                    <p className="text-xs">
                        <CountdownComponent date={`${selectedChallenge?.date} ${selectedChallenge?.time}`}/> 
                    </p>
                    

                </div>
            }

            <div className="flex items-center justify-center gap-5 xs:hidden sm:hidden md:flex lg:flex xl:flex 2xl:flex">
                <GeneralMenuComponent label="CHALLENGE" options={challengeMenu} />
                <GeneralMenuComponent label="STORY" options={storyMenu} />                            
                <MenuComponent />
            </div>

            <div className="xs:block sm:block md:hidden lg:hidden xl:hidden 2xl:hidden">
                <MobileMenuComponent/>
            </div>

        </div>
    )
}

export default NavbarComponent

