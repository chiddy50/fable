"use client";

import React, { useEffect, useState, useContext } from 'react';

import { useRouter, useParams } from 'next/navigation';

import Countdown from '@/components/general/countdown-component'
import { AppContext } from "@/context/StoryContext"
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


const NewChallenge = () => {
    const [currentTab, setCurrentTab] = useState(0);
    const [loading, setLoading] = useState(false)

    const router = useRouter();
    const params = useParams<{ id: string }>()    
    const { questions, setStory, story, selectedChallenge, setSelectedChallenge } = useContext(AppContext)

    useEffect(() => {
        fetchChallenge()
    }, []);

    const fetchChallenge = async () => {        
        try {   
            setLoading(true)         
            let response = await axios.get(`/api/auth/admin/challenge/${params.id}`)
            setSelectedChallenge(response?.data?.data)
            console.log(response);
            
        } catch (error) {
            console.log(error);            
        }finally{
            setLoading(false)         
        }        
    }

    
    function showTab(n: number) {
        const tabs = document.getElementsByClassName("tab");

        for (let i = 0; i < tabs.length; i++) {
        tabs[i].style.display = "none";
        }
        tabs[n].style.display = "block";

        if (n === 0) {
        document.getElementById("prevBtn").style.display = "none";
        } else {
        document.getElementById("prevBtn").style.display = "inline";
        }
        
        if (n === (tabs.length - 1)) {
        document.getElementById("nextBtn").style.display = "none";
        document.getElementById("submitBtn").style.display = "inline";
        } else {
        document.getElementById("nextBtn").style.display = "inline";
        document.getElementById("submitBtn").style.display = "none";
        }
        
        fixStepIndicator(n);
    }

    function nextPrev(n: number) {
        const tabs = document.getElementsByClassName("tab");

        if (n === 1 && !validateForm()) return false;

        tabs[currentTab].style.display = "none";

        setCurrentTab(currentTab + n);
        if (currentTab >= tabs.length) {
            document.getElementById("regForm").submit();
            return false;
        }

        showTab(currentTab);
    }

    function validateForm() {
        // return true;

        const tabs = document.getElementsByClassName("tab");
        const inputs = tabs[currentTab].getElementsByTagName("textarea");
        let valid = true;

        for (let i = 0; i < inputs.length; i++) {
            if (inputs[i].value === "") {
                if (!inputs[i].classList.contains("invalid")) {
                    inputs[i].classList.add("invalid")
                }
                valid = false;
            }else{
                inputs[i].classList.remove("invalid")
            }
        }

        if (valid) {
            document.getElementsByClassName("step")[currentTab].className += " finish";
        }
        return valid;
    }

    function fixStepIndicator(n: number) {
        const steps = document.getElementsByClassName("step");
        
        for (let i = 0; i < steps.length; i++) {
            let next_index = n + 1;
            
            if (next_index !== steps.length) {          
                if (steps[next_index].classList.contains("active")) {
                steps[next_index].classList.remove("active");        
                }
            }

            if (n < 1) {        
                steps[i].className = steps[i].className.replace(" active", "");
            }
        
        }
        steps[n].className += " active";
    }

    function updateAnswer(e){

        const section_id = e.target.dataset.section;
        const question_id = e.target.dataset.question;
        const answer = e.target.value;
            console.log({
                answer,
                section_id,
                question_id
            });
            
        // let questions_data = JSON.parse(localStorage.getItem("questions"));
        story.map((section) => {

            if (section.index == section_id) {
                section.questions.map((single_question) => {
                if (single_question.index == question_id) {
                    single_question.answer = answer;        
                }
                return single_question;
                })
            }
            return section;
        });
        
        console.log(story);
        localStorage.setItem("questions", JSON.stringify(story))
        setStory(story)
    }

    function handleSave() {
        if (typeof window !== "undefined" && window.localStorage) {
            localStorage.setItem("questions", JSON.stringify(questions));
        
            let questions_data = JSON.parse(localStorage.getItem("questions"));
            console.log(questions_data);
        }
    }

    function moveToSummaryPage(){
        router.push('/user/summary')
    }

    useEffect(() => {
        // handleSave()
        
        showTab(currentTab);
    }, [currentTab])

    return (
        <main className="grid grid-cols-3 layout-width pt-7 gap-10">
            <div className="bg-white flex flex-col items-center pt-7 gap-2">

                {
                    loading &&
                    <div className="flex flex-col space-y-3">
                        <Skeleton className="h-[125px] w-[full] rounded-xl" />
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-[250px]" />
                            <Skeleton className="h-4 w-[200px]" />
                        </div>

                        <Skeleton className="h-[125px] w-[full] rounded-xl" />
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-[250px]" />
                            <Skeleton className="h-4 w-[200px]" />
                        </div>

                        <Skeleton className="h-[125px] w-[full] rounded-xl" />
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-[250px]" />
                            <Skeleton className="h-4 w-[200px]" />
                        </div>
                    </div>
                }

                {
                    !loading &&
                    <>
                        <img
                            src={selectedChallenge?.image}
                            className='w-full h-full px-7 pt-5 object-cover'
                            style={{ borderRadius: `${50}px`}}
                            alt="Picture of the image"
                        />

                        <div className="flex items-center justify-center">
                            <p className='flex items-center gap-2 px-5'>
                            <i className='bx bx-money text-6xl text-green-700'></i>
                            <span className='text-4xl font-semibold'>{selectedChallenge?.symbol}{selectedChallenge?.price}</span>
                            </p>
                        </div>

                        <div className='text-gray-500'>
                            <Countdown date={`${selectedChallenge?.date} ${selectedChallenge?.time}`}/> 
                        </div>
                    
                    </>
                }

            </div>

            <div className="col-span-2">

                <div className="flex justify-center mb-5 pb-3">

                    <div style={{ textAlign: 'center' }}
                    className='flex justify-between w-full'>                
                        <i className="bx bxs-check-circle step"></i>
                        <i className="bx bxs-check-circle step"></i>
                        <i className="bx bxs-check-circle step"></i>
                        <i className="bx bxs-check-circle step"></i>
                        <i className="bx bxs-check-circle step"></i>
                        <i className="bx bxs-check-circle step"></i>
                        <i className="bx bxs-check-circle step"></i>
                        <i className="bx bxs-check-circle step"></i>
                    </div>
                </div>

                <form id="regForm">

                    <QuestionOne updateAnswer={updateAnswer}/>
                    <QuestionTwo updateAnswer={updateAnswer}/>
                    <QuestionThree updateAnswer={updateAnswer}/>
                    <QuestionFour updateAnswer={updateAnswer}/>
                    <QuestionFive updateAnswer={updateAnswer}/>
                    <QuestionSix updateAnswer={updateAnswer}/>
                    <QuestionSeven updateAnswer={updateAnswer}/>
                    <QuestionEight updateAnswer={updateAnswer}/>
                            
                    <div className='mt-3 overflow-auto flex justify-end items-center gap-3'>
                    
                        <button type="button" 
                        className="bg-gray-700 px-8 py-1 text-sm rounded-md border-none text-white cursor-pointer" 
                        onClick={() => nextPrev(-1)}
                        id="prevBtn" >Previous</button>

                        <button type="button" 
                        style={{ background: '#2A4457' }}
                        className="px-8 py-1 text-sm rounded-md border-none text-white cursor-pointer" 
                        onClick={() => nextPrev(1)}
                        id="nextBtn" >Next</button>

                        <button type="button" 
                        style={{ background: '#2A4457' }}
                        className=" px-8 py-1 text-sm rounded-md border-none text-white cursor-pointer" 
                        onClick={() => moveToSummaryPage()}
                        id="submitBtn" >Summary</button>
                    
                    </div>            
                    
                </form>
                
                


            </div>

        </main>
    )
}

export default NewChallenge