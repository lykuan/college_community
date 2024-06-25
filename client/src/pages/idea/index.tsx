import { Layout, LayoutBody, LayoutHeader } from '@/components/custom/layout'
import PushNotification from '@/components/notification/push-notification'
import DrawerChat from '@/components/chat/drawer-chat'
import ThemeSwitch from '@/components/shared/theme-switch'
import { UserNav } from '@/components/user-nav'
import { Button } from '@/components/ui/button'
import 'react-quill/dist/quill.snow.css'
import { Link } from 'react-router-dom'
import { useGetIdeas } from '@/lib/react-query/queriesAndMutations'
import IdeaPreviewCard from './components/IdeaPreviewCard'
import { IconBook2 } from '@tabler/icons-react'

const Idea = () => {
  const { data } = useGetIdeas()
  return (
    <Layout>
      <LayoutHeader className='px-0 mx-0'>
        <IconBook2></IconBook2><span>知识分享</span>
        <section className='ml-auto grid grid-cols-5 gap-x-.5'>
          <Button variant='outline' asChild>
            <Link to='/write'>创作</Link>
          </Button>
          <PushNotification />
          <DrawerChat />
          <ThemeSwitch />
          <UserNav />
        </section>
      </LayoutHeader>
      <LayoutBody>
        <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3'>
          {
            data?.map(idea => (
              <IdeaPreviewCard key={idea._id} idea={idea} />
            ))
          }
        </div>
      </LayoutBody>
    </Layout>
  )
}

export default Idea
