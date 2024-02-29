"use client"

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Challenge from '@/components/challenge/challenge'
import AdminChallenges from '@/components/challenge/admin-challenges';

export default function ChallengesPage() {

    const router = useRouter();

    return (
        <div className='layout-width '>
            <div className="p-10">
                <h1 className='text-3xl text-center mb-7 font-bold'>Here are your challenges:</h1>
                
                <AdminChallenges />

            </div>
            
        </div>
    )
}
