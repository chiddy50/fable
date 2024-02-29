"use client"

import { useContext, useRef, useState, useTransition } from "react";
import CountdownComponent from "@/components/general/countdown-component";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { formatDistanceToNow } from 'date-fns';
import { AppContext } from "@/context/StoryContext";

const ConfirmStartChallenge = ({ challenge }) => {
    const router = useRouter();

    const { setSelectedChallenge } = useContext(AppContext)

    const modalRef = useRef(null);
    const closeModal = () => {        
        modalRef.current.style.display = 'none'
    }

    const formatDate = (targetDate: string) => {
        try {            
            let format = formatDistanceToNow(new Date(targetDate), { addSuffix: true })
            return format ?? '';        
        } catch (error) {
            return ''
        }
    }

    const moveToStart = () => {
        setSelectedChallenge(challenge)
        router.push(`/user/start/${challenge.id}`)
    }

    return (
        <div id="confirm-start-modal" ref={modalRef} className="modal fixed z-10 left-0 top-0 w-full h-full overflow-auto">
            {challenge && <div className="md-modal-content py-5 px-7 rounded-xl shadow-md ">
                
                <div className="flex justify-end items-center mb-2">
                    {/* <h1 className='text-xl font-bold'>Sign in</h1> */}
                    <i onClick={() => closeModal()} className='bx bx-x text-gray-500 text-3xl hover:text-black cursor-pointer'></i>
                </div>
                
                <div className="flex gap-5">
                    <div className="rounded-xl" style={{ width: "190px", height: "190px" }}>
                        <img
                            src={challenge.image}
                            className='w-full h-auto rounded-xl'                     
                            alt="Picture of the image"
                        />    
                    </div> 
                         
                    <div>
                        <h1 className="font-bold mb-4 text-2xl ">{challenge.title}</h1>    
                        <p className="text-2xl mb-1">{challenge.symbol}{challenge.price}</p>    
                        <p className='text-xs mb-2'>Posted: { formatDate(challenge.createdAt) }</p>
                        <p className="text-xs text-blue-500 mb-2">
                            <CountdownComponent date={`${challenge.date} ${challenge.time}`} />
                        </p>
                        
                        <p className='flex items-center gap-2'>
                            <i className="bx bx-heart"></i>
                            <span className='text-xs'>{challenge.stories.length ? challenge.stories.length : 0}</span>
                        </p>
      

                    </div>         
                </div>
                <div>
                    <Button onClick={() => moveToStart()}>Start</Button>
                </div>

            </div>}
        </div>
    )
}

export default ConfirmStartChallenge