"use client"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"


const UserSubmissionSummary = ({ selectedStory }) => {
    const hideModal = ()  => {
        document.getElementById('submission-summary-modal').style.display = 'none'
    }
    return (
        <div id="submission-summary-modal" className="sidenav-background">
            <div className="sidenav bg-[#1c1c1c] text-gray-200 shadow-xl z-20 p-7 xs:w-[100%] sm:w-[95%] md:w-[50%] lg:w-[50%]">
                <div onClick={hideModal} className="flex items-center gap-2 cursor-pointer">
                    <i className='bx bx-arrow-back text-2xl' ></i>
                    <p className='text-xs'>BACK</p>
                </div>
                <h1 className="text-2xl font-bold mb-10 mt-5">Story</h1>
                
                {
                    selectedStory?.story.map((questionGroup: any, index: number) => (

                        <Accordion type="single" collapsible className="w-full mb-5 relative" key={index}>
                                    
                            <AccordionItem value={`item-${1}`} 
                            className="border-[#343434] bg-[#232323] border text-gray-100 py-1 px-5 mt-2 rounded-xl"
                            >
                                <AccordionTrigger className='pb-2'>
                                    {/* <span className="font-semibold text-lg">{questionGroup.title}</span> */}
                                    <p className="font-bold"> Click to read</p>
                                </AccordionTrigger>
                                {/* <div  className='mb-2'>
                                    {questionGroup.questions.map((question: any, questionIndex: number) => (
                                        <p className=" text-[10px]"> - {question.name}</p>
                                    ))}
                                </div> */}
                                
                                <AccordionContent className="text-xs">
                                    {questionGroup.answer}
                                </AccordionContent>
                            </AccordionItem>
                            
                        </Accordion>
                    ))
                }
            </div>

        </div>
    )
}

export default UserSubmissionSummary