import { Button } from '@/components/custom/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import SharedAvatar from './shared/shared-avatar'
import { useAuthContext } from '@/context/AuthContext'
export function UserNav() {
  const { authUser: userInfo, setAuthUser } = useAuthContext()
  const navigate = useNavigate()
  useEffect(() => {
    if (!userInfo) navigate('/sign-in')
    setAuthUser(JSON.parse(localStorage.getItem("user")))
  }, [])

  const logOut = () => {
    localStorage.clear()
    setAuthUser(null)
    navigate('/sign-in')
  }
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' className='relative h-8 w-8 rounded-full'>
            <SharedAvatar
              url={userInfo?.profile?.avatar}
              username={userInfo?.profile?.username}
            ></SharedAvatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='w-56' align='end' forceMount>
          <DropdownMenuLabel className='font-normal'>
            <div className='flex flex-col space-y-1'>
              <p className='text-sm font-medium leading-none'>
                {userInfo?.profile?.username}
              </p>
              <p className='text-xs leading-none text-muted-foreground'>
                {userInfo?.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem><Link to={`/user/${userInfo._id}`}>简介</Link></DropdownMenuItem>
            <DropdownMenuItem ><Link to={`/settings`}>设置</Link></DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={logOut}>登出</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
