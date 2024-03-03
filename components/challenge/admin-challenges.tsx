"use client"

import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';

import Challenge from '@/components/challenge/challenge'
import ConfirmStartChallenge from '@/components/challenge/confirm-start';
import { AppContext } from '@/context/StoryContext';

import { Skeleton } from "@/components/ui/skeleton"
import ChallengeSubmission from './challenge-submission';


const AdminChallenges = () => {
    const { push } = useRouter()
    const [challengesData, setChallengesData] = useState([])
    const [loading, setLoading] = useState(false)
    const [loadingSubmission, setLoadingSubmission] = useState(false)
    const [submissions, setSubmissions] = useState([])
    const { user } = useContext(AppContext)
    
    const clickEvent = () => {
        let sideNav = document.getElementById("mySidenav")
        if (sideNav) {
            sideNav.style.width = "40%";
        }        
    }
    const fetchSubmissions = async (challenge) => {
        clickEvent()
        console.log(challenge);
        try {            
            setLoadingSubmission(true)
            let res = await axios.get(`/api/auth/admin/stories/${challenge.id}`)
            setSubmissions(res.data.data)
            console.log(res);
        } catch (error) {
            console.log(error);
            
        }finally {
            setLoadingSubmission(false)
        }        
    }

    const hideModal = () => {
        let sideNav = document.getElementById("mySidenav")
        if (sideNav) {
            sideNav.style.width = "0";
        }        
    }

    // useEffect(() => {

    //     fetchChallenges();
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [])

    const fetchChallenges = async () => {
        const local_user = localStorage.getItem('user');
        let auth_user = local_user ? JSON.parse(local_user) : user;

        try {   
            setLoading(true)         
            const response = await axios.get(`/api/auth/admin/challenges?id=${auth_user.id}`)
            console.log(response?.data?.data);
            setChallengesData(response?.data?.data);
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

    const loaderCount = [1,2,3,4,5,6,7,8];

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
                <div className='grid grid-cols-4 gap-5'>
                    {
                        challengesData.map((challenge, index) => (

                            <Challenge key={index} clickEvent={() => fetchSubmissions(challenge)} challenge={challenge} />
                        ))
                    }
                
                </div>
            }

            

            <div id="mySidenav" className="sidenav bg-gray-200 shadow-xl">
                <div className="flex justify-between items-center py-5 px-10">
                    <h1 className="text-2xl text-center font-bold ">Submissions</h1>

                    <a href="#" className="closebtn text-3xl"  onClick={hideModal}>&times;</a>
                </div>
                <div className="px-7">

                    {   (submissions.length < 1 && !loadingSubmission)  &&
                        <div className="flex flex-col text-center mt-10 justify-center">
                            <i className='bx bxs-user-x text-6xl'></i>
                            <p className="text-center text-xs font-semibold">No submissions yet</p>
                        </div>
                    }

                    {
                        loadingSubmission && <div>
                            {
                                loaderCount.map((item, index) => (
                                    <div key={index} className="flex items-center space-x-4 mb-4">
                                        <Skeleton className="h-12 w-12 rounded-full" />
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
                        (!loadingSubmission && submissions.length) &&
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
        </>
    )
}

export default AdminChallenges