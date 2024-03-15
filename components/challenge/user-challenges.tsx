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
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
  

const UserChallenges = () => {
    const router = useRouter();

    const [challengesData, setChallengesData] = useState([])
    const [loading, setLoading] = useState(false)
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

    const fetchChallenges = async () => {        
        try {   
            setLoading(true)      
                        
            let response = await axiosInterceptorInstance.get(`challenges/all`)
            console.log(response);
            
            setChallengesData(response?.data?.challenges.slice(0, 6));
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
            { 
            loading && 
            <div className='grid md:grid-cols-1 lg:grid-cols-3 gap-5'>
                {
                    buttonLabels.map((label, index) => (
                        <div key={index} className="flex flex-col space-y-3">
                            <Skeleton className="h-[300px] w-[full] rounded-xl" />
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-[250px]" />
                                <Skeleton className="h-4 w-[200px]" />
                            </div>
                        </div>
                    ))
                }

            </div>
            }

            {
                !loading && (
                    (challengesData.length < 1) &&
                    <div className='flex flex-col text-white items-center gap-3 justify-center'>
                        <i className="bx bx-data text-[6rem]"></i>
                        <p className='text-xs '>No challenge created yet...</p>
                    </div>
                )
            }

            {
                !loading && 
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
                    <div className='mt-5'>
                        <Pagination>
                            <PaginationContent>
                                <PaginationItem className='bg-white rounded-md'>
                                    <PaginationPrevious href="#" />
                                </PaginationItem>
                                                              
                                <PaginationItem className='bg-white rounded-md'>
                                    <PaginationNext href="#" />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </div>
                </>
            }

            <ConfirmStartChallenge challenge={selectedChallenge}/>
        </>
    )
}

export default UserChallenges