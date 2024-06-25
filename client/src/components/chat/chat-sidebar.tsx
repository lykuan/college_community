'use client'

import { Link } from 'react-router-dom'
import { MoreHorizontal, SquarePen } from 'lucide-react'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import Friends from './friend/friends'

export function Sidebar({ isCollapsed, users }) {
  // console.log(users)
  return (
    <div
      data-collapsed={isCollapsed}
      className='group relative flex h-full w-full flex-col gap-2  data-[collapsed=true]:p-2 '
    >
      {!isCollapsed && (
        <div className='flex items-center justify-between p-2'>
          <div className='flex items-center gap-1 text-xl'>
            <p>好友</p>
            <span className='text-zinc-300'>({users?.length})</span>
          </div>

          <div>
           
          </div>
        </div>
      )}
      <nav className='gap- grid h-full group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2'>
        <Friends friends={users}></Friends>
      </nav>
    </div>
  )
}
