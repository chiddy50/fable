"use client";

import React, { useEffect, useState, useContext } from 'react';

import { useRouter, useParams } from 'next/navigation';

import { Skeleton } from "@/components/ui/skeleton"
import ScrollToTopBottom from "@/components/general/scroll-to-top-bottom";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button";
import { AppContext } from "@/context/StoryContext"
import { formatDate, getAwardPercentage, getCurrentRate, now, openAwardModal, setTransactionNarration } from "@/lib/helper";
import AwardModal from "@/components/challenge/award-modal";
import axiosInterceptorInstance from '@/axiosInterceptorInstance';
import { getCookie } from 'cookies-next';
import { getAuthToken } from '@dynamic-labs/sdk-react-core';
import { createUnderdogNftUsers } from '@/lib/data';
import { Toaster } from 'react-hot-toast';
import { updateStory } from '@/lib/databaseHelpers';

const SubmissionSummary  = () => {
    const [loading, setLoading] = useState(false)
    const [submission, setSubmission] = useState(null)
    const [firstPlace, setFirstPlace] = useState(null)
    const [secondPlace, setSecondPlace] = useState(null)
    const [thirdPlace, setThirdPlace] = useState(null)
    const [recognized, setRecognized] = useState(null)
    

    const { push } = useRouter()
    const params = useParams<{ id: string }>()    
    const { questions, setStory, story, selectedChallenge, setSelectedChallenge } = useContext(AppContext)
    let token = getCookie('token');
    const dynamicJwtToken = getAuthToken();

    useEffect(() => {
        fetchSubmission();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const openAwardUserModal = () => {
        openAwardModal()
    }

    const fetchSubmission = async () => {        
        try {   
            setLoading(true)         
            let response = await axiosInterceptorInstance.get(`/stories/id/${params.id}`, {
                headers: {
                    Authorization: `Bearer ${dynamicJwtToken}`
                }
            })
            console.log(response);

            setSubmission(response?.data?.response?.submission)
            setFirstPlace(response?.data?.response?.first_place_story)
            setSecondPlace(response?.data?.response?.second_place_story)
            setThirdPlace(response?.data?.response?.third_place_story)
            setRecognized(response?.data?.response?.recognized_story)
            
            console.log({firstPlace, secondPlace, thirdPlace});
            
        } catch (error) {
            console.log(error);            
        }finally{
            setLoading(false)         
        }        
    }
    const loaderCount = [1,2,3];

    const retryCreateNft = async () => {
        try {            
            const { challenge, user, story } = submission;
            
            const storyId = submission.id;
            const projectId = challenge?.projectId
            const userPrimaryWalletAddress = user?.primaryWalletAddress;
            const position = submission?.award
            const percentage = getAwardPercentage(position)
            const percentageValue = percentage * 100;
            const user_is_a_winner = position === "FIRST" || position === "SECOND" || position === "THIRD"
            const position_label = user_is_a_winner ? `${position.toLowerCase()} place` : `Honorable mention`
            const reward = position !== "RECOGNIZED" ? Number(submission?.challenge?.price) * percentage : "0"
            
            const currentRate = await getCurrentRate(challenge?.currency)
            if (!currentRate) {
                console.log("Current rate for "+ challenge?.currency +" to sol is required");            
                return
            }
    
            const rewardInSol = Number(reward) / Number(currentRate); // total reward in sol
            const narration = setTransactionNarration(position)
    
            let payload: any = { 
                storyId,
                currentRate: currentRate.toString(),
                challengeId: challenge.id,
                story: JSON.stringify(story), 
                positionLabel: position_label,
                narration,
                position,
                currency: challenge.currency,
                symbol: challenge.symbol,
                bounty: challenge.price.toString(),
                reward: reward.toString(), 
                rewardInSol: rewardInSol.toString(),
                percentage: percentageValue.toString(),
                userId: user.id,
                email: user.email,            
            }
    
            console.log({payload});
            
            const newNft = await createUnderdogNftUsers(payload, "1", userPrimaryWalletAddress);
            const nftGenerated = newNft ? true : false;
    
            payload = {
                ...payload, 
                nftGenerated,
                nftId: nftGenerated ? newNft?.data?.nftId.toString() : null,
                nftTransactionId: nftGenerated ? newNft?.data?.transactionId : null,
                awardedAt: nftGenerated ? now() : null
            }
    
            let storyUpdated = await updateStory(payload, storyId, dynamicJwtToken)
            console.log(storyUpdated);
        } catch (error) {
            console.log(error);            
        }
        
    }

    return (
        <div className="layout-width">
            <div className="mt-32">
                <i onClick={() => push("/admin/challenges")} className='bx bx-arrow-back text-4xl cursor-pointer text-gray-200'></i>
            </div>

            <div className="flex justify-between my-10">
                <h1 className="text-center text-gray-200 xs:text-3xl sm:text-3xl md:text-4xl font-bold mb-10">
                    Summary
                </h1>

                
            </div>


            { loading && <>
                {
                    loaderCount.map((label, index) => (
                        <div key={index} className="flex flex-col space-y-3 mb-3">
                            <Skeleton className="h-[125px] w-[full] rounded-xl" />
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-[1/2]" />
                                <Skeleton className="h-4 w-[1/2]" />
                            </div>
                        </div>
                    ))
                }

            </>}
            
            {
                (!loading && submission) &&
                <>
                    <div className='h-[300px] border border-gray-700 rounded-xl overflow-clip xs:w-full sm:w-[400px] mb-5'>
                        <img src={submission?.challenge?.image} alt="challenge image" className='rounded-xl w-full h-full object-cover object-center'/>
                    </div>
                    <div className='mb-3 text-3xl text-gray-200 font-bold'>{submission?.challenge?.title}</div>
                    <div className='mb-3 text-xs text-gray-200'>Author: <span className='font-light capitalize'>{submission?.user?.name}</span></div>
                    <div className='mb-3 text-xs text-gray-200'>Email: <span className='font-light'>{submission?.user?.email}</span></div>
                    <p className='text-xs text-gray-200 mb-4'>Submitted {formatDate(submission?.createdAt)}</p>

                    <div className='mb-10'>
                    {
                    submission && !submission?.award && 
                        <Button onClick={openAwardUserModal} className='bg-green-600' size="sm">
                            <span className='mr-3 text-xs'>Award</span>
                            <i className='bx bx-medal text-xl'></i>
                        </Button>    
                    }
                    {
                    submission && submission?.award && 
                        <div className=''>
                            {submission?.awardedAt && <p className='text-xs text-gray-200 mb-4'>Awarded {formatDate(submission?.awardedAt)}</p>}
                            

                            <Button variant="outline" size="sm">
                                <span className='mr-3 text-xs uppercase'>Awarded {submission?.award}</span>
                                <i className='bx bx-medal text-xl'></i>
                            </Button>    
                        </div>
                    }

                    {!submission?.awardedAt || !submission?.award && 
                        <Button onClick={retryCreateNft} className='bg-blue-600 mt-3' size="sm">
                            <span className='mr-3 text-xs uppercase'>Mint cNFT</span>
                            {/* <i className='bx bx-medal text-xl'></i> */}
                        </Button>   
                    }
                    </div>
                    <div className="mb-4">

                        {
                            submission?.story.map((questionGroup: any, index: number) => (

                                <Accordion type="single" collapsible className="w-full mb-10 relative" key={index}>
                                    
                                    <AccordionItem value={`item-${1}`} 
                                    className="bg-gray-800 border-gray-600 border text-gray-200 py-1 mt-2 rounded-xl xs:px-3 sm:px-3 md:px-5"
                                    >
                                        <AccordionTrigger className='pb-2'>
                                            <span className="font-semibold xs:text-sm sm:text-md md:text-lg">{questionGroup.title}</span>
                                        </AccordionTrigger>
                                        <div  className='mb-2'>
                                            {questionGroup.questions.map((question: any, questionIndex: number) => (
                                                <p key={questionIndex} className=" text-[10px]"> - {question.name}</p>
                                            ))}
                                        </div>
                                        
                                        <AccordionContent className="text-xs mt-7">
                                            <p className="font-bold mb-2 text-md">Answer</p>
                                            <p className='bg-[#3F4447] p-4 rounded-xl'>                                            
                                                {questionGroup.answer}
                                            </p>
                                        </AccordionContent>
                                    </AccordionItem>
                                    
                                </Accordion>
                            ))
                        }
                        
                    </div>
                    
                </>
            }


            <ScrollToTopBottom />

            {
                submission && 
                <AwardModal 
                fetchSubmission={fetchSubmission}
                submission={submission} 
                firstPlace={firstPlace} 
                secondPlace={secondPlace} 
                thirdPlace={thirdPlace}
                recognized={recognized}
                />
            }

            <Toaster />

        </div>
    )
}

export default SubmissionSummary