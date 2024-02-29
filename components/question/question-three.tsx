const QuestionThree = ({ updateAnswer }) => {
    return (
        <div className="tab">
              <h1 className='mb-7 text-2xl font-bold'>Exploring Character Motivations: Uncovering Triggers and Driving Forces</h1>
              <div className='mb-2'>
                <p className='text-xs mb-1'>What events or circumstances trigger strong emotions in the character?</p>
                <textarea rows={5} data-section={3} data-question={1} className='w-full border text-xs rounded-lg bg-gray-200 p-3 outline-none' onInput={(e) => updateAnswer(e)} ></textarea>
              </div>

              <div className='mb-3'>
                <p className='text-xs mb-1'>Are there specific past experiences that influence the characters actions or decisions?</p>
                <textarea rows={5} data-section={3} data-question={2} className='w-full border text-xs rounded-lg bg-gray-200 p-3 outline-none' onInput={(e) => updateAnswer(e)} ></textarea>
              </div>

              {/* <div className='mb-2'>
                <p className='text-xs mb-1'>What external factors or pressures push the character to take action?</p>
                <textarea rows={5} data-section={3} data-question={3} className='w-full border text-xs rounded-lg bg-gray-200 p-3 outline-none' onInput={(e) => updateAnswer(e)} ></textarea>
              </div> */}

              <div className='mb-2'>
                <p className='text-xs mb-1'>How does the character respond when faced with adversity or conflict?</p>
                <textarea rows={5} data-section={3} data-question={4} className='w-full border text-xs rounded-lg bg-gray-200 p-3 outline-none' onInput={(e) => updateAnswer(e)} ></textarea>
              </div>

            </div>
    )
}

export default QuestionThree