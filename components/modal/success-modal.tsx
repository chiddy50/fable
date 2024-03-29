"use client"

import { useContext, useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import Lottie from 'react-lottie';

export default function SuccessModal({ animation, title }){
    const modalRef = useRef(null);

    const defaultOptions = {
        loop: true,
        autoplay: true, 
        animationData: animation,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
    };

    const closeModal = () => {        
        modalRef.current.style.display = 'none'
    }

    return (
        <div id="success-modal" ref={modalRef} className="modal fixed z-10 left-0 top-0 w-full h-full overflow-auto">
            <div className="modal-content bg-white p-5 rounded-xl shadow-md ">

                <div>
                    <h1 className="text-center text-gray-600 text-xl mb-5 font-bold">
                        {title}
                    </h1>

                    <div className="flex justify-center mb-3">
                        {/* <i className='bx bx-party bx-tada text-[6rem] text-green-600' ></i> */}
                        <div className="w-[60%]">                            
                            <Lottie options={defaultOptions}
                                // height={200}
                                // width={200}                        
                                isStopped={false}
                                isPaused={false}/>
                        </div>
                    </div>

                    <Button className="w-full" onClick={() => closeModal()}>Cancel</Button>
                </div>
                 
            </div>
        </div>
    )
}