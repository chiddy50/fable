"use client"

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Challenge from '@/components/challenge/challenge'
import ConfirmStartChallenge from '@/components/challenge/confirm-start';
import axios from 'axios';
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from '@/components/ui/use-toast';


const UserChallenges = () => {

    const [challengesData, setChallengesData] = useState([])
    const [loading, setLoading] = useState(false)
    const [selectedChallenge, setSelectedChallenge] = useState(false)
    
    const promptStartChallenge = (challenge: any) => {
        console.log(challenge);

        const timeExpired = isDateTimePast(challenge.date, challenge.time)
        if (timeExpired) {
            toast({
                title: "Challenge expired",
                description: "Challenge expired",
            })
            return
        }

        setSelectedChallenge(challenge)
        const confirmStartModal = document.getElementById("confirm-start-modal");
        if (confirmStartModal) {            
            confirmStartModal.style.display = "block";
        }
    }

    function isDateTimePast(dateString, timeString) {
        // Parse the date and time strings
        const [year, month, day] = dateString.split("-");
        const [hours, minutes] = timeString.split(":");
        
        // Create a Date object for the input datetime
        const dateTime = new Date(year, month - 1, day, hours, minutes);
    
        // Get the current date and time
        const currentDate = new Date();
    
        // Compare the input datetime with the current datetime
        return currentDate.getTime() > dateTime.getTime();
    }

    // useEffect(() => {
    //     fetchChallenges()
    // }, [])

    const fetchChallenges = async () => {        
        try {   
            setLoading(true)         
            let response = await axios.get("/api/auth/user/challenges")
            setChallengesData(response?.data?.data);
        } catch (error) {
            console.log(error);            
        }finally{
            setLoading(false)         
        }
        
    }

    const buttonLabels = [1,2,3,4,5,6,7,8];

    return (
        <>        
            { loading && <div className='grid grid-cols-4 gap-5'>
                {
                    buttonLabels.map((label, index) => (
                        <div key={index} className="flex flex-col space-y-3">
                            <Skeleton className="h-[125px] w-[250px] rounded-xl" />
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-[250px]" />
                                <Skeleton className="h-4 w-[200px]" />
                            </div>
                        </div>
                    ))
                }

            </div>}
            
            {!loading && <div className='grid grid-cols-4 gap-5'>
                {
                    challengesData.map((challenge, index) => (

                        <Challenge key={index} clickEvent={() => promptStartChallenge(challenge)} challenge={challenge} />

                    ))
                }
               
            </div>}

            <ConfirmStartChallenge challenge={selectedChallenge}/>
        </>
    )
}

export default UserChallenges