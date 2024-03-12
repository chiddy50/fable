import NewChallenge from '@/components/challenge/new-challenge'
import NewStory from '@/components/challenge/new-story'
import fetchUser from '@/lib/fetchUser'

export default async function StartChallenge() {
  
  return (
    <div className='layout-width '>
      
      {/* <NewChallenge /> */}
      <NewStory />
      {/* <StoryForm questions={questions}/> */}
    </div>
  )
}