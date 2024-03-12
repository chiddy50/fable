import { useRouter } from 'next/navigation';

import CountdownComponent from "@/components/general/countdown-component"
import { formatDistanceToNow } from 'date-fns';
import Image from 'next/image';
import { Button } from '../ui/button';

export default function Challenge({ challenge, clickEvent, type }){
    const router = useRouter();

    const moveToChooseChallenge = () => {
        router.push('/start')
    }

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
    
    
    return (
        <div className="responsive h-full " >
            
            {/* <div className='flex h-full flex-col rounded-xl bg-white border-none shadow-sm border-gray-200 border cursor-pointer transition-all hover:shadow-2xl'> */}
            <div className='flex h-full flex-col rounded-xl bg-white border-none border-gray-200 border'>
    
                <img
                    src={challenge.image}
                    className='w-full rounded-t-xl h-1/2'                     
                    alt="Picture of the image"
                />
                 <div className="h-1/2 p-4 flex flex-col justify-between">
                    <h2 className='font-semibold text-md mb-2'>{challenge.title}</h2>
                    <p className='text-xs mb-1'>Bounty: {challenge.symbol}{challenge.price}</p>
                    <p className='text-xs mb-2'>Posted: { formatDate(challenge.createdAt) }</p>
                    <p className='text-xs  '>
                        <CountdownComponent date={`${challenge.date} ${challenge.time}`} />
                    </p>
                    <div className="flex justify-end">
                        <p className='flex items-center gap-2'>
                            <i className="bx bx-heart"></i>
                            <span className='text-xs'>{challenge.stories.length ? challenge.stories.length : 0}</span>
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

                 </div>
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