import { CardTitle, CardHeader, Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { TabsTrigger, TabsList, TabsContent, Tabs } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { SearchIcon, EllipsisVerticalIcon } from 'lucide-react'
import SharedAvatar from '@/components/shared/shared-avatar'
import Friends from '@/components/chat/friend/friends'
import { useFetchUsers } from '@/lib/react-query/queriesAndMutations'
const ConversationCard = () => {
  const {
    data: users,
    isLoading: isFetchingUsers,
    isError,
    error,
  } = useFetchUsers()
  return (
    <Card className='w-full max-w-md'>
      <CardHeader className='flex items-center justify-between'>
        <CardTitle>Messages</CardTitle>
        <div className='relative'>
          <SearchIcon className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500 dark:text-gray-400' />
          <Input
            className='rounded-md py-2 pl-9 pr-4 text-sm'
            placeholder='Search messages...'
            type='search'
          />
        </div>
      </CardHeader>
      <Tabs className='border-b ' defaultValue='primary'>
        <TabsList className='flex border-b bg-transparent'>
          <TabsTrigger value='primary'>Primary</TabsTrigger>
          <TabsTrigger value='group'>Group</TabsTrigger>
          <TabsTrigger value='requests'>Requests(2)</TabsTrigger>
        </TabsList>
        <TabsContent className='space-y-4 p-4' value='primary'>
          {isFetchingUsers ? (
            'loading...'
          ) : (
            <Friends friends={users} key={users._id} />
          )}
        </TabsContent>
        <TabsContent className='space-y-4 p-4' value='group'>
          <div className='flex items-center gap-4'>
            {isFetchingUsers ? (
              'loading...'
            ) : (
              <Friends friends={users} key={users._id} />
            )}
            <Button className='rounded-full' size='icon' variant='ghost'>
              <EllipsisVerticalIcon className='h-5 w-5' />
              <span className='sr-only'>Options</span>
            </Button>
          </div>
        </TabsContent>
        <TabsContent className='space-y-4 p-4' value='requests'>
          <div className='flex items-center gap-4'>
            <SharedAvatar url={''} />
            <div className='flex-1'>
              <div className='font-medium'>Alex Smith</div>
              <div className='text-sm text-gray-500 dark:text-gray-400'>
                Requested to join 1h ago
              </div>
            </div>
            <div className='flex flex-col gap-1'>
              <Button size='sm'>Accept</Button>
              <Button size='sm' variant='ghost'>
                Decline
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  )
}

export default ConversationCard
