import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import ProfileCard from './profile-card'
import { useState } from 'react'

const SharedAvatar = ({
  url,
  user = null,
  className = 'size-8',
  username = 'anonymous',
}) => {
  const [show, setShow] = useState(false)
  return (
    <Popover
      open={show}
      onOpenChange={(e) => {
        if (user === null) setShow(false)
        else setShow((prev) => !prev)
      }}
    >
      {/* {user?:null} */}
      <PopoverTrigger asChild disabled={user ? false : true}>
        <Avatar
          className={cn(
            'flex aspect-square h-8 w-8 items-center object-cover ',
            className
          )}
        >
          <AvatarImage src={url || '@/assets/img/sign-in.png'} alt='@shadcn' />
          <AvatarFallback>{username}</AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent>
        <ProfileCard user={user} />
      </PopoverContent>
    </Popover>
  )
}

export default SharedAvatar
