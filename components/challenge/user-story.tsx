"use client"
import { formatDate } from "@/lib/helper";
import CountdownComponent from "../general/countdown-component";

const UserStory = ({ clickEvent, story }) => {
    return (
        <div onClick={clickEvent} className="flex items-center cursor-pointer gap-4 mb-3 border rounded-xl transition-all bg-gray-200 p-3 hover:border-gray-400">
            <div className="w-20 h-20 rounded-full bg-gray-900 ">

            </div>
            <div>
                <p className="mb-2 uppercase font-bold">
                    {story.challenge.title}
                </p>
                <p className="text-xs mb-1">
                    Duration: <CountdownComponent date={`${story.challenge.date} ${story.challenge.time}`} />

                </p>
                <p className="text-xs mb-3">
                    Price: {story.challenge.symbol}{story.challenge.price}
                </p>
                <p className="text-[10px]">
                    Submitted {formatDate(story.createdAt)}
                </p>
            </div>
        </div>
    )
}

export default UserStory