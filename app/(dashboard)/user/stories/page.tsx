"use client"

import { AppContext } from "@/context/StoryContext";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton"
import UserStory from "@/components/challenge/user-story";
import { transferToUsers } from "@/lib/transferToUsers";
import { getCookie } from 'cookies-next';
import axiosInterceptorInstance from "@/axiosInterceptorInstance";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import UserSubmissionSummary from "@/components/modal/user-submission-summary";

const UserStories = () => {
    const { user } = useContext(AppContext)
    const [loading, setLoading] = useState(false)
    const [stories, setStories] = useState([])
    const [selectedStory, setSelectedStory] = useState(null)
    let token = getCookie('token');

    useEffect(() => {        
        getUserStories();

    }, [])

    const getUserStories = async () => {

        try {   
            setLoading(true)         
            const response = await axiosInterceptorInstance.get(`/stories`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log(response);
            setStories(response?.data?.stories);
        } catch (error) {
            console.log(error);            
        }finally{
            setLoading(false)         
        }
    }

    const viewStory = (story) => {

        setSelectedStory(story)
        // console.log(story);
        document.getElementById('submission-summary-modal').style.display = 'block'
        // await transferToUsers("7GbRUuFSD1idrwJgWqhBExrB7aSKrVgkKWYx6sb9fm2u", 0.2)
    }
    
    const loaderCount = [1,2,3];

    return (
        <div className='layout-width '>
            <div className="py-10 ">
                <h1 className='text-white xs:text-lg sm:text-lg md:text-3xl text-center mb-7 font-bold'>Here are your stories:</h1>
                
                <>
                { loading && <div className=''>
                    {
                        loaderCount.map((label, index) => (
                            <div key={index} className="flex flex-col mb-3 space-y-3">
                                <Skeleton className="h-[120px] w-[full] rounded-xl" />
                            </div>
                        ))
                    }

                    </div>
                }

                {
                    !loading && 
                    <div className='gap-5'>
                        {
                            stories.map((story, index) => (
                                <UserStory key={index} story={story} clickEvent={() => viewStory(story)} />
                            ))
                        }
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

                        <UserSubmissionSummary selectedStory={selectedStory}/>
                    </div>
                }
                </>

            </div>

        </div>
    )
}

export default UserStories