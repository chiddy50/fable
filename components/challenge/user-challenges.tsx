"use client"

import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import Challenge from '@/components/challenge/challenge'
import ConfirmStartChallenge from '@/components/challenge/confirm-start';
import axios from 'axios';
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from '@/components/ui/use-toast';
import { getCookie, deleteCookie } from 'cookies-next';
import { AppContext } from '@/context/StoryContext';
import axiosInterceptorInstance from '@/axiosInterceptorInstance';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Button } from '../ui/button';
import PaginationComponent from '../general/pagination-component';
import { scrollToTop } from '@/lib/helper';
  

const UserChallenges = () => {
    const router = useRouter();

    const [challengesData, setChallengesData] = useState([])
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [limit, setLimit] = useState(6)
    const [hasNextPage, setHasNextPage] = useState(false)
    const [hasPrevPage, setHasPrevPage] = useState(false)
    const [totalPages, setTotalPages] = useState(false)

    const [selectedChallenge, setSelectedChallenge] = useState(false)
    const { setUserLoggedIn } = useContext(AppContext)
    
    const promptStartChallenge = (challenge: any) => {
        console.log(challenge);

        const timeExpired = isDateTimePast(challenge.date, challenge.time)
        if (timeExpired) {
            toast({
                title: "Challenge expired",
                description: "Challenge expired",
            })
            return
        }

        setSelectedChallenge(challenge)
        router.push(`/user/start/${challenge.id}`)

        // const confirmStartModal = document.getElementById("confirm-start-modal");
        // if (confirmStartModal) {            
        //     confirmStartModal.style.display = "block";
        // }
    }

    function isDateTimePast(dateString: string, timeString: string) {
        // Parse the date and time strings
        const [year, month, day] = dateString.split("-");
        const [hours, minutes] = timeString.split(":");
        
        // Create a Date object for the input datetime
        const dateTime = new Date(year, month - 1, day, hours, minutes);
    
        // Get the current date and time
        const currentDate = new Date();
    
        // Compare the input datetime with the current datetime
        return currentDate.getTime() > dateTime.getTime();
    }

    useEffect(() => {
        fetchChallenges()
    }, [])

    const filterChallenges = (page: number) => {
        let set_next_page = currentPage + page
        setCurrentPage(set_next_page)
                   
        fetchChallenges(set_next_page)
    }

    const fetchChallenges = async (page = 1, filter:null|string = "active") => {        
        try {   
            setLoading(true)     
            scrollToTop()

            let params = {
                page: page,
                limit: limit,
                type: filter
            }

            let response = await axiosInterceptorInstance.get(`challenges/all`, {
                params: params
            })
            console.log(response);

            setChallengesData(response?.data?.challenges);
            setHasNextPage(response?.data?.hasNextPage)
            setHasPrevPage(response?.data?.hasPrevPage)
            setTotalPages(response?.data?.totalPages)            
            
        } catch (error) {
            console.log(error);            
            let message = error?.response?.data?.message
            
            if (message && message === 'jwt expired') {
                console.log(message);
                deleteCookie('token')
                localStorage.removeItem("user") 
                localStorage.removeItem("question") 
                setUserLoggedIn(false)
            }
        }finally{
            setLoading(false)         
        }
        
    }

    const buttonLabels = [1,2,3];

    return (
        <>        
            <div className="flex items-center justify-between mb-7 xs:flex-col sm:flex-col md:flex-row xs:gap-4 sm:gap-4" 
            style={{ marginTop: "5rem" }}>
                <h1 className='text-white xs:text-xl sm:text-2xl md:text-2xl lg:text-3xl xl:text-3xl  font-bold '>Choose Your Challenge</h1>
                <div className=" pr-3 bg-gray-50 border border-gray-300 rounded-lg">
                    <select id="countries" onChange={(e) => fetchChallenges(1, e.target.value)} className="border-none rounded-lg text-gray-900 text-xs block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white outline-none">
                        <option selected disabled>Filter</option>
                        <option value="all">All</option>
                        <option value="expired">Expired</option>
                        <option value="active">Active</option>
                    </select>
                </div>
            </div> 
            { 
            loading && 
            <div className='grid md:grid-cols-1 lg:grid-cols-3 gap-5'>
                {
                    buttonLabels.map((label, index) => (
                        <div key={index} className="flex flex-col space-y-3">
                            <Skeleton className="h-[420px] w-[full] rounded-xl" />                            
                        </div>
                    ))
                }

            </div>
            }

            {
                !loading && (
                    (challengesData.length < 1) &&
                    <div className='flex flex-col text-gray-200 items-center gap-3 justify-center'>
                        <i className="bx bx-data text-[6rem]"></i>
                        <p className='text-xs mb-2'>No Data</p>
                        <div onClick={() => fetchChallenges(1)} className="flex items-center gap-1 px-3 py-1 bg-white text-gray-800 rounded-xl cursor-pointer">
                            <span className='text-xs'>Refresh</span>
                            <i className='bx bx-refresh text-xl s cursor-pointer'></i>
                        </div>
                    </div>
                )
            }

            {
                !loading && (
                    (challengesData.length > 0) &&
                    <>
                        <Carousel
                        opts={{
                            align: "start",
                        }}
                        className="w-full"
                        >
                            <CarouselContent>
                                {   
                                    challengesData.map((challenge, index) => (
                                        <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">

                                        <Challenge 
                                        clickEvent={() => promptStartChallenge(challenge)} 
                                        challenge={challenge} 
                                        type="user"                                
                                        />
                                        </CarouselItem>

                                    ))
                                }

                            </CarouselContent>
                            <CarouselPrevious />
                            <CarouselNext />
                        </Carousel>

                        <PaginationComponent 
                            hasPrevPage={hasPrevPage} 
                            hasNextPage={hasNextPage} 
                            triggerPagination={filterChallenges} 
                            currentPage={currentPage} 
                            totalPages={totalPages}
                            textColor="text-black"
                            bgColor="bg-white"
                            descColor="text-white"
                        />
        
                    </>
                )
            }

            <ConfirmStartChallenge challenge={selectedChallenge}/>
        </>
    )
}

export default UserChallenges