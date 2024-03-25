import { useRouter } from 'next/navigation';

import CountdownComponent from "@/components/general/countdown-component"
import { formatDistanceToNow } from 'date-fns';
import Image from 'next/image';
import { Button } from '../ui/button';
import { useEffect, useState } from 'react';
import {
    // Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import TooltipComponent from '@/components/TooltipComponent';
import axios from 'axios';

export default function Challenge({ challenge, clickEvent, type }){
    const router = useRouter();

    const [hasFirst, setHasFirst] = useState(false);
    const [hasSecond, setHasSecond] = useState(false);
    const [hasThird, setHasThird] = useState(false);

    const moveToChooseChallenge = () => {
        router.push('/start')
    }

    useEffect(() => {
        checkAwards(challenge.stories)
    }, [])

    const formatDate = (targetDate: string) => {
        let format = formatDistanceToNow(new Date(targetDate), { addSuffix: true })
        return format ?? '';        
    }

    function challengeExpired(dateString: string, timeString:string) {
        // Combine date and time strings into a single string
        const dateTimeString = dateString + 'T' + timeString + ':00';
    
        // Create a Date object for the provided date and time
        const challengeDateTime = new Date(dateTimeString);
    
        // Get the current date and time
        const currentDateTime = new Date();
    
        // Check if the challenge date and time is less than the current date and time
        return challengeDateTime < currentDateTime;
    }

    const checkAwards = (stories) => {
        if (!stories.length) {
            return null;
        }
        
        stories.forEach(story => {
            console.log({story});
            
            if (story.award === 'FIRST') {
                setHasFirst(true)
            }
            if (story.award === 'SECOND') {
                setHasSecond(true)
            }
            if (story.award === 'THIRD') {
                setHasThird(true)
            }
        });
    }
    
    const burn = async (nftId,projectId) => {

        if (!nftId || !projectId) {
            console.log({nftId,projectId});
            // return
        }
        try {
            const config = {
                headers: {
                  Authorization: `Bearer ${process.env.NEXT_PUBLIC_UNDERDOG_API_KEY}`,
                },
            }
    
            const underdogApiEndpoint = process.env.NEXT_PUBLIC_UNDERDOG_API_URL
            
            const response = await axios.post(
                `${underdogApiEndpoint}/v2/projects/10/nfts/1/burn`, 
                {},
                config,
            ); 
            console.log(response);
            
            
            return response;
        } catch (error) {
            console.log(error);   
            return null; 
        }
    } 

    return (
        <div className="responsive h-full " >
            
            {/* <div className='flex h-full flex-col rounded-xl bg-white border-none shadow-sm border-gray-200 border cursor-pointer transition-all hover:shadow-2xl'> */}
            <div className='flex relative h-full flex-col shadow-xl border overflow-y-clip rounded-xl bg-white border-gray-500'>
    
                <img
                    src={challenge.image}
                    className='w-full rounded-t-xl h-1/2'                     
                    alt="Picture of the image"
                />
                <div className="h-1/2 p-4 flex flex-col  bg-[#3F4447] justify-between">
                    <h2 className='font-semibold text-lg text-white mb-2'>{challenge.title}</h2>
                    <p className='text-md text-gray-300 mb-1'>Bounty: {challenge.symbol}{challenge.price}</p>
                    <p className='text-[12px] text-gray-300 mb-2'>Posted: { formatDate(challenge.createdAt) }</p>
                    <p className='text-lg'>
                        <CountdownComponent date={`${challenge.date}`} />
                    </p>
                    <div className="flex justify-between mt-3">

                        <p className='flex items-center gap-2 text-gray-300'>
                            <i className='bx bx-book-open'></i>
                            <span className='text-xs'>{challenge._count.stories ? challenge._count.stories : 0}</span>
                        </p>
                    </div>

                    {  type === 'user' && challengeExpired(challenge.date, challenge.time) && 
                        <Button className='bg-red-600 w-full mt-4'>Expired</Button>
                    }
                    
                    { type === 'user' && !challengeExpired(challenge.date, challenge.time) && 
                    <Button onClick={clickEvent} className='bg-green-600 w-full mt-4'>Start</Button>
                    }

                    {  type === 'admin' && 
                        <Button onClick={clickEvent} className='bg-blue-600 w-full mt-4'>Submissions</Button>
                    }

                    {/* <Button onClick={() => burn(challenge.nftId, challenge.projectId)} className='bg-purple-600 w-full mt-4'>Burn</Button> */}


                </div>

                {(hasFirst || hasSecond || hasThird) &&<div className='flex items-center absolute top-1 right-1 bg-white p-1 rounded-xl'>
                    { hasFirst && 

                    <TooltipComponent>
                        <TooltipTrigger asChild>
                        <i className='bx bxs-medal bx-tada text-xl text-yellow-600'></i>
                        </TooltipTrigger>
                        <TooltipContent side='bottom'>
                            <p>First place awarded</p>
                        </TooltipContent>
                    </TooltipComponent>

                    }
                    { hasSecond && 
                        <TooltipComponent>
                            <TooltipTrigger asChild>
                            <i className='bx bxs-medal bx-tada text-xl text-gray-600'></i> 
                            </TooltipTrigger>
                            <TooltipContent side='bottom'>
                                <p>Second place awarded</p>
                            </TooltipContent>
                        </TooltipComponent>
                    }


                    { hasThird && 
                    <TooltipComponent>
                        <TooltipTrigger asChild>
                        <i className='bx bxs-medal bx-tada text-xl text-orange-600'></i> 
                        </TooltipTrigger>
                        <TooltipContent side='bottom'>
                            <p>Third place awarded</p>
                        </TooltipContent>
                    </TooltipComponent>
                    }
                    
                </div>}

             </div>
        </div>
    )

        //  <div onClick={moveToChooseChallenge} 
        //  className="p-4 bg-gray-100 flex items-center gap-3 border border-gray-200 transition-all cursor-pointer rounded-xl 
        //  hover:border 
        //  hover:border-gray-400
        //  hover:bg-gray-200
        //  ">
        //      <img
        //          src="/images/nft.jpeg"
        //          className='rounded-full'
        //          style={{ height: `${70}px`, width: `${70}px` }}
        //          alt="Picture of the image"
        //      />

        //      <div>
        //          <h1 className="font-bold mb-2">Disney's challenge</h1>
        //          <p className='text-xs mb-1 text-gray-600'>Duration: 2 days to go</p>
        //          <p className='text-xs text-gray-600'>Bounty: $350</p>
        //      </div>
        //  </div>
    
}