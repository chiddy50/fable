"use client"

import axiosInterceptorInstance from "@/axiosInterceptorInstance"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"

const MostWinsRanking = () => {
    const [userRankings, setUserRankings] = useState([])

    useEffect(() => {
        fetchUserRankings()
    }, [])
    const fetchUserRankings = async () => {        
        try {

            const response = await axiosInterceptorInstance.get(`user/ranking`)  
            console.log(response);
            
            let userRankings = response?.data?.users;
            if (userRankings) {
                const filteredUserRanking = userRankings.filter((item: any) => item._count.stories >= 1);

                filteredUserRanking.sort((a: any, b: any) => b._count.stories - a._count.stories);
                console.log({filteredUserRanking});

                setUserRankings(filteredUserRanking)
            }
        } catch (error) {
            console.log(error);
            
        }
    }
    
    return (
        <div>                   
            <div className='bg-[#232323] text-gray-300 rounded-2xl p-5 mb-10 border border-[#282828]'>
                <h1 className='font-semibold text-center mb-3 text-gray-300 text-2xl'>Rankings</h1>
            
                {
                    userRankings.map((user: any, index: number) => (
                
                        <div key={index} className={cn(
                            "p-4 flex items-center border border-[#282828] rounded-xl mb-3 xs:gap-4 sm:gap-10 xs:flex-col sm:flex-row",
                            index == 0 ? "border-orange-400  border-2" : ""
                            )}>
                            <h2 className="font-bold text-4xl">#{index+1}</h2>

                            <div className="flex items-center gap-2">
                                <div className=" h-10 w-10 flex items-center justify-center bg-black rounded-full">
                                    <i className='bx bxs-user text-white text-xl'></i>
                                </div>
                                <h1 className="capitalize">{user?.name}</h1>
                            </div>

                            <h1 className='text-xs '>{user?._count?.stories} {user?._count?.stories > 1 ? "wins" : "win"}</h1>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default MostWinsRanking