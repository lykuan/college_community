import { useAuthContext } from '@/context/AuthContext'
import { cn } from '@/lib/utils'
import {
  IconArrowBigDown,
  IconArrowBigUp,
  IconBookmark,
  IconMessageCircle,
} from '@tabler/icons-react'
import { useTheme } from './theme-provider'
const ActionsPost = ({
  likes,
  dislikes,
  comments,
  bookmark,
  events: { handleLike, handleBookmark, handleDislike, handleOpenComment },
}) => {
  const { authUser } = useAuthContext()
  const { theme } = useTheme()
  return (
    <section className='flex w-full gap-1 border dark:text-white md:flex-nowrap'>
      <div
        className={cn(
          ' flex w-full  items-center justify-center gap-x-1.5 px-2  py-1 ',
          likes?.includes(authUser._id) && !dislikes?.includes(authUser._id)
            ? 'bg-primary text-white dark:bg-secondary'
            : '',
          dislikes?.includes(authUser._id) && !likes?.includes(authUser._id)
            ? 'bg-muted-foreground text-white dark:bg-muted-foreground'
            : ''
        )}
      >
        {likes?.includes(authUser._id) && !dislikes?.includes(authUser._id) && (
          <IconArrowBigUp
            onClick={handleLike}
            className='size-3.5 cursor-pointer  rounded-full '
            fill='white'
          ></IconArrowBigUp>
        )}
        {(dislikes?.includes(authUser._id) ||
          !dislikes?.includes(authUser._id)) &&
          !likes?.includes(authUser._id) && (
            <IconArrowBigUp
              onClick={handleLike}
              className='size-3.5 cursor-pointer rounded-full hover:text-primary dark:hover:text-secondary'
            ></IconArrowBigUp>
          )}
        <span className='text-[12px]'>{likes?.length - dislikes?.length}</span>

        {!likes?.includes(authUser._id) && dislikes?.includes(authUser._id) && (
          <IconArrowBigDown
            fill='white'
            onClick={handleDislike}
            className='size-3.5 cursor-pointer rounded-full hover:text-secondary '
          ></IconArrowBigDown>
        )}
        {(likes?.includes(authUser._id) || !likes?.includes(authUser._id)) &&
          !dislikes?.includes(authUser._id) && (
            <IconArrowBigDown
              onClick={handleDislike}
              className='size-3.5 cursor-pointer rounded-full  dark:hover:text-muted-foreground'
            ></IconArrowBigDown>
          )}
      </div>

      <div
        onClick={handleOpenComment}
        className='flex w-full cursor-pointer  items-center justify-center gap-x-1   py-1 transition hover:bg-secondary dark:hover:text-black'
      >
        <IconMessageCircle className='size-3.5 group-hover:text-white'></IconMessageCircle>{' '}
        <span className='text-[12px] group-hover:text-white'>
          {comments?.length}
        </span>
      </div>
      <div
        onClick={handleBookmark}
        className='flex w-full cursor-pointer  items-center justify-center gap-x-1  py-1 transition hover:bg-secondary dark:hover:text-black'
      >
        {bookmark?.includes(authUser._id) ? theme === "dark" ? (
          <IconBookmark
            className='size-3.5 cursor-pointer  rounded-full '
            fill='white'
            color='white'
          ></IconBookmark>
        ) :
          <IconBookmark
            className='size-3.5 cursor-pointer  rounded-full '
            fill='black'
            color='black'
          ></IconBookmark>
          : (
            <IconBookmark className='size-3.5'></IconBookmark>
          )}
        <span className='text-[12px] '>{bookmark?.length}</span>
      </div>
    </section>
  )
}

export default ActionsPost
