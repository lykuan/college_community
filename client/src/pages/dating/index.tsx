import ThemeSwitch from '@/components/shared/theme-switch'
import { UserNav } from '@/components/user-nav'
import { Layout, LayoutBody, LayoutHeader } from '@/components/custom/layout'
import PushNotification from '@/components/notification/push-notification'
import DrawerChat from '@/components/chat/drawer-chat'
import UserSide from './components/sidebar/UserSide'
import { Outlet } from 'react-router-dom'
import { IconFriends } from '@tabler/icons-react'

export default function Dating() {
  return (
    <Layout className=' min-h-screen'>
      <LayoutHeader className='border-b'>
        <IconFriends size={40} fill='pink' color='pink' />
        <span>在线交友</span>
        <section className='ml-auto grid grid-cols-4 gap-x-1.5'>
          <PushNotification />
          <DrawerChat />
          <ThemeSwitch />
          <UserNav />
        </section>
      </LayoutHeader>

      <LayoutBody className='grid grid-cols-8 '>
        <UserSide />
        <Outlet />
      </LayoutBody>
    </Layout>
  )
}
