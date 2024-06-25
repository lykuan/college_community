import ChatTopbar from './chat-topbar'
import { ChatList } from './chat-list'
import ChatBottombar from './chat-bottombar'

export function Chat({ selectedUser, isMobile }) {
  return (
    <div className='flex h-full w-full flex-col pb-2 justify-between'>
      <ChatTopbar selectedUser={selectedUser} />
      <ChatList selectedUser={selectedUser} isMobile={isMobile} />

      <ChatBottombar selectedUser={selectedUser} isMobile={isMobile} />
    </div>
  )
}
