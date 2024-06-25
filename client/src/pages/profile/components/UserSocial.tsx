import StoryPreviewCard from '@/components/story-preview-card'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import TaskList from './TaskLists'

const UserSocial = ({ posts, tasks, bookmarks, followers, followed }) => {
  const tabs = [
    {
      title: '帖子',
      value: 'posts',
      content: (
        <div className='grid h-full grid-cols-1 gap-2  overflow-y-auto  '>
          {posts?.map((post) => (
            <StoryPreviewCard story={post} key={post._id} />
          ))}
        </div>
      ),
    },
    {
      title: '收藏',
      value: 'bookmark',
      content: (
        <div className='grid h-full grid-cols-1 gap-2  overflow-y-auto  '>
          {bookmarks?.map((post) => (
            <StoryPreviewCard story={post} key={post._id} />
          ))}
        </div>
      ),
    },
    {
      title: '任务',
      value: 'tasks',
      content: <TaskList tasks={tasks} />,
    },

    {
      title: '关注者',
      value: 'followers',
      content: 'fensi',
    },
    {
      title: '关注',
      value: 'followed',
      content: 'guanzhu',
    },
  ]

  return (
    <div className='h-full  p-4'>
      <Tabs defaultValue='posts'>
        <TabsList className='gap-2'>
          {tabs.map((tab) => (
            <TabsTrigger
              className='border-blue-400 focus-visible:border-b'
              key={tab.value}
              value={tab.value}
            >
              {tab.title}
            </TabsTrigger>
          ))}
        </TabsList>
        {tabs.map((tab) => (
          <TabsContent key={tab.value} value={tab.value}>
            {tab.content}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

export default UserSocial
