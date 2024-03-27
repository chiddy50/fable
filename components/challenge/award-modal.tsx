"use client"

import { useContext, useRef, useState, useTransition } from "react";
import { useRouter } from 'next/navigation';
import { Button } from "../ui/button";
import { FormError } from "../from-error";
import { FormSuccess } from "../from-success";
// import { login } from "@/actions/login";
import axios from "axios";
import { AppContext } from "@/context/StoryContext";
import { createUnderdogNft, createUnderdogNftUsers } from "@/lib/data";
import { toast } from "@/components/ui/use-toast";
import axiosInterceptorInstance from "@/axiosInterceptorInstance";
import { getCookie } from 'cookies-next'; 
import { getAuthToken, useDynamicContext } from '@dynamic-labs/sdk-react-core';

export default function AwardModal({ submission, firstPlace, secondPlace, thirdPlace, recognized }){
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const { user, primaryWallet } = useDynamicContext()

    let token = getCookie('token');
    const dynamicJwtToken = getAuthToken();
    
    const modalRef = useRef(null);
    const { setUserLoggedIn, authUserData, setAuthUserData } = useContext(AppContext)

    const submitData = async () => {
        try {            
            if (!validateCredentials()) {
                return;    
            }
    
            const payload = {
                email: adminEmail,
                password: adminPassword,
            }
    
            setLoading(true)

            const response = await axios.post("/api/auth/admin/login", payload)
            console.log(response);
            setUserLoggedIn(true)
            closeModal()

            setAuthUserData(response?.data?.data)
            if (localStorage) {

                localStorage.setItem("user", JSON.stringify(response?.data?.data))
            }
        } catch (error) {
            console.log(error);
            let error_msg = "Something went wrong"
            setError(error_msg)
        }finally{
            setLoading(false)
        }
    }

    const validateCredentials = () => {
        setError("")

        if (!adminEmail) {
            setError("Email is required")
            return false
        }

        if (!adminPassword) {
            setError("Password is required")
            return false
        }
        return true
    }

    const closeModal = () => {        
        modalRef.current.style.display = 'none'
    }


    const award = async (percentage: number, position: string) => {

        if (!primaryWallet) {
            console.log("User does not have a public key");            
            return
        }
        
        let user_is_a_winner = position === "FIRST" || position === "SECOND" || position === "THIRD"
        let position_label = ""
        if (user_is_a_winner) {
            position_label = `${position.toLowerCase()} place`
        }else if (position === "RECOGNIZED") {
            position_label = `Recognized writer`        
        }
        
        let reward =  0;
        if (position !== "RECOGNIZED") {            
            reward = calculateAmounts(submission?.challenge?.price, percentage)
        }

        let payload = { 
            story: JSON.stringify(submission.story), 
            position: position_label,
            currency: submission.challenge.symbol,
            bounty: submission.challenge.price,
            reward, 
            percentage: percentage * 100,
            userId: submission.user.id,
            email: submission.user.email,
        }

        try {
            setLoading(true)
            // let newNft = await createUnderdogNftUsers(payload, submission?.challenge?.projectId, primaryWallet.address);
            // console.log(newNft);

            // if (!newNft) {
            //     return
            // }

            let storyUpdated = await updateStory({
                nftId: "20",
                nftTransactionId: "2b673766-c013-43ae-98f7-5304c90ef64f",
                // nftId: newNft?.data?.nftId.toString(),
                // nftTransactionId: newNft?.data?.transactionId, 
                award: position    
            }, submission.id)
            console.log(storyUpdated);
            window.location.reload()
            closeModal()
        } catch (error) {
            console.log(error);   
        }finally{
            setLoading(false)
        }        
    }

    const updateStory = async (payload, storyId) => {
        try {

            console.log(payload);
            
            const response = await axiosInterceptorInstance.put(`/stories/id/${storyId}`, payload, {
                headers: {
                    Authorization: `Bearer ${dynamicJwtToken}`
                }
            })
            console.log(response);

            return response;
        } catch (error) {
            console.log(error)
            toast({
                title: "Unable to update story",
                description: "Unable to update story",
            })
            return false
        }
    }

    const calculateAmounts = (amount, percentage) => {
        return Number(amount) * percentage;
    }

    return (
        <div id="award-modal" ref={modalRef} className="modal fixed z-10 left-0 top-0 w-full h-full overflow-auto">
            <div className="modal-content p-5 rounded-xl shadow-md ">

                <h1 className="text-center text-xl mb-5 font-bold">Time for a reward</h1>

                {  !loading &&
                    <>                
                        <ul className="text-xs mb-4">
                            <li className="mb-1 text-gray-600">First place 50%: {submission?.challenge?.symbol}{calculateAmounts(submission?.challenge?.price, 0.5)} </li>
                            <li className="mb-1 text-gray-600">Second place 30%: {submission?.challenge?.symbol}{calculateAmounts(submission?.challenge?.price, 0.3)} </li>
                            <li className="mb-1 text-gray-600">Third place 20%: {submission?.challenge?.symbol}{calculateAmounts(submission?.challenge?.price, 0.2)} </li>
                        </ul>

                        {!submission?.award && 
                            <div className="flex flex-col gap-3">     
                                {
                                    firstPlace &&
                                    <Button disabled={firstPlace} className="flex bg-green-600 items-center gap-2">
                                        <i className='bx bx-medal text-lg'></i> <span>1st Place has already awarded</span>
                                    </Button>
                                }

                                {
                                    !firstPlace &&
                                    <Button onClick={() => award(0.5, "FIRST")} disabled={firstPlace} className="flex bg-green-600 items-center gap-2">
                                        <i className='bx bx-medal text-lg'></i> <span>Award 1st Place </span>
                                    </Button>
                                }
                                
                                {
                                    secondPlace && 
                                    <Button disabled={secondPlace} className="flex bg-blue-600 items-center gap-2">                        
                                        <i className='bx bx-medal text-lg'></i>
                                        <span>2nd Place has already awarded</span>
                                    </Button>   
                                }

                                {
                                    !secondPlace && 
                                    <Button onClick={()  => award(0.3, "SECOND")} disabled={secondPlace} className="flex bg-blue-600 items-center gap-2">                        
                                        <i className='bx bx-medal text-lg'></i>
                                        <span>Award 2nd Place</span>
                                    </Button>   
                                }

                                {
                                    thirdPlace &&
                                    <Button disabled={thirdPlace} className="flex bg-orange-600 items-center gap-2">                        
                                        <i className='bx bx-medal text-lg'></i>
                                        <span>3rd Place has already awarded</span>
                                    </Button>
                                }

                                {
                                    !thirdPlace &&
                                    <Button onClick={()  => award(0.2, "THIRD")} disabled={thirdPlace} className="flex bg-orange-600 items-center gap-2">                        
                                        <i className='bx bx-medal text-lg'></i>
                                        <span>Award 3rd Place </span>
                                    </Button>
                                }

                                {
                                    recognized &&
                                    <Button disabled={recognized} className="flex bg-purple-600 items-center gap-2">                        
                                        <i className='bx bx-medal text-lg'></i>
                                        <span>Recognized Story</span>
                                    </Button>
                                }

                                {
                                    !recognized &&
                                    <Button onClick={()  => award(0, "RECOGNIZED")} disabled={recognized} className="flex bg-purple-600 items-center gap-2">                        
                                        <i className='bx bx-medal text-lg'></i>
                                        <span>Award Recognition</span>
                                    </Button>
                                }
                            </div>  
                        } 

                        {submission?.award && 
                            <div className="flex flex-col justify-center gap-2 items-center">
                                <i className='bx bxs-hand text-6xl text-red-600'></i>
                                <h2 className="text-xs text-gray-600">Already rewarded for this challenge</h2>
                            </div>
                        }
                        <div className="flex mt-5">
                            <Button onClick={closeModal}>Cancel</Button>
                        </div>                                 
                    </>
                }        

                {   loading &&
                    <div className="flex items-center justify-center my-7">
                        <i className='bx bx-loader-alt bx-spin' style={{ fontSize: "7rem" }} ></i>
                    </div>
                }     
            </div>
        </div>
    )
}