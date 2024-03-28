"use client"

import { cn } from "@/lib/utils"


const StoryAwardLegendComponent = ({ iconBgColor, icon, label }) => {
    return (
        <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center">
                <i className={cn(
                    'text-lg',
                    iconBgColor,
                    icon
                )}></i>
            </div>
            <span className="text-xs text-gray-200">{label}</span>
        </div>
    )
}

export default StoryAwardLegendComponent