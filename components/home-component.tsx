"use client";
import { Button } from "@/components/ui/button"

import { useRouter } from 'next/navigation';
import { Bangers } from "next/font/google"
import { cn } from "@/lib/utils"

const bangers = Bangers({
    subsets: ["latin"],
    weight: ["400"]
})

export default function HomeComponent() {
    const router = useRouter();

    const moveToOptions = () => {
        router.push('/options')
    }

    return (
        <div className="space-y-6 text-center">
            <h1 className={cn(
                "welcome__txt text-black drop-shadow-md",
                bangers.className
            )}>
            FABLE
            </h1>
            <p className="text-gray-800 text-lg">It&apos;s all about evoking the art of storytelling and the power of imagination</p>

            <div>
            {/* <LoginButton>
                <Button variant="secondary" size="lg">
                Let's go!
                </Button>
            </LoginButton> */}
            <Button onClick={moveToOptions} variant="default" size="lg">
                Let&apos;s go!
            </Button>
            </div>
        </div>
    )
}