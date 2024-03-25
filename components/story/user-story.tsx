"use client"
import { formatDate } from "@/lib/helper";
import CountdownComponent from "../general/countdown-component";
import { Button } from "../ui/button";

const UserStory = ({ clickEvent, story }) => {
    const getReward = () => {
        if (story.award === 'FIRST' || story.award === 'FIRST' || story.award === 'FIRST') {
            return story.award;
        }

        return false;
    }
    return (
        <div onClick={clickEvent} className="relative flex items-center cursor-pointer gap-4 mb-3 border rounded-xl transition-all bg-gray-800 p-3 border-gray-400 hover:border-white">
            <div className="w-20 h-20 flex items-center justify-center rounded-full bg-white ">
                {story.award === 'FIRST' && <i className='bx bxs-medal text-6xl text-yellow-600'></i>}
                {story.award === 'SECOND' && <i className='bx bxs-medal text-6xl text-gray-600'></i>}
                {story.award === 'THIRD' && <i className='bx bxs-medal text-6xl text-orange-600'></i>}                
            </div>
            <div className="text-gray-300 w-max">
                <p className="mb-2 uppercase text-xl font-bold">
                    {story.challenge.title}
                </p>
                <p className="xs:text-[10px] sm:text-[10px] md:text-[14px] mb-1">
                    Duration: <CountdownComponent date={`${story.challenge.date}`} />

                </p>
                <p className="xs:text-[10px] sm:text-[10px] md:text-[15px] font-bold mb-3">
                    Price: {story.challenge.symbol}{story.challenge.price}
                </p>
                <div className="flex justify-between gap-10 items-center w-full">
                    <p className="text-[12px]">
                        Submitted {formatDate(story.createdAt)}
                    </p>
                </div>
                { getReward() && <button className=" absolute top-2 right-2 py-2 px-4 bg-blue-600 text-white rounded-xl text-xs">Claim Reward</button>}
            </div>
        </div>
    )
}

export default UserStory