import { useGetLikedUsers } from '@/lib/react-query/queriesAndMutations'
import UserCardList from '../components/recommend/UserCardList'

const Liked = () => {
  const { data: likedUsers, isLoading } = useGetLikedUsers()
  return (
    <section className='col-span-6 min-h-full grid-cols-3 gap-3 '>
      <UserCardList mode = "liked" users={likedUsers?.liked} />
    </section>
  )
}

export default Liked
