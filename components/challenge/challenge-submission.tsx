"use client"

import { formatDistanceToNow } from "date-fns";

const ChallengeSubmission = ({ moveToSummary, submission }) => {
    const formatDate = (targetDate: string) => {
        let format = formatDistanceToNow(new Date(targetDate), { addSuffix: true })
        return format ?? '';        
    }
    return (
        
        <div 
        onClick={() => moveToSummary(submission)}
        className="p-4 bg-gray-100 flex items-center 
        gap-3 border border-gray-200 
        transition-all cursor-pointer rounded-xl 
        hover:border 
        hover:border-gray-400
        hover:bg-gray-200
        mb-3
        ">
            <div className='rounded-full w-10 h-10 bg-gray-700 flex justify-center text-white items-center'>
                <i className="bx bx-user"></i>
            </div>

            <div>
                <h1 className="font-bold mb-2">{submission?.user?.name}</h1>
                <p className='text-xs mb-1 text-gray-600'>Submitted { formatDate(submission.createdAt) }</p>
            </div>
        </div>
    )
}

export default ChallengeSubmission