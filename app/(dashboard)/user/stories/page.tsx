"use client"

import { AppContext } from "@/context/StoryContext";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton"
import UserStory from "@/components/story/user-story";
import { transferToUsers } from "@/lib/transferToUsers";
import { getCookie } from 'cookies-next';
import axiosInterceptorInstance from "@/axiosInterceptorInstance";

import UserSubmissionSummary from "@/components/modal/user-submission-summary";
import { getAuthToken } from '@dynamic-labs/sdk-react-core';
import PaginationComponent from "@/components/general/pagination-component";
import { scrollToTop } from "@/lib/helper";
import StoryAwardLegendComponent from "@/components/story/story-award-legend-component";

const UserStories = () => {
    const [loading, setLoading] = useState(false)
    const [stories, setStories] = useState([])

    // PAGINATION STATES
    const [currentPage, setCurrentPage] = useState(1)
    const [limit, setLimit] = useState(5)
    const [hasNextPage, setHasNextPage] = useState(false)
    const [hasPrevPage, setHasPrevPage] = useState(false)
    const [totalPages, setTotalPages] = useState(false)

    const { user } = useContext(AppContext)
    const [selectedStory, setSelectedStory] = useState(null)
    let token = getCookie('token');
    const dynamicJwtToken = getAuthToken();

    useEffect(() => {        
        getUserStories();

    }, [])

    const filterChallenges = (page: number) => {
        let set_next_page = currentPage + page
        setCurrentPage(set_next_page)
                   
        getUserStories(set_next_page)
    }

    const getUserStories = async (page = 1) => {

        try {   
            scrollToTop()

            setLoading(true)         
            const response = await axiosInterceptorInstance.get(`/stories`, {
                params: {
                    page: page,
                    limit: limit
                },
                headers: {
                    Authorization: `Bearer ${dynamicJwtToken}`
                }
            })
            console.log(response);
            setStories(response?.data?.stories);
            setHasNextPage(response?.data?.hasNextPage)
            setHasPrevPage(response?.data?.hasPrevPage)
            setTotalPages(response?.data?.totalPages)   

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
                <h1 className='text-white xs:text-lg sm:text-lg md:text-3xl mb-4 font-bold'>Here are your stories:</h1>

                <div className="mb-7 bg-[#0c0d0f] py-3 px-5 rounded-xl grid 
                xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-4
                xs:gap-4 sm:gap-4 md:gap-4
                ">                    
                    <StoryAwardLegendComponent iconBgColor="text-yellow-600" icon="bx bxs-medal" label="First Place" />
                    <StoryAwardLegendComponent iconBgColor="text-gray-900" icon="bx bxs-medal" label="Second Place" />
                    <StoryAwardLegendComponent iconBgColor="text-orange-600" icon="bx bxs-medal" label="Third Place" />
                    <StoryAwardLegendComponent iconBgColor="text-yellow-500" icon="bx bxs-star" label="Honorable Mention" />
                </div>
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
                !loading && (
                    (stories.length < 1) &&
                        <div className='flex flex-col text-white items-center gap-3 justify-center'>
                            <i className="bx bx-data text-[6rem]"></i>
                            <p className='text-xs '>No stories created yet...</p>
                        </div>
                    )
                }

                {
                    !loading && (
                        (stories.length > 0) &&
                        <div className='gap-5 p-5 bg-[#0c0d0f] rounded-xl'>
                            {
                                stories.map((story, index) => (
                                    <UserStory key={index} story={story} clickEvent={() => viewStory(story)} />
                                ))
                            }
                            <PaginationComponent 
                                hasPrevPage={hasPrevPage} 
                                hasNextPage={hasNextPage} 
                                triggerPagination={filterChallenges} 
                                currentPage={currentPage} 
                                totalPages={totalPages}
                                textColor="text-white"
                                bgColor="bg-black"
                                descColor="text-gray-200"
                            />

                            <UserSubmissionSummary selectedStory={selectedStory}/>
                        </div>

                    )
                }
                </>

            </div>

        </div>
    )
}

export default UserStories