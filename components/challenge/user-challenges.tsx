"use client"

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import axiosInterceptorInstance from '@/axiosInterceptorInstance';
import Challenge from '@/components/challenge/challenge'
import ConfirmStartChallenge from '@/components/challenge/confirm-start';
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from '@/components/ui/use-toast';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Button } from '@/components/ui/button';
import PaginationComponent from '@/components/general/pagination-component';
import { scrollToTop } from '@/lib/helper';
import { DatePickerWithRange } from '@/components/general/date-range-picker';
import { DateRange } from "react-day-picker"
import { addDays, format } from "date-fns"
  

const UserChallenges = () => {
    const router = useRouter();

    const [challengesData, setChallengesData] = useState([])
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [limit, setLimit] = useState(5)
    const [hasNextPage, setHasNextPage] = useState(false)
    const [hasPrevPage, setHasPrevPage] = useState(false)
    const [totalPages, setTotalPages] = useState(false)
    const [date, setDate] = useState<DateRange | undefined>({
        // from: new Date(2024, 0, 20),
        // to: addDays(new Date(2024, 0, 20), 20),
        from: undefined,
        to: undefined,
      })

    const [selectedChallenge, setSelectedChallenge] = useState(false)
    
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


    useEffect(() => {
        filterChallengesByDateRange(date)
    }, [date])

    const paginateChallenges = (page: number) => {
        let set_next_page = currentPage + page
        setCurrentPage(set_next_page)
                   
        fetchChallenges(set_next_page)
    }

    const filterChallengesByDateRange = (date: object|undefined) => {
        if (!date) {
            return
        }

        let { from, to } = date
        if (from && to) {
            console.log(date);
            // fetchChallenges()
        }
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

            // let { from, to } = date
            // if (from && to) {
            //     params  = { ...params, to, form}
            // }

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
        }finally{
            setLoading(false)         
        }
        
    }

    const filterChallenges = (value: string) => {
        setCurrentPage(1)
        fetchChallenges(1, value)
    }

    const loaders = [1,2,3];

    return (
        <>        
            <div className="flex items-center justify-between mb-7 xs:flex-col sm:flex-col md:flex-row xs:gap-4 sm:gap-4" 
            style={{ marginTop: "5rem" }}>
                <h1 className='text-white xs:text-xl sm:text-2xl md:text-2xl lg:text-3xl xl:text-3xl  font-bold '>Choose Your Challenge</h1>
            </div> 

            <div className="flex items-center justify-between mb-5 xs:flex-col sm:flex-col md:flex-row xs:gap-4 sm:gap-4">
                <div className=" pr-3 bg-white border border-gray-300 rounded-lg">
                    <select id="countries" 
                    defaultValue="default"
                    onChange={(e) => filterChallenges(e.target.value)} 
                    className="border-none bg-white rounded-lg text-gray-900 text-xs block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white outline-none">
                        <option value="default" disabled>Filter</option>
                        <option value="all">All</option>
                        <option value="expired">Expired</option>
                        <option value="active">Active</option>
                    </select>
                </div>

                <div className="flex items-center gap-2">
                    <Button className='bg-white text-black hover:text-white'>
                        <i className='bx bx-search text-xl'></i>
                    </Button>
                    <DatePickerWithRange date={date} setDate={setDate} />
                </div>

            </div>
            { 
            loading && 
            <div className='grid md:grid-cols-1 lg:grid-cols-3 gap-5'>
                {
                    loaders.map((label) => (
                        <div key={label} className="flex flex-col space-y-3">
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
                            triggerPagination={paginateChallenges} 
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