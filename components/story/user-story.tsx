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
        <div onClick={clickEvent} className="relative flex items-center cursor-pointer gap-4 mb-3 border rounded-xl transition-all bg-gray-800 py-3 xs:px-4 sm:px-5 md:px-7 border-gray-400 hover:border-white">
            <div className="flex items-center justify-center rounded-full bg-white 
            xs:w-16 xs:h-16 sm:w-16 sm:h-16 md:w-20 md:h-20">
                {story.award === 'FIRST' && 
                <div className="tooltip">
                    <i className='bx bxs-medal text-yellow-600 xs:text-4xl sm:text-4xl md:text-6xl'></i>
                    <span className="tooltiptext text-xs">Winner</span>
                </div>
                }
                {story.award === 'SECOND' && 
                <div className="tooltip">
                    <i className='bx bxs-medal text-gray-900 xs:text-4xl sm:text-4xl md:text-6xl'></i>
                    <span className="tooltiptext text-xs">Second Place</span>
                </div>
                }
                {story.award === 'THIRD' && 
                <div className="tooltip">
                    <i className='bx bxs-medal text-orange-600 xs:text-4xl sm:text-4xl md:text-6xl'></i>
                    <span className="tooltiptext text-xs">Third Place</span>
                </div>
                }                
                {story.award === 'RECOGNIZED' && 
                <div className="tooltip">
                    <i className='bx bxs-star text-yellow-500 xs:text-4xl sm:text-4xl md:text-5xl'></i>
                    <span className="tooltiptext text-xs">Honorable Mention</span>
                </div>
                }                
                {story.award === null && 
                <div className="tooltip">
                    <i className='bx bxs-hourglass text-gray-600 xs:text-4xl sm:text-4xl md:text-5xl'></i>
                    <span className="tooltiptext text-xs">Submitted</span>
                </div>
                }                                
            </div>
            <div className="text-gray-300 w-max">
                <p className="mb-2 uppercase font-bold xs:text-md sm:text-lg md:text-xl">
                    {story.challenge.title}
                </p>
                <p className="xs:text-[10px] sm:text-[10px] md:text-[14px] mb-1">
                    Duration: <CountdownComponent date={`${story.challenge.date}`} />

                </p>
                <p className="xs:text-[10px] sm:text-[10px] md:text-[15px] font-bold mb-3">
                    Price: {story.challenge.symbol}{story.challenge.price}
                </p>
                <div className="flex justify-between gap-10 items-center w-full">
                    <p className="text-xs">
                        Submitted {formatDate(story.createdAt)}
                    </p>
                </div>
                {/* { getReward() && <button className=" absolute top-2 right-2 py-2 px-4 bg-blue-600 text-white rounded-xl text-xs">Claim Reward</button>} */}
            </div>
        </div>
    )
}

export default UserStory