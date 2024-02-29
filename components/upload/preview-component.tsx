"use client"

import { useContext, useState } from "react";
import { Button } from "../ui/button";
import { AppContext } from "@/context/StoryContext"
import Image from "next/image";

const PreviewComponent = () => {

    const { 
        inPreview, challengeTitle,
        challengeDate, challengeTime, 
        challengePrice, challengeCurrencySymbol 
    } = useContext(AppContext)
    
    const parseDateTime = (date: string, time: string) => {
        if (!date || !time) return null;

        const [year, month] = date.split('-').map(Number);
        const [hours, minutes] = time.split(':').map(Number);
        return new Date(year, month - 1, 1, hours, minutes);
    }

    function getTimestamp(date: string, time: string) {
        if (!date || !time) {
            return null;
        }
    
        const dateTimeString = `${date}T${time}:00`;
        const timestamp = new Date(dateTimeString).getTime();
        return timestamp;
    }

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

    // console.log("parseDateTime: ", parseDateTime(challengeDate, challengeTime))
    // console.log("timestamp: ",getTimestamp(challengeDate, challengeTime));
    // console.log("formatDate: ",formatDate(challengeDate, challengeTime));
    

    return (
        <>
            <div className="flex justify-center">
                { !inPreview && 
                    <div className="flex items-center justify-center bg-gray-400 rounded-full" style={{ width: "300px", height: "300px" }}>
                        <p className="text-xs text-white">Preview</p> 
                    </div>
                }

                { inPreview && 
                    <div id="preview-box" className="overflow-hidden" style={{ width: "300px", height: "300px" }}>
                        <Image src="/" 
                        width="100"   
                        height="100"  
                        layout="fill"
                        alt="preview" 
                        id="preview" 
                        style={{ border: "5px solid #7c9bff", padding: "4px" }}
                        className="w-full h-full rounded-full"
                    />

                    </div>
                }   

            </div>
            <div className="mt-5">
                <p className="text-xl font-bold text-center">{challengeTitle}</p>
            </div>
            <div>
                {
                    (challengeDate || challengeTime) &&
                    <div className="my-7">
                        {/* <p className="mb-1 text-sm text-gray-600">This challenge will expire on:</p> */}
                        <h2 className="text-center text-lg p-3  ">
                            {formatDate(challengeDate, challengeTime)}
                        </h2>
                    </div>
                }

                <h2 className="text-center text-3xl font-bold mt-5 text-gray-700 ">
                    {challengeCurrencySymbol}{challengePrice}
                </h2>
            </div>
        </>
    )
}

export default PreviewComponent