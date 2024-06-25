import { Card } from '../ui/card'
import SharedAvatar from '../shared/shared-avatar'

const NotificationCard = ({ notification }) => {
  return (
    <Card className='flex cursor-pointer  w-full rounded-none items-start gap-1  border-b-slate-500 bg-white px-1 py-0.5  dark:bg-gray-950'>
      <SharedAvatar url='' />
      <div className='flex-1'>
        <div className='flex items-center justify-evenly'>
          <div className='space-y-1'>
            <p className='text-[10px] font-medium'>Jane Doe</p>
            <p className='text-[10px]  '>commented on your post</p>
          </div>
          <div className='text-[10px]  '>5 min ago</div>
        </div>
        <div className='mt-4'>
          <p className='text-[10px]  '>
            Great post! I really enjoyed the content and the design.
          </p>
        </div>
      </div>
    </Card>
  )
}

export default NotificationCard
