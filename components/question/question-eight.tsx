const QuestionEight = ({ updateAnswer }) => {
    return (
        <div className="tab">
              <h1 className='mb-7 text-2xl font-bold'>Transformation Unveiled: Exploring the Character's Evolution and Resolutions</h1>
              
              <div className='mb-3'>
                <p className='text-xs mb-1'>How has the character's perspective or worldview evolved as a result of their journey and experiences?</p>
                <textarea rows={5} data-section={8} data-question={1} className='w-full border text-xs rounded-lg bg-gray-200 p-3 outline-none' onInput={(e) => updateAnswer(e)} ></textarea>
              </div>

              <div className='mb-3'>
                <p className='text-xs mb-1'>In what ways have the character's goals or priorities shifted or been redefined throughout their journey?</p>
                <textarea rows={5} data-section={8} data-question={2} className='w-full border text-xs rounded-lg bg-gray-200 p-3 outline-none' onInput={(e) => updateAnswer(e)} ></textarea>
              </div>

              {/* <div className='mb-3'>
                <p className='text-xs mb-1'>What internal conflicts or dilemmas has the character resolved, and how has this impacted their decisions and actions?</p>
                <textarea rows={5} data-section={8} data-question={3} className='w-full border text-xs rounded-lg bg-gray-200 p-3 outline-none' onInput={(e) => updateAnswer(e)} ></textarea>
              </div> */}

              <div className='mb-3'>
                <p className='text-xs mb-1'>Are there any newfound strengths or weaknesses the character has discovered about themselves as a result of their journey?</p>
                <textarea rows={5} data-section={8} data-question={4} className='w-full border text-xs rounded-lg bg-gray-200 p-3 outline-none' onInput={(e) => updateAnswer(e)} ></textarea>
              </div>
              
            </div>
    )
}

export default QuestionEight