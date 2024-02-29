"use client"

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Challenge from '@/components/challenge/challenge'
import ConfirmStart from '@/components/challenge/confirm-start';
import ConfirmStartChallenge from '@/components/challenge/confirm-start';
import UserChallenges from '@/components/challenge/user-challenges';

export default function ChallengesPage() {

    return (
        <div className='layout-width '>
            <div className="p-10">
                <h1 className='text-3xl text-center mb-7 font-bold'>Choose your challenge:</h1>
                
                <UserChallenges />

            </div>

        </div>
    )
}
