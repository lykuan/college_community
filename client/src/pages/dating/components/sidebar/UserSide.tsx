import { Button } from '@/components/ui/button'
import { useAuthContext } from '@/context/AuthContext'
import { Separator } from '@radix-ui/react-dropdown-menu'
import UserEdit from '../setting/UserEdit'
import { DatingSettingContextProvider } from '@/context/AtingUserContext'
import SharedAvatar from '@/components/shared/shared-avatar'
import { NavLink } from 'react-router-dom'
import { HandHeartIcon, HeartIcon, TextIcon } from 'lucide-react'
import { IconFriends } from '@tabler/icons-react'

const UserSide = () => {
  const { authUser } = useAuthContext()
  return (
    <div className='col-span-2 me-4 ms-4 flex h-full  flex-col items-center border-r pr-3 '>
      <div className='flex w-full flex-col items-center space-y-4'>
        <SharedAvatar url={authUser.profile.avatar} className='size-14' />

        <div className='w-full space-y-1 text-center'>
          <h3 className='break-words text-lg font-semibold'>
            {authUser?.profile.username}
          </h3>
          <p className='text-sm'>
            {authUser.profile.age ? `${authUser.profile.age},` : ''}{' '}
            {authUser.profile.address.province} {authUser.profile.address.city}
          </p>
        </div>
      </div>
      <Separator className='my-6' />
      <div className='flex w-full flex-col items-center space-y-4'>
        <NavLink to='matches'>
          {({ isActive, isPending }) => (
            <Button
              variant='outline'
              className={
                isActive
                  ? 'flex  min-w-[8rem] items-center text-black justify-evenly bg-secondary'
                  : 'flex min-w-[8rem] items-center  justify-evenly'
              }
            >
              <IconFriends color='pink' className='mr-2 h-5 w-5' />
              匹配
            </Button>
          )}
        </NavLink>
        <NavLink to='likedUsers'>
          {({ isActive, isPending }) => (
            <Button
              variant='outline'
              className={
                isActive
                  ? 'flex  min-w-[8rem] items-center text-black justify-evenly bg-secondary'
                  : 'flex min-w-[8rem] items-center  justify-evenly'
              }
            >
              <HeartIcon color='pink' className='mr-2 h-5 w-5' />
              <span>喜欢</span>
            </Button>
          )}
        </NavLink>
        <NavLink to='chat'>
          {({ isActive, isPending }) => (
            <Button
              variant='outline'
              className={
                isActive
                  ? 'flex  min-w-[8rem] items-center text-black justify-evenly bg-secondary'
                  : 'flex min-w-[8rem] items-center  justify-evenly'
              }
            >
              <TextIcon className='mr-2 h-5 w-5' />
              聊天
            </Button>
          )}
        </NavLink>
        <DatingSettingContextProvider>
          <UserEdit dating={authUser.dating} />
        </DatingSettingContextProvider>
      </div>
    </div>
  )
}

export default UserSide
