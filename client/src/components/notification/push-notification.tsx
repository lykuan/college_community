import { IconBell } from '@tabler/icons-react'
import NotificationCard from './notification-card'
import { Button } from '../ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
const PushNotification = ({ notifications = [1, 2, 3] }) => {
  return (
    <div className='w-full'>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size='icon' variant='ghost' className='rounded-full'>
            <IconBell size={16} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='w-66 flex flex-col gap-y-1 px-0.5 py-0.5'>
          {notifications.map((notification, idx) => {
            return <NotificationCard notification={notification} key={idx} />
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default PushNotification
