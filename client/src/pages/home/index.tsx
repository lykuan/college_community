import { Search } from '@/components/search'
import ThemeSwitch from '@/components/shared/theme-switch'
import { TopNav } from '@/components/top-nav'
import { UserNav } from '@/components/user-nav'
import { Layout, LayoutBody, LayoutHeader } from '@/components/custom/layout'
import PostPreviewCard from '@/components/story-preview-card'
import SharedShare from '@/components/shared/shared-story'
import { useCreateCommunity, useFetchStories } from '@/lib/react-query/queriesAndMutations'
import { LoadingButton } from '@/components/ui/loading-button'
import Loader from '@/components/loader'
import DrawerChat from '@/components/chat/drawer-chat'
import PushNotification from '@/components/notification/push-notification'
import { useState } from 'react'
import StoryPreviewCard from '@/components/story-preview-card'
import { IconArticle } from '@tabler/icons-react'
export default function Dashboard() {
  const [filterData, setFilterData] = useState([])
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useFetchStories()

  return (
    <Layout>
      {/* ===== Top Heading ===== */}
      <LayoutHeader>
        <div className=' flex w-full justify-between items-center px-2'>
          <h3 className='flex gap-2 items-center'><IconArticle></IconArticle>帖子分享</h3>
          <Search handleFilterData={setFilterData} datas={data?.pages} />
          <section className='grid grid-cols-4 gap-x-1'>
            <PushNotification />
            <DrawerChat />
            <ThemeSwitch />
            <UserNav />
          </section>
        </div>
      </LayoutHeader>

      {/* ===== Main ===== */}
      <LayoutBody className='grid grid-cols-5 gap-3 p-2 '>
        <main className='col-span-5 flex flex-col gap-2'>
          <SharedShare></SharedShare>
          {status === 'pending' ? (
            <div>
              <Loader />
            </div>
          ) : status === 'error' ? (
            <p>{error.message}</p>
          ) : filterData.length > 0 ? (
            filterData.map((item, idx) => (
              <StoryPreviewCard story={item} key={idx} />
            ))
          ) : (
            <>
              {data.pages?.map((group, index) =>
                group.data?.map((story) => {
                  return <PostPreviewCard key={story._id} story={story} />
                })
              )}
              <div className='m-auto'>
                <LoadingButton
                  onClick={() => fetchNextPage()}
                  loading={isFetchingNextPage}
                  disabled={!hasNextPage || isFetchingNextPage}
                >
                  {isFetchingNextPage
                    ? '加载更多...'
                    : hasNextPage
                      ? '加载更多'
                      : '没有内容了'}
                </LoadingButton>
              </div>
            </>
          )}
        </main>
   
      </LayoutBody>
    </Layout>
  )
}


