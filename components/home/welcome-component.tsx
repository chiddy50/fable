"use client";
import { Button } from "@/components/ui/button"

import { useRouter } from 'next/navigation';
import { Bangers } from "next/font/google"
import { cn } from "@/lib/utils"

const bangers = Bangers({
    subsets: ["latin"],
    weight: ["400"]
})

export default function WelcomeComponent() {
    const router = useRouter();

    const moveToOptions = () => {
        router.push('/options')
    }

    return (
        <div className="space-y-6 text-center">
            <h1 className={cn(
                "welcome__txt text-white drop-shadow-md",
                bangers.className
            )}>
            FABLE
            </h1>
            <p className="text-white text-lg">It's all about evoking the art of storytelling and the power of imagination</p>

            <div>
            {/* <LoginButton>
                <Button variant="secondary" size="lg">
                Let's go!
                </Button>
            </LoginButton> */}
            <Button onClick={moveToOptions} variant="secondary" size="lg">
                Let's go!
            </Button>
            </div>
        </div>
    )
}