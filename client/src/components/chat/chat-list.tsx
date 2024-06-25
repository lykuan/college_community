import { useEffect, useRef } from 'react'
import Messages from './messages'
import { useFetchMessages } from '@/lib/react-query/queriesAndMutations'
import useListeningMessages from '@/hooks/useListeningMessages'
import Loader from '../loader'

export function ChatList({ selectedUser, isMobile }) {
  const messagesContainerRef = useRef<HTMLDivElement>(null)
  const { data: messages, isLoading: isLoadingMessages } = useFetchMessages(
    selectedUser._id
  )
  // if (messages) {
  //   const res = groupMessagesByDate(messages)
  //   console.log(res)
  // }
  useListeningMessages()
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight
    }
  }, [messages])

  return (
    <div className='flex h-[14rem] w-full  flex-col  overflow-x-hidden p-2 '>
      <div
        ref={messagesContainerRef}
        className='flex h-full w-full flex-col overflow-y-auto overflow-x-hidden scrollbar'
      >
        {isLoadingMessages ? <Loader /> : null}
        {messages ? (
          <Messages selectedUser={selectedUser} messages={messages}></Messages>
        ) : null}
      </div>
    </div>
  )
}
