import { useAuthContext } from '@/context/AuthContext'
import SharedAvatar from '../shared/shared-avatar'
import { cn, formatDate } from '@/lib/utils'
const Message = ({ message, selectedUser }) => {
  const { authUser } = useAuthContext()
  return (
    <div
      className={cn(
        'flex items-start gap-2 ',
        message.sender == authUser._id ? 'justify-end' : ''
      )}
    >
      <div className={message.sender == authUser._id ? 'hidden' : ''}>
        <SharedAvatar url={selectedUser.profile.avatar}></SharedAvatar>
      </div>
      <div
        className={cn(
          'flex h-fit max-w-[320px]  flex-col   border-gray-200 bg-gray-100 p-1 dark:bg-gray-700',
          message.sender != authUser._id
            ? 'rounded-e-lg rounded-es-lg '
            : 'rounded-s-lg rounded-ee-lg bg-sky-600 text-slate-100 dark:bg-sky-500'
        )}
      >
        <div className='flex items-center  justify-between space-x-1 rtl:space-x-reverse'>
          <span className='px-2 text-sm font-semibold  '>
            {message.sender == authUser._id
              ? authUser.profile.username
              : selectedUser.profile.username}
          </span>
          <span className='text-[12px] font-normal '>
            {formatDate(message.createdAt)}
          </span>
        </div>
        <p className='selection-text max-w-[320px] break-words px-2 py-1 text-sm  font-normal   dark:text-white'>
          {message?.body}
        </p>
      </div>
      <div className={message.sender == authUser._id ? '' : 'hidden'}>
        <SharedAvatar url={authUser.profile.avatar}></SharedAvatar>
      </div>
    </div>
  )
}

export default Message
