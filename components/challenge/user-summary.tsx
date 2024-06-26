"use client"

import ScrollToTopBottom from "@/components/general/scroll-to-top-bottom";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"


import { Button } from "@/components/ui/button";
import { AppContext } from "@/context/StoryContext"
import { bringUpAdminLoginModal, bringUpUserLoginModal, hideTransferLoader, showTransferLoader } from "@/lib/helper";
import { useRouter } from "next/navigation";
import { useContext, useState } from 'react';
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import ConfirmModalComponent from "@/components/general/confirm-modal-component";
import axios from "axios";
import AddAddressModal from "@/components/general/add-address-modal";
import axiosInterceptorInstance from "@/axiosInterceptorInstance";
import { getCookie } from 'cookies-next';
import { getAuthToken } from '@dynamic-labs/sdk-react-core';
import { useDynamicContext } from "@dynamic-labs/sdk-react-core"
import { useToast } from "@/components/ui/use-toast"
import SuccessModal from "../modal/success-modal";

import * as animationData from "@/public/animations/balloons.json"

const UserSummary = () => {
    const { push } = useRouter()
    const { story, userLoggedIn, selectedChallenge } = useContext(AppContext)
    const { user, setShowAuthFlow } = useDynamicContext()

    const [openConfirmModal, setOpenConfirmModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [userAddress, setUserAddress] = useState(null);
    const [error, setError] = useState("");
    let token = getCookie('token');
    const dynamicJwtToken = getAuthToken();
    const { toast } = useToast()
    
    const submitStoryData = async () => {
        // console.log(user);
        
        if (!user) {
            setShowAuthFlow(true)
            return           
        }
         
        // setOpenConfirmModal(true);
        // return
        
        await continueStorySubmission()
    }

    const continueStorySubmission = async () => {
        const local_user = localStorage.getItem('user');
        let auth_user = local_user ? JSON.parse(local_user) : user;

        if (user) {
            
            // if (!user?.publicKey && !userAddress) {
            //     setError("Kindly provide your public key")
            //     return;
            // }
        }

        console.log({story,selectedChallenge});
        
        let payload = {
            story: story,
            userId: auth_user.id,                
            challengeId: selectedChallenge.id,
            userAddress
        }

        showTransferLoader()
        try {
            let res = await axiosInterceptorInstance.post("/stories/create", payload, {
                headers: {
                    Authorization: `Bearer ${dynamicJwtToken}`
                }
            })
            console.log(res);
            localStorage.removeItem("question") 
            toast({
                title: "User story created",
                description: "User story created",
                variant: "default"
            })

            clearForm()
            document.getElementById('success-modal').style.display = "block";
            
            setTimeout(() => {
                document.getElementById('success-modal').style.display = "none";
                push("/user/stories")                
            }, 4000);
            
        } catch (error) {
            console.log(error);
            
        }finally{
            hideTransferLoader()
        }
    }
    
    const clearForm = () => {
        
        const storyInputs = document.getElementsByClassName('story-input');
        for (let index = 0; index < storyInputs.length; index++) {            
            storyInputs[index].value = ""
        }
    }
    
    return (
        <div className="layout-width">
            <div className="mt-[7rem] mb-10 flex items-center gap-10">
                <i onClick={() => push(`/user/start/${selectedChallenge.id}`)} className='bx bx-arrow-back text-4xl cursor-pointer text-white '></i>
                <h1 className="text-center text-4xl text-white font-bold ">
                    Summary
                </h1>
            </div>

            <div className="mb-7" onClick={submitStoryData}>
                <Button variant="secondary" className="bg-[#222d28] border border-[#155a3c] text-[#85e0b7] hover:bg-[#389a6b] hover:text-white hover:border-[#3ed08e]">Proceed</Button>
            </div>

            <div className="mb-4">

                {
                    story.map((questionGroup: any, index: number) => (

                        <Accordion type="single" collapsible className="w-full mb-10 relative" key={index}>
                                    
                            <AccordionItem value={`item-${1}`} 
                            className="border-[#343434] bg-[#232323] border text-white pt-1 pb-5 px-5 mt-2 rounded-xl"
                            >
                                <AccordionTrigger className='pb-2'>
                                    <span className="font-semibold text-lg">{questionGroup.title}</span>
                                </AccordionTrigger>
                                <div  className='mb-2'>
                                    {questionGroup.questions.map((question: any, questionIndex: number) => (
                                        <p className=" text-[10px]"> - {question.name}</p>
                                    ))}
                                </div>
                                
                                <AccordionContent className="py-4 px-5 text-xs mt-7 bg-[#212121] border-[#343434] border rounded-xl">
                                    <p className="font-bold mb-2 text-md">Answer</p>
                                    {questionGroup.answer}
                                </AccordionContent>
                            </AccordionItem>
                            
                        </Accordion>
                    ))
                }
                
            </div>

            <div className="pb-10" onClick={submitStoryData}>
                <Button variant="secondary" className="bg-[#222d28] border border-[#155a3c] text-[#85e0b7] hover:bg-[#389a6b] hover:text-white hover:border-[#3ed08e]">Proceed</Button>
            </div>

            <ScrollToTopBottom />

            {/* <ConfirmModalComponent 
                confirmProcess={continueStorySubmission} 
                openConfirmModal={openConfirmModal} 
                setOpenConfirmModal={setOpenConfirmModal}
                title="All Done" 
                subtitle="Let's go!"
                buttonText="Submit"
            /> */}

            <AddAddressModal
                user={user}
                error={error}
                setUserAddress={setUserAddress}
                confirmProcess={continueStorySubmission} 
                openConfirmModal={openConfirmModal} 
                setOpenConfirmModal={setOpenConfirmModal}
                title="All Done" 
                subtitle="Kindly add your payment address before submission"
                buttonText="Submit"
            />

            <SuccessModal animation={animationData} title="Story created" />

        </div>
    )
}

export default UserSummary