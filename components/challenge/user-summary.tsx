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


const UserSummary = () => {
    const { push } = useRouter()
    const { story, userLoggedIn, user, selectedChallenge } = useContext(AppContext)

    const [openConfirmModal, setOpenConfirmModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [userAddress, setUserAddress] = useState(null);
    const [error, setError] = useState("");
    let token = getCookie('token');

    console.log({story});
    
    const submitStoryData = () => {
        // console.log(user);
        
        if (!userLoggedIn) {
            bringUpAdminLoginModal()
            return           
        }

        setOpenConfirmModal(true);
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
                    Authorization: `Bearer ${token}`
                }
            })
            console.log(res);
            localStorage.removeItem("question") 
            push(`/user/stories`)
            
        } catch (error) {
            console.log(error);
            
        }finally{
            hideTransferLoader()
        }
    }

    
    return (
        <div className="layout-width">
            <div className="mt-7">
                <i onClick={() => push(`/user/start/${selectedChallenge.id}`)} className='bx bx-arrow-back text-4xl cursor-pointer hover:text-gray-600'></i>
            </div>
            <h1 className="text-center text-4xl font-bold mb-10">
                Summary
            </h1>

            <div className="mb-4">

                {
                    story.map((questionGroup: any, index: number) => (

                        <Accordion type="single" collapsible className="w-full mb-10" key={index}>
                            <h1 className="text-xl font-semibold text-gray-400">{questionGroup.title}</h1>

                            {questionGroup.questions.map((question: any, questionIndex: number) => (

                                <AccordionItem key={questionIndex} value={`item-${questionIndex}`} 
                                className="bg-gray-100 py-1 px-5 mt-2 rounded-xl"
                                >
                                    <AccordionTrigger>
                                        <span className="font-semibold text-md">{question.name}</span>
                                    </AccordionTrigger>
                                    <AccordionContent className="text-xs">{question.answer}</AccordionContent>
                                </AccordionItem>
                            ))}
                            
                        </Accordion>
                    ))
                }
                
            </div>

            <div className="pb-10" onClick={submitStoryData}>
                <Button>Proceed</Button>
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


        </div>
    )
}

export default UserSummary