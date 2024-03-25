"use client"

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Challenge from '@/components/challenge/challenge'
import AdminChallenges from '@/components/challenge/admin-challenges';
import { useDynamicContext } from "@dynamic-labs/sdk-react-core"

export default function ChallengesPage() {

    const router = useRouter();
    const { sdkHasLoaded } = useDynamicContext()

    if (!sdkHasLoaded) {
        return (
            <div>Loading...</div>
        )
    }

    if (sdkHasLoaded) {
        return (
            <div className='layout-width '>
                <div className=""  style={{ marginTop: "10rem" }}>
                    <h1 className=' text-white mb-7 font-bold xs:text-lg sm:text-lg md:text-3xl'>Here are your challenges</h1>
                </div>
                <div className=' rounded-2xl p-5 mb-10'>
                    <AdminChallenges />
                </div>
    
                
            </div>
        )
    }
}
