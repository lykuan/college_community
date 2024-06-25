import { Button } from '@/components/ui/button'
import SharedAvatar from './shared-avatar'
import { useFollowedUser } from '@/lib/react-query/queriesAndMutations'
import { useAuthContext } from '@/context/AuthContext'
import { useNavigate } from 'react-router-dom'

const ProfileCard = ({ user }) => {
  const { authUser } = useAuthContext()
  const { mutateAsync: followedUser } = useFollowedUser()
  const navigate = useNavigate()
  const handleFollowed = async () => {
    const result = await followedUser(user._id)
    user.followers = result.followers
  }
  const handleViewUser = async () => {
    navigate(`/user/${user._id}`)
  }
  return (
    <div className='flex size-full items-center justify-center'>
      <div className='w-64 rounded-lg '>
        <SharedAvatar url={user?.profile?.avatar} className='m-auto size-20' />
        <div className='mt-2 text-center'>
          <h2 className='text-lg font-semibold'>{user?.profile?.username}</h2>
          <p className=''>{user?.profile?.university}</p>
        </div>
        <div className='my-4 flex justify-around'>
          <div className='text-center'>
            <h3 className='text-lg font-semibold'>{user?.followers.length}</h3>
            <p className=''>粉丝</p>
          </div>
          <div className='text-center'>
            <h3 className='text-lg font-semibold'>{user?.followed?.length}</h3>
            <p>关注</p>
          </div>
        </div>
        <div className='flex gap-4 px-6 py-4'>
          {user._id !== authUser._id &&
          !user.followers.includes(authUser._id) ? (
            <Button
              variant='secondary'
              onClick={handleFollowed}
              className='w-full rounded-lg '
            >
              关注
            </Button>
          ) : (
            <Button
              variant='outline'
              onClick={handleFollowed}
              className='w-full rounded-lg '
            >
              已关注
            </Button>
          )}
          <Button
            variant='secondary'
            onClick={handleViewUser}
            className='w-full rounded-lg '
          >
            用户主页
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ProfileCard
