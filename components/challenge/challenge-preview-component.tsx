"use client"

import { useRouter } from 'next/navigation';

import CountdownComponent from "@/components/general/countdown-component"
import { formatDistanceToNow } from 'date-fns';
import Image from 'next/image';
import { Button } from '../ui/button';
import { useEffect, useState,useContext } from 'react';
import {
    // Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import TooltipComponent from '@/components/TooltipComponent';
import axios from 'axios';

import { AppContext } from "@/context/StoryContext"

const ChallengePreviewComponent = () => {
    const { 
        inPreview, challengeTitle,
        challengeDate, challengeTime, challengeDescription,
        challengePrice, challengeCurrencySymbol, 
    } = useContext(AppContext)

    function formatDate(date: string, time: string) {
        let formattedDate = "";
        if (date && time) {
            const dateTimeString = `${date}T${time}:00`;
            const datetime = new Date(dateTimeString);
            formattedDate = datetime.toLocaleString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
                hour: "numeric",
                minute: "numeric",
                second: "numeric",
            });
        } else if (date) {
            const datetime = new Date(date);
            formattedDate = datetime.toLocaleString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
            });
        } else if (time) {
            const datetime = new Date(`1970-01-01T${time}:00`);
            formattedDate = datetime.toLocaleString("en-US", {
                hour: "numeric",
                minute: "numeric",
                second: "numeric",
            });
        }
        return formattedDate;
    }
    
    return (
            
        <div className='flex  flex-col rounded-xl bg-white border-none border-gray-200 border xs:w-[90%] sm:w-[90%] md:w-[90%] lg:w-[70%]'>
            
            <img
                src={'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAN4AAACUCAMAAADLemePAAAAMFBMVEXx8/XCy9L09ve/yNDGztXN1Nrs7/HT2d/o6+7Z3uPh5enJ0dfk6Ovc4eXQ19zV299BB7LwAAAEOElEQVR4nO2a2baDIAwAkU0Utf//t9e17gUCgtyTea7LNBgSgBT/GpL6BZ4F9XIG9XIG9XIG9XIG9XIG9XIG9XIG9XIG9XIG9XIG9XIG9XIG9XIG9XIG9XIG9XIG9XIG9eLDgt3pXXq84KKsqupTdpqHuOF79BgXn0YRukBUW2rO/CL5Fj3Gq0GNbKFUqkp4Cb5Dj+lakr3bbEikKj0E36DHivZKbVWswLdOr9cPy8vA7QU1LILJ9ZhQBrlRUFYcIphaj1XSwm4U/AD8Uus1dnKjoHIPYFI9pi1Dtwg6j9CUeky42Q0BFG5+CfVYJ93kBj/i9gUm1Cud5UZql4o7nV7pODC/AZQOAzSVHgPGjowD1PoxifRYB7YbaG2fk0hPeNkR2lg+x1ePQcp5xv3shg/Qrtv10us70LLshPviget8d+VnlWA89Jhuxw5UNqXjlQ6V2D2ys3gSXI99vx9KbD+FiZ/dnQOdOX5gPbadt6jLbapAdoSWRj+oHtvnPqqAF/r5GSs0cPSaw6PM/+RkFyCtbDD5QfVOMbANX5C0Yu0H1TulB7tEzdqgcsbvD6jHjmPTPE5G/Goxdz+o3qlVo5WFHrdZNnLl1/wH1VMQPRb4w5sR4fXOg9OcOhm0xTOhQ+sVn1NquX/Ggn5Grud2hQmqd3pVi7rsHPFQ3C4Rgqf1+hA+cwFYPWbX9383/RFYT+9yJ22Nds8NzR/Ph5fUfONHa3NecV/1C+Dn0RDxZt7ZodI8KbBQXdCt32VZ4dWtd+0w/SmL3amQfcIdV1+/32JEwXusfnoqA8IjL/7lSCtlTw/NAarO/3QcvQhDc/BrTuGLo/dEJX3ld0qfMfRYsNUVI8fC91ovyImgLzqa3amp3umxQnftdDCoz/f1R/Agx7siZM2FY3rZ6LGiq+XmYNBw7qkuQQcSdjxYa1747eunVW+tQra/JrL2PNf1aK154bf7/FY9cXt4pgGemRm5aHwfZvu2ix479acbqAJsk8z3jZc1F7abR4ueqayoHY8kLHaRh+b0ric94/IjlU5b9l8iZs2Vdcdq1LMbQdJiR+YYvKhZc+U7PAc9216MuuaYGG3QJXJ5TzJs49t+/VQ6blRGqjXPL7oUn2Q4+uRwYf3bZx+843JTRObZjxTcaRHE4VgeE+nsyFycEecdKYs90YkUc8L6llPvR35N5zdXtlYNBU8yJ6xvOS4tga5UNhk09E6eM8NLAi811jCPbZdYM273Q681bVZGbGFv6WcH6KX096k1/eyatCUCrDfsWtwHMHFamemHp8fV6r7GfmYX1hnqVfJeLQuPaSVVLRYWer2px18SuwBcJFD9P2I3cdz6gpzefzP7Jv7xbbzYUCmKaaWQFbwMeh7uFVBSf4TmXIvqP311K5RIqZSS9F/aIQiCIAiCIAiCIAiCIAiCIAiCIAiCIAiCICn4A49MS2/QrYSCAAAAAElFTkSuQmCC' }
                className='w-full rounded-t-xl h-1/2'                     
                alt="Picture of the image"
            />
            <div className="h-1/2 p-4 flex flex-col justify-between">
                <h2 className='font-semibold text-md mb-2'>{challengeTitle}</h2>
                {challengeDescription && 
                    <div className='mb-2'>
                        <p className='font-semibold text-xs mb-1'>Description</p>                        
                            <p className='text-xs text-gray-500'>
                                {challengeDescription}
                            </p>
                    </div>
                }
                {(challengeCurrencySymbol || challengePrice) && <p className='text-xs mb-1'>Bounty: {challengeCurrencySymbol}{challengePrice}</p>}
                {(challengeDate || challengeTime) && <p className='text-xs mb-2'>Expires: {formatDate(challengeDate, challengeTime)}</p>}
                <p className='text-xs pt-5'>
                    {/* <CountdownComponent date={`${challenge.date} ${challenge.time}`} /> */}
                </p>
                

                {/* <Button className='bg-purple-600 w-full mt-4'>Save</Button> */}

            </div>
        </div>
        
    )
}

export default ChallengePreviewComponent