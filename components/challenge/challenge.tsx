import { useRouter } from 'next/navigation';

import CountdownComponent from "@/components/general/countdown-component"
import { formatDistanceToNow } from 'date-fns';
import Image from 'next/image';

export default function Challenge({ challenge, clickEvent }){
    const router = useRouter();

    const moveToChooseChallenge = () => {
        router.push('/start')
    }

    const formatDate = (targetDate: string) => {
        let format = formatDistanceToNow(new Date(targetDate), { addSuffix: true })
        return format ?? '';        
    }
    
    return (
        <div className="responsive" onClick={clickEvent}>
            
            <div className='flex h-full flex-col rounded-xl shadow-sm border-gray-200 border cursor-pointer transition-all hover:shadow-2xl'>
    
                <Image
                    src={challenge.image}
                    className='w-full rounded-t-xl h-1/2'                     
                    alt="Picture of the image"
                />
                 <div className="h-1/2 p-4">
                    <h2 className='font-bold text-md'>{challenge.title}</h2>
                    <p className='text-xs mt-3'>Bounty: {challenge.symbol}{challenge.price}</p>
                    <p className='text-xs mt-1'>Posted: { formatDate(challenge.createdAt) }</p>
                    <p className='text-xs mt-3 text-blue-600'>
                        <CountdownComponent date={`${challenge.date} ${challenge.time}`} />
                    </p>
                    <div className="flex justify-end">
                        <p className='flex items-center gap-2'>
                            <i className="bx bx-heart"></i>
                            <span className='text-xs'>{challenge.stories.length ? challenge.stories.length : 0}</span>
                        </p>
                    </div>
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