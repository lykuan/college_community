import { Info, Phone, Video } from 'lucide-react'
import SharedAvatar from '../shared/shared-avatar'
import { Button } from '../ui/button'

export const TopbarIcons = [{ icon: Phone }, { icon: Video }, { icon: Info }]

export default function ChatTopbar({ selectedUser }) {
  return (
    <div className='pb-3 flex  border-b w-full items-center   justify-between px-2'>
      <div className='flex items-center gap-1'>
        <SharedAvatar url={selectedUser.profile.avatar}></SharedAvatar>
        <div className='flex flex-col'>
          <span className='font-medium'>{selectedUser.profile.username}</span>
        </div>
      </div>

      <div>
        <Button variant='destructive'>删除</Button>
      </div>
    </div>
  )
}
