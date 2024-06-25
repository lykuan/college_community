import { ReplyIcon, ThumbsDownIcon, ThumbsUpIcon, Trash } from 'lucide-react'
import SharedAvatar from './shared-avatar'
import { Button } from '@/components/ui/button'
import { calcDistanceToNow } from '@/lib/utils'
import { useAuthContext } from '@/context/AuthContext'
import { useDeleteCommentOfStory } from '@/lib/react-query/queriesAndMutations'
import { toast } from '../ui/use-toast'
import { useQueryClient } from '@tanstack/react-query'
import DeleteDialog from './delete-dialog'
const Comment = ({ sid, comment }) => {
  const queryClient = useQueryClient()
  const { authUser } = useAuthContext()
  const { mutateAsync: deleteComment } = useDeleteCommentOfStory()
  const handleDeleteComment = async () => {
    const result = await deleteComment({ sid, cid: comment._id })
    if (result.success) {
      queryClient.invalidateQueries({ queryKey: ['stories'] })
      queryClient.invalidateQueries({ queryKey: ['story'] })
      toast({ title: result.message })
    }
  }
  return (
    <div className='border-b-0.5 mb-2 flex items-start gap-4  border-b'>
      <SharedAvatar url={comment.commentBy.profile?.avatar} />
      <div className='grid flex-1 gap-2'>
        <div className='flex items-center gap-2'>
          <div className='font-semibold'>
            {comment?.commentBy.profile?.username}
          </div>
          <div className='flex items-stretch text-xs text-gray-500 dark:text-gray-400'>
            {calcDistanceToNow(comment.createdAt)}
          </div>
        </div>
        <p className='px-1 text-[12px]'>{comment.comment}</p>
        <div className='flex items-center gap-4'>
          <div className='flex items-center gap-2'>
            <Button size='sm' className=' px-1' variant='ghost'>
              查看回复
            </Button>
            <div className='text-xs text-gray-500 dark:text-gray-400'>
              {comment.replies.length} 回复
            </div>
          </div>
          <Button size='icon' variant='ghost'>
            <ReplyIcon className='h-3.5 w-3.5' strokeWidth='1px' />
            <span className='sr-only'>Reply</span>
          </Button>
          <Button size='icon' variant='ghost'>
            <ThumbsUpIcon className='h-3.5 w-3.5' strokeWidth='1px' />
            <span className='sr-only'>Like</span>
          </Button>
          <Button size='icon' variant='ghost'>
            <ThumbsDownIcon className='h-3.5 w-3.5' strokeWidth='1px' />
            <span className='sr-only'>Dislike</span>
          </Button>
          {authUser.profile?.username == comment.commentBy.profile?.username ? (
            <DeleteDialog
              title='删除评论'
              content='这条评论将会被永久删除，确定继续吗?'
              handleDeleteConfirm={handleDeleteComment}
            />
          ) : null}
        </div>
      </div>
    </div>
  )
}
export default Comment
