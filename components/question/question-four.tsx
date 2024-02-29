const QuestionFour = ({ updateAnswer }) => {
  return (
      <div className="tab">
        <h1 className='mb-7 text-2xl font-bold'>Exploring the Character's Problem-Solving Journey</h1>
          <div className='mb-3'>
            <p className='text-xs mb-1'>What strategies or tactics does the character employ when faced with challenges or obstacles?</p>
            <textarea rows={5} data-section={4} data-question={1} className='w-full border text-xs rounded-lg bg-gray-200 p-3 outline-none' onInput={(e) => updateAnswer(e)} ></textarea>
          </div>

          <div className='mb-3'>
            <p className='text-xs mb-1'>Are there any underlying factors or events that contribute to the problem the character is trying to solve?</p>
            <textarea rows={5} data-section={4} data-question={2} className='w-full border text-xs rounded-lg bg-gray-200 p-3 outline-none' onInput={(e) => updateAnswer(e)} ></textarea>              
          </div>
          
          <div className='mb-3'>
            <p className='text-xs mb-1'>How does the character prioritize or approach problem-solving amidst competing goals or conflicts?</p>
            <textarea rows={5} data-section={4} data-question={3} className='w-full border text-xs rounded-lg bg-gray-200 p-3 outline-none' onInput={(e) => updateAnswer(e)} ></textarea>
          </div>
      </div>
    )
}

export default QuestionFour