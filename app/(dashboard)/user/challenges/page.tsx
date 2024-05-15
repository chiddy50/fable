"use client"

import UserChallenges from '@/components/challenge/user-challenges';
import MostWinsRanking from '@/components/rankings/most-wins-ranking';


export default function ChallengesPage() {

    return (
        <div className='layout-width '>

            <div className=' rounded-2xl p-5 mb-40'>
                <UserChallenges />
            </div>
            
            <div className="grid gap-5 xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2">
                <MostWinsRanking/>

                <div>
                    <div className='bg-[#232323] text-gray-300 rounded-2xl p-5 mb-10 border border-[#282828]'>
                        <h1 className='font-semibold text-center text-lg mb-3 text-gray-300'>Past 7 days Winners</h1>
                        <div className="p-4 flex items-center justify-between border rounded-xl xs:gap-4 sm:gap-4 xs:flex-col sm:flex-row border-[#282828]">

                            <div className="flex items-center xs:gap-4 sm:gap-4 xs:flex-col sm:flex-row">
                                <h2 className="font-bold text-4xl mr-10">#1</h2>
                                <div className=" h-10 w-10 flex items-center justify-center bg-black rounded-full mr-2">
                                    <i className='bx bxs-user text-white text-xl'></i>
                                </div>
                                <h1>Jane Cooper</h1>
                            </div>

                            <h1 className='text-xs '>$2000</h1>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
