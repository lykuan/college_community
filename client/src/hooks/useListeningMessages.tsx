import { useSocketContext } from '@/context/SocketContext'
import useConversation from '@/stores/useConversations'
import { useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'

export const useListeningMessages = () => {
  const { messages, setMessages } = useConversation()
  const queryClient = useQueryClient()
  const { socket } = useSocketContext()

  useEffect(() => {
    socket?.on('newMessage', (newMessage) => {
      queryClient.invalidateQueries({ queryKey: ['messages'] })
      setMessages([...messages, newMessage])
      return () => socket?.off('newMessage')
    })
  }, [messages, socket, setMessages])
}

export default useListeningMessages
