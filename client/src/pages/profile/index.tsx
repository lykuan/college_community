import { Layout, LayoutBody, LayoutHeader } from '@/components/custom/layout'
import ProfileBackground from './components/ProfileBackground'
import { IconSchool, IconUser } from '@tabler/icons-react'
import PushNotification from '@/components/notification/push-notification'
import DrawerChat from '@/components/chat/drawer-chat'
import ThemeSwitch from '@/components/shared/theme-switch'
import { UserNav } from '@/components/user-nav'
import SharedAvatar from '@/components/shared/shared-avatar'
import UserSocial from './components/UserSocial'
import { useParams } from 'react-router-dom'
import { useGetUserProfile } from '@/lib/react-query/queriesAndMutations'

const UserProfile = () => {
  const params = useParams()
  const { data, isLoading } = useGetUserProfile(params.uid)
  if (data) var [posts, bookmarks, tasks, [user]] = data
  return (
    <div>
      <Layout>
        <LayoutHeader>
          <IconUser size={40} />
          <span>{user?.profile?.username}</span>
          <section className='ml-auto grid grid-cols-4 gap-x-1.5'>
            <PushNotification />
            <DrawerChat />
            <ThemeSwitch />
            <UserNav />
          </section>
        </LayoutHeader>

        <LayoutBody className='grid grid-cols-1 text-xs'>
          <ProfileBackground uid={params.uid} />
          <main className='flex w-full   border'>
            <div className='flex min-w-[280px]  flex-col items-center gap-y-2 p-8'>
              <SharedAvatar className='size-16' url={user?.profile?.avatar} />
              <p>{user?.profile?.username}</p>
              <p>{user?.profile?.bio}</p>
              <div className='flex w-full flex-col gap-2  p-2 text-xs'>
                <div className='flex w-full  items-center justify-evenly gap-4 text-center'>
                  <div className=''>
                    <p>{posts?.length}</p>
                    <p>帖子</p>
                  </div>
                  <div>
                    <p>{bookmarks?.length}</p>
                    <p>收藏</p>
                  </div>
                </div>
                <div className='flex items-center justify-evenly gap-4 text-center'>
                  <div>
                    <p>{user?.followers?.length}</p>
                    <p>关注者</p>
                  </div>
                  <div>
                    <p>{user?.followed?.length}</p>
                    <p>关注</p>
                  </div>
                </div>
              </div>

              <div className='grid w-full grid-cols-1 place-content-center gap-2 text-center'>
                {user?.profile?.university && (
                  <p className='flex items-center justify-center gap-2'>
                    <IconSchool size={12} />
                    <span>{user?.profile?.university}</span>
                  </p>
                )}
                {user?.profile?.academy && (
                  <p className='flex items-center justify-center gap-2'>
                    <IconSchool size={12} />
                    <span>{user?.profile?.academy}</span>
                  </p>
                )}
                {user?.profile?.major && (
                  <p className='flex items-center justify-center gap-2'>
                    <IconSchool size={12} />
                    <span>{user?.profile?.major}</span>
                  </p>
                )}
              </div>
            </div>
            <div className='flex-grow'>
              <UserSocial
                posts={posts}
                bookmarks={bookmarks}
                tasks={tasks}
                followed={user?.followed}
                followers={user?.followers}
              />
            </div>
          </main>
        </LayoutBody>
      </Layout>
    </div>
  )
}

export default UserProfile
