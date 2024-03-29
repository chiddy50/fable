"use client"

import { useContext, useEffect, useRef, useState, useTransition } from "react";
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
import { now } from "@/lib/helper";
import Lottie from 'react-lottie';
import * as animationData from "@/public/animations/animation.json"
import { transferToUsers } from "@/lib/transferToUsers";
import { createStoryTransaction } from "@/lib/databaseHelpers";

export default function AwardModal({ fetchSubmission, submission, firstPlace, secondPlace, thirdPlace, recognized }){
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const { user } = useDynamicContext()

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

    const defaultOptions = {
        loop: true,
        autoplay: true, 
        animationData: animationData,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
    };

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

        const { challenge, user, story } = submission;
        const storyId = submission.id;
        const projectId = challenge?.projectId
        let userPrimaryWalletAddress = user?.primaryWalletAddress;

        if (!userPrimaryWalletAddress) {
            console.log("User does not have a public key");            
            return
        }
        
        let user_is_a_winner = position === "FIRST" || position === "SECOND" || position === "THIRD"
        let position_label = user_is_a_winner ? `${position.toLowerCase()} place` : `Recognized writer`
        let reward = position !== "RECOGNIZED" ? calculateAmounts(submission?.challenge?.price, percentage) : 0
        
        const currentRate = await getCurrentRate(challenge?.currency)
        if (!currentRate) {
            console.log("Current rate for "+ challenge?.currency +" to sol is required");            
            return
        }

        const rewardInSol = Number(reward) / currentRate; // total reward in sol
        const narration = setTransactionNarration(position)

        let payload: any = { 
            storyId,
            currentRate,
            challengeId: challenge.id,
            story: JSON.stringify(story), 
            position: position_label,
            narration,
            currency: challenge.currency,
            symbol: challenge.symbol,
            bounty: challenge.price,
            reward: reward, 
            rewardInSol: rewardInSol,
            percentage: percentage * 100,
            userId: user.id,
            email: user.email,
            paidAt: null,
            awardedAt: null,
        }

        console.log({payload});
        try {
            setLoading(true)

            // return;
            let transaction = await transferToUsers(userPrimaryWalletAddress, 1)      
            let status = "FAILED"  
            if (!transaction) {  
                payload = {
                    ...payload,
                    amountPending: reward,
                    amountPaid: 0,
                }
            }else{
                status = "SUCCESS"
                payload = {
                    ...payload,
                    transactionPublicId: transaction,
                    amountPending: 0,
                    amountPaid: reward,
                    paidAt: now()
                }
            }

            await createStoryTransaction(payload, status, dynamicJwtToken)

            if (user_is_a_winner) {
                let newNft = await createUnderdogNftUsers(payload, projectId, userPrimaryWalletAddress);
                console.log(newNft);              
                let nftGenerated = newNft ? true : false;

                payload = {
                    ...payload, 
                    nftGenerated,
                    nftId: nftGenerated ? newNft?.data?.nftId.toString() : null,
                    nftTransactionId: nftGenerated ? newNft?.data?.transactionId : null,
                    awardedAt: nftGenerated ? now() : null
                }
            }            

            let storyUpdated = await updateStory(payload, storyId)
            setSuccess(true)
            
            console.log(storyUpdated);
            fetchSubmission()

            setTimeout(() => {
                closeModal()
                setSuccess(false)
            }, 4000);
            
        } catch (error) {
            console.log(error);   
        }finally{
            setLoading(false)
        }        
    }

    const updateStory = async (payload: any, storyId: string) => {
        try {                
            const response = await axiosInterceptorInstance.put(`/stories/id/${storyId}`, 
                {
                    challengeId: payload.challengeId,           
                    nftId: payload.nftId,                 
                    nftTransactionId: payload.nftTransactionId,      
                    projectId: payload.projectId,             
                    amountPaid: payload.amountPaid,            
                    amountPending: payload.amountPending,         
                    paidAt: payload.paidAt,                
                    awardedAt: payload.awardedAt,             
                }, 
                {
                    headers: {
                        Authorization: `Bearer ${dynamicJwtToken}`
                    }
                }
            )
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

    const setTransactionNarration = (position: string) => {        
        if (position === "FIRST") {
            return "Reward for first place writing"
        }
        
        if (position === "SECOND") {
            return "Reward for second place writing"
        }

        if (position === "THIRD") {
            return "Reward for third place writing"
        }

        if (position === "RECOGNIZED") {
            return "Reward for a recognized writer"
        }
    }

    const getCurrentRate = async (currency: string) => {
        try {
            let formatCurrency = currency.toLowerCase();
            const currencyMap: { [key: string]: string } = {
                eur: 'eur',
                cny: 'cny',
                gbp: 'gbp',
                ngn: 'ngn',
                usd: 'usd'
            };
        
            const res = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=${formatCurrency}`)            
            const rate = res.data.solana[currencyMap[formatCurrency]]; 
            return rate       
        } catch (error) {
            console.log(error);            
            return null;
        }
    }

    const calculateAmounts = (amount, percentage) => {
        return Number(amount) * percentage;
    }

    return (
        <div id="award-modal" ref={modalRef} className="modal fixed z-10 left-0 top-0 w-full h-full overflow-auto backdrop-blur-sm">
            <div className="modal-content bg-white p-5 rounded-xl shadow-md ">


                {  !loading && !success &&
                    <>                
                        <h1 className="text-center text-xl mb-5 font-bold">Time for a reward</h1>
                        <ul className="text-xs mb-4 grid xs:gap-2 xs:grid-cols-1 sm:grid-cols-3">
                            <li className=" text-gray-600">
                                <p className="text-sm font-bold">First place</p> 
                                <p className="italic flex items-center gap-1">
                                    <span>50%</span>
                                    <span>
                                        ({submission?.challenge?.symbol}{calculateAmounts(submission?.challenge?.price, 0.5)}) 
                                    </span>
                                </p>                                 
                            </li>
                            <li className=" text-gray-600">
                                <p className="text-sm font-bold">Second place</p> 
                                <p className="italic flex items-center gap-1">
                                    <span>30%</span>
                                    <span>
                                        ({submission?.challenge?.symbol}{calculateAmounts(submission?.challenge?.price, 0.3)}) 
                                    </span>
                                </p>                                 
                            </li>
                            <li className=" text-gray-600">
                                <p className="text-sm font-bold">Third place</p> 
                                <p className="italic flex items-center gap-1">
                                    <span>20%</span>
                                    <span>
                                        ({submission?.challenge?.symbol}{calculateAmounts(submission?.challenge?.price, 0.2)}) 
                                    </span>
                                </p>                                 
                            </li>
                        </ul>

                        {!submission?.award && 
                            <div className="flex flex-col gap-3">     
                                {
                                    firstPlace &&
                                    <Button disabled={firstPlace} className="flex bg-green-600 items-center gap-2">
                                        <i className='bx bx-medal text-lg'></i> <span>1st Place awarded</span>
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
                                        <span>2nd Place awarded</span>
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
                                        <span>3rd Place awarded</span>
                                    </Button>
                                }

                                {
                                    !thirdPlace &&
                                    <Button onClick={() => award(0.2, "THIRD")} disabled={thirdPlace} className="flex bg-orange-600 items-center gap-2">                        
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
                                    <Button onClick={() => award(0, "RECOGNIZED")} disabled={recognized} className="flex bg-purple-600 items-center gap-2">                        
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

                {  !loading && success &&
                    <div>
                        <h1 className="text-center text-xl mb-5 font-bold">
                            Awarded!!
                        </h1>

                        <div className="flex justify-center mb-3">
                            {/* <i className='bx bx-party bx-tada text-[6rem] text-green-600' ></i> */}
                            <div className="w-[90%]">                            
                                <Lottie options={defaultOptions}
                                    // height={200}
                                    // width={200}
                                    isStopped={false}
                                    isPaused={false}/>
                            </div>
                        </div>

                        <Button className="w-full" onClick={() => closeModal()}>Cancel</Button>
                    </div>
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