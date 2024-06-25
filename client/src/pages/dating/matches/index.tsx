import { useRecommendUsers } from '@/lib/react-query/queriesAndMutations'
import UserCardList from '../components/recommend/UserCardList'

const Matches = () => {
  const { data: users, isLoading } = useRecommendUsers()
  console.log(users)
  return (
    <div className='col-span-6  grid-cols-3  gap-3 '>
      <UserCardList mode="recommend" users={users} />
    </div>
  )
}

export default Matches
