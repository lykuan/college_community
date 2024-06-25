import { useSocketContext } from '@/context/SocketContext'
import useConversation from '@/stores/useConversations'
const Friend = ({ user }) => {
  const { onlineUsers } = useSocketContext()
  const isOnline = onlineUsers.includes(user._id)
  const { setSelectedConversation } = useConversation()
  const startConversation = () => {
    setSelectedConversation(user)
  }
  return (
    <li
      onClick={startConversation}
      className='flex w-full items-center justify-between px-1 py-2  hover:cursor-pointer hover:bg-accent'
    >
      <div className='flex min-w-0 gap-x-4 dark:text-muted-foreground '>
        <img
          className='h-12 w-12 flex-none rounded-full bg-gray-50'
          src={
            user.profile.avatar ||
            'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
          }
          alt=''
        />
        <div className='min-w-0 flex-auto '>
          <p className='text-sm font-semibold leading-6 text-gray-900 dark:text-muted-foreground'>
            {user.profile.username}
          </p>
          <p className='mt-1 truncate text-xs leading-5 text-gray-500'>
            {user.email}
          </p>
        </div>
      </div>
      <div className='hidden shrink-0 sm:flex sm:flex-col sm:items-end'>
        {isOnline ? (
          <div className='mt-1 flex items-center gap-x-1.5'>
            <div className='flex-none rounded-full bg-emerald-500/20 p-1'>
              <div className='h-1.5 w-1.5 rounded-full bg-emerald-500'></div>
            </div>
            <p className='text-xs leading-5 text-gray-500'>在线</p>
          </div>
        ) : (
          <p className='text-xs leading-5 text-gray-500'>离线</p>
        )}
      </div>
    </li>
  )
}

export default Friend
