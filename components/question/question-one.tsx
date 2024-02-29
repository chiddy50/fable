const QuestionOne = ({ updateAnswer }) => {
    return (
        <div className="tab">
            <h1 className='mb-7 text-2xl font-bold'>Let&apos;s Focus On The Character?</h1>

            <div className='mb-2'>
            <p className='text-xs mb-1'>Who is the character?</p>
            <textarea 
            rows={5} 
            data-section={1} 
            data-question={1} 
            className='w-full border text-xs rounded-lg bg-gray-200 p-3 outline-none' 
            onInput={(e) => updateAnswer(e)
            } ></textarea>            
            </div>

            <div className='mb-2'>
            <p className='text-xs mb-1'>What do they want & Who has what they want?</p>
            <textarea rows={5} data-section={1} data-question={2} className='w-full border text-xs rounded-lg bg-gray-200 p-3 outline-none' onInput={(e) => updateAnswer(e)} ></textarea>        
            </div>

            {/* <div className='mb-2'>
            <p className='text-xs mb-1'>Who has what they want?</p>
            <textarea rows={5} data-section={1} data-question={3} className='w-full border text-xs rounded-lg bg-gray-200 p-3 outline-none' onInput={(e) => updateAnswer(e)} ></textarea>
            </div> */}

            <div className='mb-2'>
            <p className='text-xs mb-1'>Who happens if they don&apos;t get it?</p>
            <textarea rows={5} data-section={1} data-question={4} className='w-full border text-xs rounded-lg bg-gray-200 p-3 outline-none' onInput={(e) => updateAnswer(e)} ></textarea>
            </div>

        </div>
    )
}

export default QuestionOne