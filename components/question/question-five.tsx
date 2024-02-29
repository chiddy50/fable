const QuestionFive = ({ updateAnswer }) => {
    return (
        <div className="tab">
            <h1 className='mb-3 text-2xl font-bold'>Unveiling the Solution: Tracing the Character's Path to Resolution</h1>
              <div className='mb-3'>
                <p className='text-xs mb-1'>What inspired or led the character to discover their chosen solution?</p>
                <textarea rows={5} data-section={5} data-question={1} className='w-full border text-xs rounded-lg bg-gray-200 p-3 outline-none' onInput={(e) => updateAnswer(e)} ></textarea>
              </div>

              <div className='mb-3'>
                <p className='text-xs mb-1'>How does the character adapt or refine their solution as they encounter new challenges or information?</p>
                <textarea rows={5} data-section={5} data-question={2} className='w-full border text-xs rounded-lg bg-gray-200 p-3 outline-none' onInput={(e) => updateAnswer(e)} ></textarea>
              </div>

              <div className='mb-3'>
                <p className='text-xs mb-1'>What sacrifices or risks does the character face in implementing their solution, and how do they navigate these obstacles?</p>
                <textarea rows={5} data-section={5} data-question={3} className='w-full border text-xs rounded-lg bg-gray-200 p-3 outline-none' onInput={(e) => updateAnswer(e)} ></textarea>
              </div>         
        </div>  
    )
}

export default QuestionFive