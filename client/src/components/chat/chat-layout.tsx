'use client'

import React, { useEffect, useState } from 'react'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'
import { cn } from '@/lib/utils'
import { Sidebar } from './chat-sidebar'
import { Chat } from './chat'
import useConversation from '@/stores/useConversations'
import { useFetchUsers } from '@/lib/react-query/queriesAndMutations'

interface ChatLayoutProps {
  users: object
  defaultLayout?: number[] | undefined
  defaultCollapsed?: boolean
  navCollapsedSize?: number
}

export default function ({
  users,
  defaultCollapsed = false,
  defaultLayout = [260, 480],
  navCollapsedSize,
}: ChatLayoutProps) {
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed)
  const { selectedConversation: selectedUser } = useConversation()
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const checkScreenWidth = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    // Initial check
    checkScreenWidth()
    // Event listener for screen width changes
    window.addEventListener('resize', checkScreenWidth)
    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', checkScreenWidth)
    }
  }, [])

  return (
    <ResizablePanelGroup
      direction='horizontal'
      onLayout={(sizes: number[]) => {
        document.cookie = `react-resizable-panels:layout=${JSON.stringify(
          sizes
        )}`
      }}
      className='h-full items-stretch'
    >
      <ResizablePanel
        defaultSize={defaultLayout[0]}
        collapsedSize={navCollapsedSize}
        collapsible={true}
        minSize={isMobile ? 0 : 26}
        maxSize={isMobile ? 8 : 30}
        onCollapse={() => {
          setIsCollapsed(true)
          document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
            true
          )}`
        }}
        onExpand={() => {
          setIsCollapsed(false)
          document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
            false
          )}`
        }}
        className={cn(
          isCollapsed &&
            'min-w-[50px] transition-all duration-300 ease-in-out md:min-w-[70px]'
        )}
      >
        <Sidebar isCollapsed={isCollapsed || isMobile} users={users} />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel className='h-full m-0 p-0'>
        {selectedUser ? (
          <Chat selectedUser={selectedUser} isMobile={isMobile} />
        ) : (
          '请选择用户聊天'
        )}
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
