"use client"

import { AppContext } from "@/context/StoryContext";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton"
import UserStory from "@/components/challenge/user-story";
import { transferToUsers } from "@/lib/transferToUsers";

const UserStories = () => {
    const { user } = useContext(AppContext)
    const [loading, setLoading] = useState(false)
    const [stories, setStories] = useState([])

    useEffect(() => {
        const fetchUserStories = async () => {
            await getUserStories();
        };

        fetchUserStories();
    }, [])

    const getUserStories = async () => {
        const local_user = localStorage.getItem('user');
        let auth_user = local_user ? JSON.parse(local_user) : user;

        try {   
            setLoading(true)         
            const response = await axios.get(`/api/auth/admin/user-stories/${auth_user.id}`)
            console.log(response?.data?.data);
            setStories(response?.data?.data);
        } catch (error) {
            console.log(error);            
        }finally{
            setLoading(false)         
        }
    }

    const viewStory = async (story) => {
        console.log(story);
        
        await transferToUsers("7GbRUuFSD1idrwJgWqhBExrB7aSKrVgkKWYx6sb9fm2u", 0.2)
    }
    
    const loaderCount = [1,2,3,4,5,6];

    return (
        <div className='layout-width '>
            <div className="p-10">
                <h1 className='text-3xl text-center mb-7 font-bold'>Here are your stories:</h1>
                
                <>
                { loading && <div className=''>
                    {
                        loaderCount.map((label, index) => (
                            <div key={index} className="flex flex-col mb-3 space-y-3">
                                <Skeleton className="h-[80px] w-[full] rounded-xl" />
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
                                <UserStory key={index} clickEvent={() => viewStory(story)} />
                            ))
                        }
                    
                    </div>
                }
                </>

            </div>

        </div>
    )
}

export default UserStories