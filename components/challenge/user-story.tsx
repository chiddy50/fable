const UserStory = ({ clickEvent }) => {
    return (
        <div onClick={clickEvent} className="flex items-center cursor-pointer gap-4 mb-3 border rounded-xl transition-all bg-gray-300 p-3 hover:border-gray-400">
            <div className="w-10 h-10 rounded-full bg-gray-900 ">

            </div>
            <div>
                <p className="mb-3 font-bold">
                    Challenge: This is the end
                </p>
                <p className="text-xs mb-1">
                    Price: $100
                </p>
                <p className="text-xs">
                    Submitted 2 days ago
                </p>
            </div>
        </div>
    )
}

export default UserStory