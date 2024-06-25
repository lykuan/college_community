import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@/components/ui/card'
import ActionsPost from './actions-post'
import { calcDistanceToNow } from '@/lib/utils'
import { useAuthContext } from '@/context/AuthContext'
import {
  useDislikeStory,
  useLikeStory,
  useDeleteStory,
  useBookmarkStory,
} from '@/lib/react-query/queriesAndMutations'
import { useNavigate } from 'react-router-dom'
import CommentEdit from './shared/comment-edit'
import { useState } from 'react'
import Comments from './shared/comments'
import DeleteDialog from './shared/delete-dialog'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from './ui/use-toast'
import SharedAvatar from './shared/shared-avatar'
const StoryPreviewCard = ({ story }) => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [openComment, setOpenComment] = useState(false)
  const { authUser } = useAuthContext()
  const { mutateAsync: likeStory } = useLikeStory()
  const { mutateAsync: bookmarkStory } = useBookmarkStory()
  const { mutateAsync: dislikeStory } = useDislikeStory()
  const { mutateAsync: deleteStory } = useDeleteStory()
  const handleLike = async () => {
    if (!authUser) navigate('/sign-in')
    const result = await likeStory(story._id)
    story.upvotedBy = result.upvotedBy
    story.downvotedBy = result.downvotedBy
  }
  const handleDislike = async () => {
    if (!authUser) navigate('/sign-in')
    const result = await dislikeStory(story._id)
    story.downvotedBy = result.downvotedBy
    story.upvotedBy = result.upvotedBy
  }
  const handleBookmark = async () => {
    if (!authUser) navigate('/sign-in')
    const result = await bookmarkStory(story._id)
    story.bookmark = result.data.bookmark
  }
  const handleOpenComment = async () => {
    setOpenComment((prev) => !prev)
  }
  const handleDeleteStory = async () => {
    const result = await deleteStory(story._id)
    if (result.success) {
      toast({ title: result.message })
      queryClient.invalidateQueries({ queryKey: ['stories'] })
    } else toast({ title: '删除失败,请重试' })
  }

  const handleViewStoryDetail = () => {
    navigate(`/story/${story._id}`, { state: story })
  }
  return (
    <Card
      className='w-full space-y-0 rounded-2xl  p-0 transition-all  
        sm:w-full '
    >
      <CardHeader className='py-4'>
        <div className='flex items-center justify-between gap-1'>
          <div className='flex items-center gap-x-2'>
            <SharedAvatar
              className='cursor-pointer'
              user={story?.author}
              username={story?.author?.profile?.username}
              url={story?.author?.profile?.avatar}
            />

            <div className='grid grid-cols-1'>
              <CardTitle className='text-md font-thin'>
                {story.author?.profile.username || 'anonymous'}
              </CardTitle>
              <div className='flex items-center gap-x-1 text-[.7rem] font-[700] text-neutral-600'>
                <span>{calcDistanceToNow(story.createdAt)}</span>
                {story?.location ? <span>location</span> : null}
              </div>
            </div>
          </div>
          {authUser?._id === story?.author?._id ? (
            <DeleteDialog
              title='删除故事'
              content='故事会被永久删除，确定继续吗?'
              handleDeleteConfirm={handleDeleteStory}
            />
          ) : null}
        </div>
      </CardHeader>
      <CardContent
        onClick={handleViewStoryDetail}
        className='flex flex-col justify-center gap-y-1 py-2 hover:cursor-pointer'
      >
        {story.media.length > 0 ? (
          <>
            <p className='line-clamp-3  w-full  p-0 text-[14px]'>
              {story.content}
            </p>
            <img
              src={story.media[0]}
              alt=''
              className='aspect-video size-full rounded-md object-cover sm:aspect-auto sm:size-1/2'
            />
          </>
        ) : (
          <p className='line-clamp-3 w-full p-0 text-[14px]'>{story.content}</p>
        )}
      </CardContent>

      <CardFooter className='flex flex-col'>
        <ActionsPost
          events={{
            handleLike,
            handleDislike,
            handleBookmark,
            handleOpenComment,
          }}
          likes={story.upvotedBy}
          dislikes={story.downvotedBy}
          comments={story.comments}
          bookmark={story.bookmark}
        ></ActionsPost>
        {openComment ? (
          <div className='w-full'>
            <CommentEdit
              handleCloseComment={handleOpenComment}
              sid={story._id}
            />
            <Comments sid={story._id} comments={story.comments} />
          </div>
        ) : null}
      </CardFooter>
    </Card>
  )
}

export default StoryPreviewCard
