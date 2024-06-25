import { dislikeStory, likeStory } from '@/apis/story-api'
import ActionsPost from '@/components/actions-post'
import DrawerChat from '@/components/chat/drawer-chat'
import { Layout, LayoutBody, LayoutHeader } from '@/components/custom/layout'
import PushNotification from '@/components/notification/push-notification'
import CommentEdit from '@/components/shared/comment-edit'
import Comments from '@/components/shared/comments'
import { ImageHttpGallery } from '@/components/shared/image-gallery'
import SharedAvatar from '@/components/shared/shared-avatar'
import ThemeSwitch from '@/components/shared/theme-switch'
import { UserNav } from '@/components/user-nav'
import { useAuthContext } from '@/context/AuthContext'
import { useBookmarkStory, useGetStory } from '@/lib/react-query/queriesAndMutations'
import { formatDate } from '@/lib/utils'
import { IconMap, IconMap2, IconMapPin, IconSchool } from '@tabler/icons-react'
import { IconGenderFemme, IconGenderMale } from '@tabler/icons-react'
import { useQueryClient } from '@tanstack/react-query'
import { format } from 'date-fns'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const story = () => {
  const qc = useQueryClient()
  const { storyId } = useParams()
  const { mutateAsync: bookmarkStory } = useBookmarkStory()
  const { authUser } = useAuthContext()
  const navigate = useNavigate()
  const [openComment, setOpenComment] = useState(false)
  const { data: story } = useGetStory(storyId)
  const handleLike = async () => {
    if (!authUser) navigate('/sign-in')
    const result = await likeStory(story._id)
    story.upvotedBy = result.upvotedBy
    story.downvotedBy = result.downvotedBy
    qc.invalidateQueries({ queryKey: ['story'] })
  }
  const handleDislike = async () => {
    if (!authUser) navigate('/sign-in')
    const result = await dislikeStory(story._id)
    story.downvotedBy = result.downvotedBy
    story.upvotedBy = result.upvotedBy
    qc.invalidateQueries({ queryKey: ['story'] })
  }
  const handleBookmark = async () => {
    if (!authUser) navigate('/sign-in')
    const result = await bookmarkStory(story._id)
    story.bookmark = result.data.bookmark
    qc.invalidateQueries({ queryKey: ['story'] })
  }
  const handleOpenComment = async () => {
    setOpenComment((prev) => !prev)
  }
  console.log(story)
  return (
    <Layout>
      <LayoutHeader>
        <section className='ml-auto grid grid-cols-4 gap-4'>
          <PushNotification />
          <DrawerChat />
          <ThemeSwitch />
          <UserNav />
        </section>
      </LayoutHeader>

      <LayoutBody>
        <div className='grid w-full grid-cols-6 gap-4 overflow-y-auto'>
          <aside className='col-span-2 flex min-h-[20rem] flex-col  items-center gap-2 border p-4'>
            <SharedAvatar
              url={story?.author?.profile.avatar}
              className='size-14'
            />
            <div className='flex flex-wrap items-center justify-center  gap-2'>
              <h3 className='text-lg'>{story?.author?.profile.username}</h3>
              <p className='text-xs'>
                <span>
                  {story?.author?.profile.gender == '0' ? (
                    <IconGenderFemme color='pink' size={16} />
                  ) : (
                    <IconGenderMale color='blue' size={16} />
                  )}
                </span>
              </p>
              <p className='text-xs'>邮箱：{story?.author?.email}</p>
              {story?.author?.profile.age && (
                <p className='text-xs'>{story?.author?.profile.age}岁</p>
              )}
              {story?.author?.profile.address.province ||
              story?.author?.profile.address.city ? (
                <div className='flex items-center justify-center gap-1'>
                  {story?.author?.profile.address.province && (
                    <p className='flex items-center gap-0.5 text-xs'>
                      <IconMapPin size={14} />
                      {story?.author?.profile.address.province}
                    </p>
                  )}
                  {story?.author?.profile.address.city && (
                    <p className='text-xs'>
                      {story?.author?.profile.address.city}
                    </p>
                  )}
                </div>
              ) : null}
              <div className='grid grid-cols-1 place-content-center gap-2'>
                {story?.author?.profile.university && (
                  <div className='flex gap-2 text-sm'>
                    <IconSchool />
                    {story?.author?.profile.university}
                  </div>
                )}
                {story?.author?.profile.academy && (
                  <div className='flex gap-2 text-sm'>
                    <span>学院:</span>
                    <span>{story?.author?.profile.academy}</span>
                  </div>
                )}
                {story?.author?.profile.major && (
                  <div className='flex gap-2 text-sm'>
                    <span>专业:</span>
                    <span>{story?.author?.profile.major}</span>
                  </div>
                )}
              </div>
            </div>
          </aside>

          <main className='col-span-4 flex  flex-col justify-between gap-4 border p-4'>
            <div className='flex min-h-[20rem] flex-col justify-between gap-4'>
              <div className='flex flex-col gap-2'>
                <p>{story?.content}</p>

                {story?.media?.length > 0 && (
                  <ImageHttpGallery
                    httpImages={story?.media}
                    className='size-20 gap-2'
                  />
                )}
                <p className='items-end'>
                  {story?.createdAt}
                </p>
              </div>
            </div>
            <div>
              <ActionsPost
                events={{ handleLike, handleDislike,handleBookmark, handleOpenComment }}
                likes={story?.upvotedBy}
                dislikes={story?.downvotedBy}
                comments={story?.comments}
                bookmark={story?.bookmark}
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
            </div>
          </main>
        </div>
      </LayoutBody>
    </Layout>
  )
}

export default story
