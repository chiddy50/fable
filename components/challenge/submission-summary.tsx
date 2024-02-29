"use client";

import React, { useEffect, useState, useContext } from 'react';

import { useRouter, useParams } from 'next/navigation';

import Countdown from '@/components/general/countdown-component'
import QuestionOne from '@/components/question/question-one';
import QuestionTwo from '@/components/question/question-two';
import QuestionThree from '@/components/question/question-three';
import QuestionFour from '@/components/question/question-four';
import QuestionFive from '@/components/question/question-five';
import QuestionSix from '@/components/question/question-six';
import QuestionSeven from '@/components/question/question-seven';
import QuestionEight from '@/components/question/question-eight';
import axios from 'axios';
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
import { openAwardModal } from "@/lib/helper";
import AwardModal from "@/components/challenge/award-modal";

const SubmissionSummary  = () => {
    const [loading, setLoading] = useState(false)
    const [submission, setSubmission] = useState(null)
    const [firstPlace, setFirstPlace] = useState(null)
    const [secondPlace, setSecondPlace] = useState(null)
    const [thirdPlace, setThirdPlace] = useState(null)

    const { push } = useRouter()
    const params = useParams<{ id: string }>()    
    const { questions, setStory, story, selectedChallenge, setSelectedChallenge } = useContext(AppContext)

    useEffect(() => {
        fetchSubmission();
    }, []);


    const openAwardUserModal = () => {
        openAwardModal()
    }

    const fetchSubmission = async () => {        
        try {   
            setLoading(true)         
            let response = await axios.get(`/api/auth/admin/story/${params.id}`)
            console.log(response);

            setSubmission(response?.data?.data?.submission)
            setFirstPlace(response?.data?.data?.first_place_story)
            setSecondPlace(response?.data?.data?.second_place_story)
            setThirdPlace(response?.data?.data?.third_place_story)

            console.log({firstPlace, secondPlace, thirdPlace});
            
        } catch (error) {
            console.log(error);            
        }finally{
            setLoading(false)         
        }        
    }
    const loaderCount = [1,2,3];

    return (
        <div className="layout-width">
            <div className="mt-7">
                <i onClick={() => push("/admin/challenges")} className='bx bx-arrow-back text-4xl cursor-pointer hover:text-gray-600'></i>
            </div>

            <div className="flex justify-between my-10">
                <h1 className="text-center text-4xl font-bold mb-10">
                    Summary
                </h1>
                <Button onClick={openAwardUserModal} variant="destructive" size="lg">Award</Button>    
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
                    <div className='mb-3 text-xs font-bold'>Author: <span className='font-light capitalize'>{submission?.user?.name}</span></div>
                    <div className='mb-5 text-xs font-bold'>Email: <span className='font-light'>{submission?.user?.email}</span></div>
                    <div className="mb-4">

                        {
                            submission?.story.map((questionGroup: any, index: number) => (

                                <Accordion type="single" collapsible className="w-full mb-10" key={index}>
                                    <h1 className="text-xl font-semibold text-gray-400">{questionGroup.title}</h1>

                                    {questionGroup.questions.map((question: any, questionIndex: number) => (

                                        <AccordionItem key={questionIndex} value={`item-${questionIndex}`} 
                                        className="bg-gray-100 py-1 px-5 mt-2 rounded-xl"
                                        >
                                            <AccordionTrigger>
                                                <span className="font-semibold text-md">{question.name}</span>
                                            </AccordionTrigger>
                                            <AccordionContent>{question.answer}</AccordionContent>
                                        </AccordionItem>
                                    ))}
                                    
                                </Accordion>
                            ))
                        }
                        
                    </div>
                    
                </>
            }


            <ScrollToTopBottom />
            {
                submission && <AwardModal submission={submission} firstPlace={firstPlace} secondPlace={secondPlace} thirdPlace={thirdPlace}/>
            }
        </div>
    )
}

export default SubmissionSummary