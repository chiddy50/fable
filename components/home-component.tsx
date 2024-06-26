"use client";
import { Button } from "@/components/ui/button"

import { useRouter } from 'next/navigation';
import { Bangers } from "next/font/google"
import { cn } from "@/lib/utils"
import Link from "next/link";

const bangers = Bangers({
    subsets: ["latin"],
    weight: ["400"]
})

export default function HomeComponent() {
    const { push } = useRouter();

    return (
        <div className="space-y-6 text-center flex flex-col items-center justify-center">
            {/* <h1 className={cn(
                "welcome__txt text-white xs:text-[7rem] sm:text-[7rem] md:text-[8rem]",
                bangers.className
            )}>
            FABLE
            </h1> */}
            <img src="/images/fable_transp.svg" alt="logo" className="xs:w-[60%] sm:w-[75%] md:w-[90%]" />
            <p style={{ margin: "0 0 2rem" }} className="text-white tracking-wider mt-0 font-bold xs:text-sm sm:text-sm md:text-md">
                {/* It&apos;s all about evoking the art of storytelling and the power of imagination */}
                {/* Empowering Storytellers with cNFT's */}
                Write better stories faster..
            </p>


            {/* <div>
            
            <Button onClick={moveToOptions} variant="default" size="lg">
                Let&apos;s go!
            </Button>
            </div> */}

            

            <div className="flex mt-7 w-full flex-col items-center justify-center">

                
                {/* <div className='text-center mb-5'>
                    <p className='text-sm text-white'>Select how you want to participate</p>
                </div> */}
                <div  className="flex flex-col w-full gap-2 px-5">   
                    <Link href="user/challenges" className="w-full bg-white rounded-lg">
                        <Button className="bg-white text-black w-full hover:text-white">
                            Take a Challenge
                        </Button>           
                    </Link>
                    <Link href="admin/challenge/create" className="w-full bg-white rounded-lg">
                        <Button className="bg-white text-black w-full hover:text-white">Add a Challenge</Button>           
                    </Link>

                    {/* <div onClick={navigateToChooseChallengePage} className="mb-3 cursor-pointer group mt-20 sm:mt-0 rounded-full flex space-x-1 bg-white shadow-sm ring-1 ring-gray-900/5 text-black text-sm font-medium px-10 py-2 hover:shadow-lg active:shadow-sm transition-all">
                        <p>Tell a story</p>
                        <div className="group relative flex items-center">
                            <svg className="h-4 w-4 absolute transition-all group-hover:translate-x-1 group-hover:opacity-0" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" width="16" height="16"><path fill-rule="evenodd" d="M6.22 3.22a.75.75 0 011.06 0l4.25 4.25a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 01-1.06-1.06L9.94 8 6.22 4.28a.75.75 0 010-1.06z"></path></svg>
                            <svg className="h-4 w-4 absolute opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" width="16" height="16"><path fill-rule="evenodd" d="M8.22 2.97a.75.75 0 011.06 0l4.25 4.25a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 01-1.06-1.06l2.97-2.97H3.75a.75.75 0 010-1.5h7.44L8.22 4.03a.75.75 0 010-1.06z"></path></svg>
                        </div>
                    </div>

                    <div onClick={navigateToChooseChallengePage} className="group cursor-pointer mt-20 sm:mt-0 rounded-full flex space-x-1 bg-white shadow-sm ring-1 ring-gray-900/5 text-black text-sm font-medium px-10 py-2 hover:shadow-lg active:shadow-sm transition-all">
                        <p>Add a Challenge</p>
                        <div className="group relative flex items-center">
                            <svg className="h-4 w-4 absolute transition-all group-hover:translate-x-1 group-hover:opacity-0" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" width="16" height="16"><path fill-rule="evenodd" d="M6.22 3.22a.75.75 0 011.06 0l4.25 4.25a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 01-1.06-1.06L9.94 8 6.22 4.28a.75.75 0 010-1.06z"></path></svg>
                            <svg className="h-4 w-4 absolute opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" width="16" height="16"><path fill-rule="evenodd" d="M8.22 2.97a.75.75 0 011.06 0l4.25 4.25a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 01-1.06-1.06l2.97-2.97H3.75a.75.75 0 010-1.5h7.44L8.22 4.03a.75.75 0 010-1.06z"></path></svg>
                        </div>
                    </div> */}
                </div>


            </div>



        </div>
    )
}