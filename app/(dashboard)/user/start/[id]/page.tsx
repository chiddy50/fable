import NewStory from '@/components/story/new-story'
import fetchUser from '@/lib/fetchUser'

export default async function StartChallenge() {
  
  return (
    <div className='layout-width mt-[80px]'>
      
      {/* <NewChallenge /> */}
      <NewStory />
      {/* <StoryForm questions={questions}/> */}
    </div>
  )
}