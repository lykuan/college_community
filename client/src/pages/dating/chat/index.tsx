import ChatLayout from '@/components/chat/chat-layout'
import { SocketContextProvider } from '@/context/SocketContext'
import { useGetChats } from '@/lib/react-query/queriesAndMutations'

const chats = () => {
  const { data: matchedUsers } = useGetChats()
  return (
    <div className='col-span-6 min-w-full '>
      <SocketContextProvider>
        <ChatLayout users={matchedUsers} />
      </SocketContextProvider>
    </div>
  )
}

export default chats
