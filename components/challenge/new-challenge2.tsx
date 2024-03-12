"use client";

import React, { useEffect, useState, useContext } from 'react';

import { useRouter, useParams } from 'next/navigation';

import Countdown from '@/components/general/countdown-component'
import { AppContext } from "@/context/StoryContext"

import axios from 'axios';
import { Skeleton } from "@/components/ui/skeleton"
import Image from 'next/image';
import axiosInterceptorInstance from '@/axiosInterceptorInstance';
import { all_questions, questions } from '@/lib/questions';
import { Button } from '../ui/button';
import { hideTransferLoader, showTransferLoader } from '@/lib/helper';


const  NewChallenge2 = () => {

    interface Question {
        index: number;
        title: string;
        answer: string;
        slug: string;
        questions: object[];
    }

    const [currentTab, setCurrentTab] = useState(0);
    const [loading, setLoading] = useState(false)
    const [focusedQuestion, setFocusedQuestion] = useState<Question | null>(null)
    const [allQuestions, setAllQuestions] = useState(questions);
    const [completionRate, setCompletionRate] = useState(0);
    
    const router = useRouter();
    const params = useParams<{ id: string }>()    
    const { setStory, story, selectedChallenge, setSelectedChallenge } = useContext(AppContext)

    useEffect(() => {
        console.log({all_questions});
        
        fetchChallenge();
    }, []);

    const fetchChallenge = async () => {        
        try {   
            showTransferLoader()
            setLoading(true)         
            let response = await axiosInterceptorInstance.get(`/challenges/id/${params.id}`)
            setSelectedChallenge(response?.data?.challenge)
            
        } catch (error) {
            console.log(error);            
        }finally{
            setLoading(false)  
            hideTransferLoader()
        }        
    }

    const textAreaFocused = (question: Question) => {
        console.log(question);
        setFocusedQuestion(question)
    }

    const textAreaBlured = (question: Question) => {
        // setFocusedQuestion(null)
    }

    function updateAnswer(e: React.ChangeEvent<HTMLTextAreaElement>, question: Question){
        const answer = e.target.value;
        if (focusedQuestion) {            
            setFocusedQuestion({ ...focusedQuestion, answer: answer });
            
            allQuestions.map((section) => {

                if (section.index == question.index) {
                    section.answer = answer;        
                }
                return section;
            });
            setAllQuestions(allQuestions)





            const totalQuestions = 8;            
            let answeredQuestions = 0;
            questions.forEach(category => {
                if (category.answer !== "") answeredQuestions++;
            });

            const completion_rate = (answeredQuestions / totalQuestions) * 100;
            setCompletionRate(Math.floor(completion_rate))
        }
    }

    function moveToSummaryPage(){
        
        if(!validateForm()){
            return false;
        }
        // router.push('/user/summary')
    }

    const validateForm = () => {
        let story_inputs = document.getElementsByClassName('story-input');

        if (story_inputs.length) {
            for (let i = 0; i < story_inputs.length; i++) {
                const story_input = story_inputs[i];

                if (!story_input?.value) {
                    story_input.classList.add("invalid")
                    story_input.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    return false;
                }else{
                    story_input.classList.remove("invalid")
                }                
            }

            return true;
        }

        return false;
    }

    

    return (
        <div className="grid">

            <div className="relative mt-10">
                {
                    focusedQuestion && 
                    <div className=" bg-white p-5 rounded-lg shadow-sm drop-shadow-sm col-span-3">
                        <div className=" flex justify-between font-mono text-sm font-semibold  mb-4 tracking-widest text-gray-500 ">
                            <p>
                                <span className='text-xl font-bold'>0{focusedQuestion?.index}:</span> {focusedQuestion?.title}
                            </p>
                            <div className=" flex space-x-8">                        
                                <div>
                                    <button>
                                        <svg className=" w-4 h-4 fill-current text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M490.3 40.4C512.2 62.27 512.2 97.73 490.3 119.6L460.3 149.7L362.3 51.72L392.4 21.66C414.3-.2135 449.7-.2135 471.6 21.66L490.3 40.4zM172.4 241.7L339.7 74.34L437.7 172.3L270.3 339.6C264.2 345.8 256.7 350.4 248.4 353.2L159.6 382.8C150.1 385.6 141.5 383.4 135 376.1C128.6 370.5 126.4 361 129.2 352.4L158.8 263.6C161.6 255.3 166.2 247.8 172.4 241.7V241.7zM192 63.1C209.7 63.1 224 78.33 224 95.1C224 113.7 209.7 127.1 192 127.1H96C78.33 127.1 64 142.3 64 159.1V416C64 433.7 78.33 448 96 448H352C369.7 448 384 433.7 384 416V319.1C384 302.3 398.3 287.1 416 287.1C433.7 287.1 448 302.3 448 319.1V416C448 469 405 512 352 512H96C42.98 512 0 469 0 416V159.1C0 106.1 42.98 63.1 96 63.1H192z"/></svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                        {
                            focusedQuestion?.questions.map((question, index) => (

                                <p key={index} className=" font-mono text-xs mb-1 font-semibold tracking-widest text-gray-400  ">- {question?.name}</p>
                            ))
                        }
                        <p className=" w-full text-xs mt-7 font-mono text-gray-800 tracking-widest leading-4">
                            { focusedQuestion?.answer }
                        </p>
                        <div className=" flex w-full justify-between mt-6">
                            <div>
                                <button>
                                    <svg className=" w-4 h-4 fill-current text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M364.2 83.8C339.8 59.39 300.2 59.39 275.8 83.8L91.8 267.8C49.71 309.9 49.71 378.1 91.8 420.2C133.9 462.3 202.1 462.3 244.2 420.2L396.2 268.2C407.1 257.3 424.9 257.3 435.8 268.2C446.7 279.1 446.7 296.9 435.8 307.8L283.8 459.8C219.8 523.8 116.2 523.8 52.2 459.8C-11.75 395.8-11.75 292.2 52.2 228.2L236.2 44.2C282.5-2.08 357.5-2.08 403.8 44.2C450.1 90.48 450.1 165.5 403.8 211.8L227.8 387.8C199.2 416.4 152.8 416.4 124.2 387.8C95.59 359.2 95.59 312.8 124.2 284.2L268.2 140.2C279.1 129.3 296.9 129.3 307.8 140.2C318.7 151.1 318.7 168.9 307.8 179.8L163.8 323.8C157.1 330.5 157.1 341.5 163.8 348.2C170.5 354.9 181.5 354.9 188.2 348.2L364.2 172.2C388.6 147.8 388.6 108.2 364.2 83.8V83.8z"/></svg>
                                </button>
                            </div>
                            <div>
                                <button>
                                    <svg className=" w-4 h-4 fill-current text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M135.2 17.69C140.6 6.848 151.7 0 163.8 0H284.2C296.3 0 307.4 6.848 312.8 17.69L320 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H128L135.2 17.69zM31.1 128H416V448C416 483.3 387.3 512 352 512H95.1C60.65 512 31.1 483.3 31.1 448V128zM111.1 208V432C111.1 440.8 119.2 448 127.1 448C136.8 448 143.1 440.8 143.1 432V208C143.1 199.2 136.8 192 127.1 192C119.2 192 111.1 199.2 111.1 208zM207.1 208V432C207.1 440.8 215.2 448 223.1 448C232.8 448 240 440.8 240 432V208C240 199.2 232.8 192 223.1 192C215.2 192 207.1 199.2 207.1 208zM304 208V432C304 440.8 311.2 448 320 448C328.8 448 336 440.8 336 432V208C336 199.2 328.8 192 320 192C311.2 192 304 199.2 304 208z"/></svg>
                                </button>
                            </div>
                        </div>
                        
                    </div>
                }
                
                
                <div className="space-x-5 inset-x-0 fixed bottom-0 w-full justify-start px-7 py-4">
                        
                    <div className='w-full flex justify-center items-center gap-5'>
                        { completionRate < 100 &&
                            <Button variant="outline" className='text-red-500'>{completionRate}% complete</Button>
                        }

                        { completionRate >= 100 &&
                            <Button onClick={moveToSummaryPage} className='bg-green-600'>100% complete</Button>
                        }
                    </div>

                    <div className=" overflow-x-auto flex space-x-5 w-full justify-start py-4">
        
                        {allQuestions.map((question, index) => (

                            <div key={index}  className=" ideaCard bg-white p-5 rounded-xl shadow-sm drop-shadow-sm">
                                <div className=" top_description flex justify-between w-[320px] mx-auto mt-4">
                                    <p className="text-clip uppercase text-sm tracking-wide font-bold text-gray-500">{question?.title}</p>                                                
                                </div>
                                <textarea 
                                id={`card_${question.index}`}
                                placeholder=" Type here..." 
                                onFocus={() => textAreaFocused(question)} 
                                onBlur={() => textAreaBlured(question)}  
                                onKeyUp={(e) => updateAnswer(e, question)}
                                className="story-input mt-4 w-full h-28 pb-9 px-3 pt-4 text-xs appearance-none outline-none rounded-xl bg-gray-50 flex items-center justify-center">                                
                                </textarea>


                                <div className=" bg-white w-full h-12 flex justify-between px-2 items-end mt-2 ">                                            

                                    <div className=" space-x-6 relative overflow-hidden">
                                        
                                        <button>
                                            <svg className=" w-4 h-4 fill-current text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M135.2 17.69C140.6 6.848 151.7 0 163.8 0H284.2C296.3 0 307.4 6.848 312.8 17.69L320 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H128L135.2 17.69zM31.1 128H416V448C416 483.3 387.3 512 352 512H95.1C60.65 512 31.1 483.3 31.1 448V128zM111.1 208V432C111.1 440.8 119.2 448 127.1 448C136.8 448 143.1 440.8 143.1 432V208C143.1 199.2 136.8 192 127.1 192C119.2 192 111.1 199.2 111.1 208zM207.1 208V432C207.1 440.8 215.2 448 223.1 448C232.8 448 240 440.8 240 432V208C240 199.2 232.8 192 223.1 192C215.2 192 207.1 199.2 207.1 208zM304 208V432C304 440.8 311.2 448 320 448C328.8 448 336 440.8 336 432V208C336 199.2 328.8 192 320 192C311.2 192 304 199.2 304 208z"/></svg>
                                        </button>
                                    
                                    </div>
                                    <div className=" save_action">
                                        <button>
                                        <svg className=" w-4 h-4 fill-current text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M511.6 36.86l-64 415.1c-1.5 9.734-7.375 18.22-15.97 23.05c-4.844 2.719-10.27 4.097-15.68 4.097c-4.188 0-8.319-.8154-12.29-2.472l-122.6-51.1l-50.86 76.29C226.3 508.5 219.8 512 212.8 512C201.3 512 192 502.7 192 491.2v-96.18c0-7.115 2.372-14.03 6.742-19.64L416 96l-293.7 264.3L19.69 317.5C8.438 312.8 .8125 302.2 .0625 289.1s5.469-23.72 16.06-29.77l448-255.1c10.69-6.109 23.88-5.547 34 1.406S513.5 24.72 511.6 36.86z"/></svg>
                                        </button>
                                    </div>

                                </div>
                                {/* <button className=" save_action w-[320px] bg-green-500 h-12 uppercase rounded-md shadow-md mx-auto flex items-center justify-center tracking-widest font-semibold text-gray-100 mt-7">Save</button> */}
                            </div>
                        ))}
        
                    </div>
                </div>

                {/* <div className=" overflow-x-auto flex space-x-5 inset-x-0 fixed bottom-14 w-full justify-start px-7 py-4"> */}


            </div>
        </div>
    )
}

export default NewChallenge2