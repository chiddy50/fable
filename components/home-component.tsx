"use client";
import { Button } from "@/components/ui/button"

import { useRouter } from 'next/navigation';
import { Bangers } from "next/font/google"
import { cn } from "@/lib/utils"

const bangers = Bangers({
    subsets: ["latin"],
    weight: ["400"]
})

export default function HomeComponent() {
    const { push } = useRouter();

    const moveToOptions = () => {
        push('/options')
    }

    const navigateToChooseChallengePage = () => {
        push('/user/challenges')
    }

    const navigateToCreateChallengePage = () => {
        push('/admin/challenge/create')
    }

    return (
        <div className="space-y-6 text-center">
            <h1 className={cn(
                "welcome__txt text-black xs:text-[7rem] sm:text-[7rem] md:text-[8rem]",
                bangers.className
            )}>
            FABLE
            </h1>
            <p className="text-gray-800 font-bold xs:text-sm sm:text-sm md:text-lg">
                {/* It&apos;s all about evoking the art of storytelling and the power of imagination */}
                Empowering Storytellers with cNFT's
            </p>


            {/* <div>
            
            <Button onClick={moveToOptions} variant="default" size="lg">
                Let&apos;s go!
            </Button>
            </div> */}

            

            <div className="flex mt-7 flex-col items-center justify-center">

                
                <div className='text-center mb-5'>
                    <p className='text-sm text-gray-800'>Select how you want to participate</p>
                </div>
                <div>
                    <button onClick={navigateToChooseChallengePage} className="font-semibold text-sm shadow-sm rounded-2xl outline-none w-full bg-gray-700 text-white text-center py-3 px-4 hover:bg-slate-500 mb-3">
                        Tell a story
                    </button>

                    <button onClick={navigateToCreateChallengePage} className="font-semibold shadow-sm text-sm rounded-2xl outline-none w-full bg-gray-700 text-white text-center py-3 px-4 hover:bg-slate-500">
                        Add a Challenge
                    </button>
                </div>


            </div>



        </div>
    )
}