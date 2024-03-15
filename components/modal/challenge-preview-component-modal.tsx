"use client"

import ChallengePreviewComponent from "@/components/challenge/challenge-preview-component"


const ChallengePreviewComponentModal = () => {
    const hideModal = ()  => {
        document.getElementById('challenge-preview-component-modal').style.display = 'none'
    }

    return (
        <div id="challenge-preview-component-modal" className="sidenav-background">
            <div className="sidenav bg-gray-200 shadow-xl z-20 p-7 xs:w-[100%] sm:w-[95%] md:w-[80%] lg:w-[80%]">
                <div onClick={hideModal} className="flex items-center gap-2 cursor-pointer">
                    <i className='bx bx-arrow-back text-2xl' ></i>
                    <p className='text-xs'>Return to Form</p>
                </div>

                <div className="flex justify-center mt-5">
                    <ChallengePreviewComponent />                
                </div>
                
            </div>

        </div>
    )
}

export default ChallengePreviewComponentModal