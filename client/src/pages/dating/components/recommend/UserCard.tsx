import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { useAuthContext } from '@/context/AuthContext'
import {
  useDislikedUser,
  useLikedUser,
} from '@/lib/react-query/queriesAndMutations'
import { cn } from '@/lib/utils'
import { useQueryClient } from '@tanstack/react-query'
import { HeartIcon, XIcon } from 'lucide-react'

const UserCard = ({ user, hiddenCard, id, showCardDetail }) => {
  const { authUser } = useAuthContext()
  const queryClient = useQueryClient()
  const { mutateAsync: likedUser } = useLikedUser()
  const { mutateAsync: dislikedUser } = useDislikedUser()

  const handleLikedUser = async () => {
    const result = await likedUser(user.uid)
    queryClient.invalidateQueries({ queryKey: ['recommendUsers'] })
  }
  const handleDislikedUser = async () => {
    const result = await dislikedUser(user.uid)
    queryClient.invalidateQueries({ queryKey: ['recommendUsers'] })
  }
  const handleViewDetail = () => {
    hiddenCard((prev) => !prev)
    showCardDetail(id)
  }
  return (
    <Card className='group relative max-h-[14rem] max-w-[16rem] cursor-pointer overflow-hidden rounded-lg'>
      <img
        alt='User Profile'
        className='aspect-[400/500] h-full w-full object-cover '
        height={500}
        src={user?.profile?.avatar}
        width={400}
      />
      <div className='absolute inset-0 z-20 grid grid-cols-1 items-end justify-center border bg-gradient-to-t from-black/70 to-transparent p-4 opacity-0 transition-opacity group-hover:opacity-100'>
        <div
          onClick={handleViewDetail}
          className='flex w-full flex-col justify-center gap-1 space-y-1 '
        >
          <h4 className='text-md flex gap-1 break-words font-semibold text-white'>
            <span>{user?.profile?.username}</span>
            <span>{user?.profile?.age}岁</span>
          </h4>
          <p className='text-sm text-white'>
            {user?.profile?.address?.province} {user?.profile?.address?.city}
          </p>
          <p className='text-sm text-white'>{user?.profile?.bio}</p>
        </div>

        <CardFooter className='w-full'>
          {authUser.dating.liked?.includes(user._id) ||
          authUser.dating.disliked?.includes(user._id) ? null : (
            <div className='flex  gap-4'>
              <Button
                className='bg-white/20 hover:bg-white/30'
                size='icon'
                variant='ghost'
                onClick={handleDislikedUser}
              >
                <XIcon className='h-6 w-6' color='white' />
                <span className='sr-only'>Dislike</span>
              </Button>
              <Button
                className='bg-white/20 hover:bg-white/30'
                size='icon'
                variant='ghost'
                onClick={handleLikedUser}
              >
                {authUser.dating.liked?.includes(user._id) ? (
                  <HeartIcon
                    className={cn('hover:text-red h-6 w-6')}
                    fill={'pink'}
                    color={'pink'}
                  />
                ) : (
                  <HeartIcon color='white' />
                )}
                <span className='sr-only'>Like</span>
              </Button>
            </div>
          )}
        </CardFooter>
      </div>
    </Card>
  )
}

export default UserCard
