"use client"

import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';

import Challenge from '@/components/challenge/challenge'
import ConfirmStartChallenge from '@/components/challenge/confirm-start';
import { AppContext } from '@/context/StoryContext';

import { Skeleton } from "@/components/ui/skeleton"
import ChallengeSubmission from './challenge-submission';
import { getCookie } from 'cookies-next'; 
import axiosInterceptorInstance from '@/axiosInterceptorInstance';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"

const AdminChallenges = () => {
    const { push } = useRouter()
    const [challengesData, setChallengesData] = useState([])
    const [loading, setLoading] = useState(false)
    const [loadingSubmission, setLoadingSubmission] = useState(false)
    const [submissions, setSubmissions] = useState([])
    const { user } = useContext(AppContext)
    let token = getCookie('token');

    const clickEvent = () => {
        let sideNav = document.getElementById("submissions-modal")
        if (sideNav) {
            // sideNav.style.width = "40%";
            sideNav.style.display = "block";
        }        
    }
    const fetchSubmissions = async (challenge: object) => {
        clickEvent()
        console.log(challenge);
        try {            
            setLoadingSubmission(true)
            let res = await axiosInterceptorInstance.get(`/stories/all?challengeId=${challenge.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
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

    useEffect(() => {

        fetchChallenges();
    }, [])

    const fetchChallenges = async () => {
        const local_user = localStorage.getItem('user');
        let auth_user = local_user ? JSON.parse(local_user) : user;

        try {   
            setLoading(true)                     

            let response = await axiosInterceptorInstance.get(`/challenges`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(response);
            setChallengesData(response?.data?.challenges);
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

    const loaderCount = [1,2,3,4];

    return (
        <>
            { loading && <div className='grid grid-cols-4 gap-5'>
                {
                    loaderCount.map((label, index) => (
                        <div key={index} className="flex flex-col space-y-3">
                            <Skeleton className="h-[125px] w-[250px] rounded-xl" />
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-[250px]" />
                                <Skeleton className="h-4 w-[200px]" />
                            </div>
                        </div>
                    ))
                }

            </div>}
            
            {
                !loading && 
                // <div className='grid grid-cols-4 gap-5 mb-10'>
                //     {
                //         challengesData.map((challenge, index) => (

                //             <Challenge key={index} 
                //             clickEvent={() => fetchSubmissions(challenge)} 
                //             challenge={challenge} 
                //             type="admin"
                //             />
                //         ))
                //     }

                
                // </div>
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
            }

            <Pagination className='mt-7'>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious href="#" />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#">1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#" isActive>
                            2
                        </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#">3</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationNext href="#" />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>

            
            <div id="submissions-modal" className="sidenav-background">
                <div className="sidenav bg-gray-200 shadow-xl z-20 p-7">
                    <div onClick={hideModal} className="flex items-center gap-2 cursor-pointer">
                        <i className='bx bx-arrow-back text-2xl' ></i>
                        <p className='text-xs'>Back to your challenges</p>
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
                            <div className="flex flex-col text-center mt-10 justify-center">
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