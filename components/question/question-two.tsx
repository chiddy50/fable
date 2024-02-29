const QuestionTwo = ({ updateAnswer }) => {
    return (
        <div className="tab">
            <h1 className='mb-7 text-2xl font-bold'>Lets simplify the character</h1>
                <div className='mb-2'>
                <p className='text-xs mb-1'>What obstacles or challenges does the character face in achieving their goal?</p>
                <textarea rows={5} data-section={2} data-question={1} className='w-full border text-xs rounded-lg bg-gray-200 p-3 outline-none' onInput={(e) => updateAnswer(e)} ></textarea>
            </div>

            {/* <div className='mb-2'>
                <p className='text-xs mb-1'>What are the character's strengths and weaknesses?</p>
                <textarea rows={5} data-section={2} data-question={2} className='w-full border text-xs rounded-lg bg-gray-200 p-3 outline-none' onInput={(e) => updateAnswer(e)} ></textarea>
            </div> */}

            <div className='mb-2'>
                <p className='text-xs mb-1'>What motivates or drives the character to pursue their goal?</p>
                <textarea rows={5} data-section={2} data-question={3} className='w-full border text-xs rounded-lg bg-gray-200 p-3 outline-none' onInput={(e) => updateAnswer(e)} ></textarea>
            </div>
            
            <div className='mb-2'>
                <p className='text-xs mb-1'>What conflicts or relationships shape the characters journey?</p>
                <textarea rows={5} data-section={2} data-question={4} className='w-full border text-xs rounded-lg bg-gray-200 p-3 outline-none' onInput={(e) => updateAnswer(e)} ></textarea>
            </div>            
        </div>  
    )
}

export default QuestionTwo