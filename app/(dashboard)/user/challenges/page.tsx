"use client"

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Challenge from '@/components/challenge/challenge'
import ConfirmStart from '@/components/challenge/confirm-start';
import ConfirmStartChallenge from '@/components/challenge/confirm-start';
import UserChallenges from '@/components/challenge/user-challenges';
import { cn } from "@/lib/utils"


export default function ChallengesPage() {
    const count = [1,2,3,4,5];

    return (
        <div className='layout-width '>

            <div className=" mb-10" style={{ marginTop: "10rem" }}>
                <h1 className='xs:text-xl sm:text-xl md:text-xl lg:text-3xl xl:text-3xl text-center font-semibold '>Choose Your Challenge</h1>
            </div>
            <div className='bg-white rounded-2xl p-5 mb-40'>
                <UserChallenges />
            </div>
            
            <div className="grid gap-5 xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2">
                <div>
                    
                    <div className='bg-white rounded-2xl p-5 mb-10'>
                        <h1 className='font-semibold text-center text-lg mb-3 text-gray-600'>Rankings</h1>
                    
                        {
                            count.map((item, index) => (
                        
                                <div key={index} className={cn(
                                    "p-4 flex items-center gap-10 border rounded-xl mb-3",
                                    item == 1 ? "border-orange-400  border-2" : ""
                                    )}>
                                    <h2 className="font-bold text-4xl">#{item}</h2>

                                    <div className="flex items-center gap-2">
                                        <div className=" h-10 w-10 flex items-center justify-center bg-black rounded-full">
                                            <i className='bx bxs-user text-white text-xl'></i>
                                        </div>
                                        <h1>Jane Cooper</h1>
                                    </div>

                                    <h1 className='text-xs text-gray-400'>10 wins</h1>
                                </div>
                            ))
                        }
                    </div>
                </div>

                <div>
                    <div className='bg-white rounded-2xl p-5 mb-10'>
                        <h1 className='font-semibold text-center text-lg mb-3 text-gray-600'>Past 7 days Winners</h1>
                        <div className="p-4 flex items-center justify-between border rounded-xl">

                            <div className="flex items-center">
                                <h2 className="font-bold text-4xl mr-10">#1</h2>
                                <div className=" h-10 w-10 flex items-center justify-center bg-black rounded-full mr-2">
                                    <i className='bx bxs-user text-white text-xl'></i>
                                </div>
                                <h1>Jane Cooper</h1>
                            </div>

                            <h1 className='text-xs text-gray-400'>$2000</h1>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
