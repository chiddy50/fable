import NewChallenge from '@/components/challenge/new-challenge'
import NewChallenge2 from '@/components/challenge/new-challenge2'
import fetchUser from '@/lib/fetchUser'

export default async function StartChallenge() {
  
  return (
    <div className='layout-width '>
      
      {/* <NewChallenge /> */}
      <NewChallenge2 />
      {/* <StoryForm questions={questions}/> */}
    </div>
  )
}