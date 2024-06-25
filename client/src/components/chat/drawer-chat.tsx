import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer'
import { IconMessageCircle } from '@tabler/icons-react'
import { Button } from '../custom/button'
import ChatLayout from './chat-layout'
import { SocketContextProvider } from '@/context/SocketContext'
import { AuthContextProvider } from '@/context/AuthContext'
import { useFetchUsers } from '@/lib/react-query/queriesAndMutations'

const DrawerChat = () => {
  const {
    data: users,
    isLoading: isFetchingUsers,
    isError,
    error,
  } = useFetchUsers()
  return (
    <div className='h-full w-full'>
      <Drawer>
        <DrawerTrigger asChild>
          <Button size='icon' variant='ghost' className='rounded-full'>
            <IconMessageCircle size={16} />
          </Button>
        </DrawerTrigger>
        <DrawerContent className='h-[22rem] p-0 m-0'>
          <AuthContextProvider>
            <SocketContextProvider>
              <ChatLayout users={users} />
            </SocketContextProvider>
          </AuthContextProvider>
        </DrawerContent>
      </Drawer>
    </div>
  )
}

export default DrawerChat
