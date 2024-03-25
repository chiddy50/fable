"use client"

import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { getCookie } from 'cookies-next'; 

import { AppContext } from '@/context/StoryContext';

import Challenge from '@/components/challenge/challenge'
import ConfirmStartChallenge from '@/components/challenge/confirm-start';
import { Skeleton } from "@/components/ui/skeleton"
import PaginationComponent from '@/components/general/pagination-component';
import ChallengeSubmission from './challenge-submission';
import axiosInterceptorInstance from '@/axiosInterceptorInstance';

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"
  import { getAuthToken } from '@dynamic-labs/sdk-react-core';
import { scrollToTop } from '@/lib/helper';

const AdminChallenges = () => {
    const { push } = useRouter()
    const [challengesData, setChallengesData] = useState([])
    const [loading, setLoading] = useState(false)
    const [loadingSubmission, setLoadingSubmission] = useState(false)
    const [submissions, setSubmissions] = useState([])

    // PAGINATION STATES
    const [currentPage, setCurrentPage] = useState(1)
    const [limit, setLimit] = useState(6)
    const [hasNextPage, setHasNextPage] = useState(false)
    const [hasPrevPage, setHasPrevPage] = useState(false)
    const [totalPages, setTotalPages] = useState(false)

    const { user } = useContext(AppContext)
    let token = getCookie('token');
    const dynamicJwtToken = getAuthToken();

    const clickEvent = () => {
        let sideNav = document.getElementById("submissions-modal")
        if (sideNav) {
            // sideNav.style.width = "40%";
            sideNav.style.display = "block";
        }        
    }

    useEffect(() => {
        fetchChallenges()
    }, [dynamicJwtToken])

    const fetchSubmissions = async (challenge: object) => {
        clickEvent()
        console.log(challenge);
        scrollToTop()
        try {            
            setLoadingSubmission(true)
            let res = await axiosInterceptorInstance.get(`/stories/all?challengeId=${challenge.id}`, {
                headers: {
                    Authorization: `Bearer ${dynamicJwtToken}`
                }
            })
            setSubmissions(res?.data?.stories)
            console.log(res);
        } catch (error) {
            console.log(error);
            
        }finally {
            setLoadingSubmission(false)
        }        
    }

    const hideModal = () => {
        let sideNav = document.getElementById("submissions-modal")
        if (sideNav) {
            sideNav.style.display = "none";
            // sideNav.style.width = "0";
        }        
    }

    const filterChallenges = (page: number) => {
        let set_next_page = currentPage + page
        setCurrentPage(set_next_page)
                   
        fetchChallenges(set_next_page)
    }

    const fetchChallenges = async (page = 1) => {
        
        try {   
            setLoading(true)                     

            let response = await axiosInterceptorInstance.get(`/challenges`, {
                params: {
                    page: page,
                    limit: limit
                },
                headers: {
                    Authorization: `Bearer ${dynamicJwtToken}`
                }
            });
            console.log(response);
            setChallengesData(response?.data?.challenges);
            setHasNextPage(response?.data?.hasNextPage)
            setHasPrevPage(response?.data?.hasPrevPage)
            setTotalPages(response?.data?.totalPages)  

        } catch (error) {
            console.log(error);            
        }finally{
            setLoading(false)         
        }
    }

    const moveToSummary = (challenge: any) => {
        push(`/admin/summary/${challenge.id}`)
        hideModal()
    }

    const loaderCount = [1,2,3];

    return (
        <>
            { 
            loading && 
            <div className='grid md:grid-cols-1 lg:grid-cols-3 gap-5'>
                {
                    loaderCount.map((label, index) => (
                        <div key={index} className="flex flex-col space-y-3">
                            <Skeleton className="h-[420px] w-[full] rounded-xl" />
                        </div>
                    ))
                }

            </div>
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

                                            <Challenge key={index} 
                                            clickEvent={() => fetchSubmissions(challenge)} 
                                            challenge={challenge} 
                                            type="admin"
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

            {
                !loading && (
                    (challengesData.length < 1) &&
                    <div className='flex flex-col text-white items-center gap-3 justify-center'>
                        <i className="bx bx-data text-[6rem]"></i>
                        <p className='text-xs '>No challenge created yet...</p>
                    </div>
                )
            }
            
            <div id="submissions-modal" className="sidenav-background">
                <div className="sidenav bg-[#151515] text-gray-200 shadow-xl z-20 p-7 xs:w-[100%] sm:w-[95%] md:w-[70%] lg:w-[40%]">
                    <div onClick={hideModal} className="flex items-center gap-2 cursor-pointer">
                        <i className='bx bx-arrow-back text-2xl' ></i>
                        <p className='text-xs'>Back</p>
                    </div>
                    <h1 className="text-2xl text-center font-bold my-5">Submissions</h1>
                    <div className="">                        

                        {
                            loadingSubmission && 
                            <div>
                                {
                                    loaderCount.map((item, index) => (
                                        <div key={index} className="flex items-center space-x-4 mb-4">
                                            <div className="space-y-2 w-full">
                                                <Skeleton className="h-16 w-full bg-white" />
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                            
                        }

                        {   (submissions.length < 1 && !loadingSubmission)  &&
                            <div className="flex flex-col text-center mt-10 justify-center bg-gray-800 p-5 rounded-xl">
                                <i className='bx bxs-user-x text-6xl'></i>
                                <p className="text-center text-xs font-semibold">No submissions yet</p>
                            </div>
                        }

                        {
                            (!loadingSubmission) &&
                            <div>
                                {
                                    submissions.map((submission, index) => (
                                        <ChallengeSubmission key={index} submission={submission} moveToSummary={moveToSummary} />

                                    ))
                                }
                            </div>
                        }


                    </div>

                </div>

            </div>


                    
            

        </>
    )
}

export default AdminChallenges