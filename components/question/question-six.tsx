const QuestionSix = ({ updateAnswer }) => {
    return (
        <div className="tab">
            <h1 className='mb-7 text-2xl font-bold'>Counting the Costs: Delving into the Sacrifices for the Solution</h1>
            <div className='mb-3'>
            <p className='text-xs mb-1'>What personal sacrifices did the character make along their journey to finding the solution?</p>
            <textarea rows={5} data-section={6} data-question={1} className='w-full border text-xs rounded-lg bg-gray-200 p-3 outline-none' onInput={(e) => updateAnswer(e)} ></textarea>
            </div>

            {/* <div className='mb-3'>
            <p className='text-xs mb-1'>How did the character navigate moral dilemmas or ethical challenges while pursuing their solution?</p>
            <textarea rows={5} data-section={6} data-question={2} className='w-full border text-xs rounded-lg bg-gray-200 p-3 outline-none' onInput={(e) => updateAnswer(e)} ></textarea>
            </div> */}

            <div className='mb-3'>
            <p className='text-xs mb-1'>Were there any significant losses or setbacks the character experienced as a result of seeking their solution?</p>
            <textarea rows={5} data-section={6} data-question={3} className='w-full border text-xs rounded-lg bg-gray-200 p-3 outline-none' onInput={(e) => updateAnswer(e)} ></textarea>
            </div>

            <div className='mb-3'>
            <p className='text-xs mb-1'>In what ways did the character's relationships or connections change or evolve due to the sacrifices made for their solution?</p>
            <textarea rows={5} data-section={6} data-question={4} className='w-full border text-xs rounded-lg bg-gray-200 p-3 outline-none' onInput={(e) => updateAnswer(e)} ></textarea>
            </div>
        </div>
    )
}

export default QuestionSix