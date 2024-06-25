import {
  FileImage,
  Mic,
  Paperclip,
  PlusCircle,
  SendHorizontal,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import React, { useRef, useState } from 'react'
import { Button, buttonVariants } from '../ui/button'
import { cn } from '@/lib/utils'
import { AnimatePresence, motion } from 'framer-motion'
import { Textarea } from '../ui/textarea'
import EmojiPicker from '../shared/shared-emojiPicker'
import { TMessage } from '@/types/Message'
import { useAuthContext } from '@/context/AuthContext'
import useConversation from '@/stores/useConversations'
import { useSendMessage } from '@/lib/react-query/queriesAndMutations'
import { useQueryClient } from '@tanstack/react-query'

export const BottombarIcons = [{ icon: FileImage }, { icon: Paperclip }]

export default function ChatBottombar({ selectedUser, isMobile }) {
  const [message, setMessage] = useState('')
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const { authUser } = useAuthContext()
  const { messages, setMessages } = useConversation()
  const { mutateAsync: sendMessage, isPending: isSending } = useSendMessage()
  const queryClient = useQueryClient()
  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value)
  }

  const handleSend = async () => {
    if (message.trim()) {
      const newMessage: TMessage = {
        sender: authUser._id,
        receiver: selectedUser._id,
        text: message.trim(),
      }
      const { message: tip, newMessage: result } = await sendMessage({
        uid: newMessage.receiver,
        message: newMessage.text,
      })
      if (result) {
        queryClient.invalidateQueries({ queryKey: ['messages'] })
        setMessages([...messages, result])
      }
      setMessage('')

      if (inputRef.current) {
        inputRef.current.focus()
      }
    }
  }

  const handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      handleSend()
    }

    if (event.key === 'Enter' && event.shiftKey) {
      event.preventDefault()
      setMessage((prev) => prev + '\n')
    }
  }

  return (
    <div className='flex w-full  items-center justify-between gap-2 p-2'>
      <AnimatePresence initial={false}>
        <motion.div
          key='input'
          className='relative w-full'
          layout
          initial={{ opacity: 0, scale: 1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1 }}
          transition={{
            opacity: { duration: 0.05 },
            layout: {
              type: 'spring',
              bounce: 0.15,
            },
          }}
        >
          <div className='relative  flex items-center   justify-between rounded-full'>
            {' '}
            <Textarea
              autoComplete='off'
              value={message}
              ref={inputRef}
              onKeyDown={handleKeyPress}
              onChange={handleInputChange}
              name='message'
              placeholder=''
              className='  h-4  w-full resize-none  rounded-full pr-8'
            ></Textarea>
            <div className='absolute right-2'>
              <EmojiPicker
                onChange={(value) => {
                  setMessage(message + value)
                  if (inputRef.current) {
                    inputRef.current.focus()
                  }
                }}
              />
            </div>
          </div>
        </motion.div>

        <Button
          className={cn(
            ' dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white'
          )}
          onClick={handleSend}
        >
          <SendHorizontal size={20} />
        </Button>
      </AnimatePresence>
    </div>
  )
}
