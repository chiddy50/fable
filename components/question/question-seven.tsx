const QuestionSeven = ({ updateAnswer }) => {
    return (
        <div className="tab">
              <h1 className='mb-7 text-2xl font-bold'>Resuming the Journey: Exploring the Character's Return to Action</h1>
              
              <div className='mb-3'>
                <p className='text-xs mb-1'>What newfound confidence or resolve does the character bring back with them after facing the challenges?</p>
                <textarea rows={5} data-section={7} data-question={1} className='w-full border text-xs rounded-lg bg-gray-200 p-3 outline-none' onInput={(e) => updateAnswer(e)} ></textarea>
              </div>

              <div className='mb-3'>
                <p className='text-xs mb-1'>How do other characters or the environment react to the character's return, and how does this impact their next steps?</p>
                <textarea rows={5} data-section={7} data-question={2} className='w-full border text-xs rounded-lg bg-gray-200 p-3 outline-none' onInput={(e) => updateAnswer(e)} ></textarea>
              </div>

              <div className='mb-3'>
                <p className='text-xs mb-1'>What lessons or insights did the character gain during their absence, and how do they apply these to their actions upon returning?</p>
                <textarea rows={5} data-section={7} data-question={3} className='w-full border text-xs rounded-lg bg-gray-200 p-3 outline-none' onInput={(e) => updateAnswer(e)} ></textarea>
              </div>

              {/* <div className='mb-3'>
                <p className='text-xs mb-1'>Are there any lingering consequences or unresolved issues from the character's departure that affect their reentry into the story?</p>
                <textarea rows={5} data-section={7} data-question={4} className='w-full border text-xs rounded-lg bg-gray-200 p-3 outline-none' onInput={(e) => updateAnswer(e)} ></textarea>
              </div> */}

            </div> 
    )
}

export default QuestionSeven