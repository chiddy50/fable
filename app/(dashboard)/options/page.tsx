"use client"

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';


const OptionsPage = () => {

    const { push } = useRouter();

    const navigateToChooseChallengePage = () => {
        push('/user/challenges')
    }

    const navigateToCreateChallengePage = () => {
        push('/admin/challenge/create')
    }

    return (
        <div className="flex h-full flex-col items-center justify-center">

            <div className="w-1/2">
                <div className='text-center mb-5'>
                    <h1 className='text-3xl text-white mb-2 font-bold'>Choose Your Adventure</h1>
                    <p className='text-sm text-white'>Select how you want to participate</p>
                </div>
                <div>
                    <button onClick={navigateToChooseChallengePage} className="font-semibold text-sm shadow-sm rounded-2xl outline-none w-full text-gray-700 bg-white text-center p-5 hover:bg-slate-300 mb-3">
                        View Challenges
                    </button>

                    <button onClick={navigateToCreateChallengePage} className="font-semibold shadow-sm text-sm rounded-2xl outline-none w-full text-gray-700 bg-white text-center p-5 mb-4 hover:bg-slate-300">
                        Add a Challenge
                    </button>
                </div>
            </div>

        </div>
    )
}

export default OptionsPage