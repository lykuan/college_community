import { Card, CardContent, CardFooter, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import SharedAvatar from '@/components/shared/shared-avatar'
import { Progress } from '@/components/ui/progress'
import { MapPinIcon, SchoolIcon } from 'lucide-react'
import {
  IconGenderFemme,
  IconGenderMale,
  IconHeart,
  IconSchool,
} from '@tabler/icons-react'
import { ImageHttpGallery } from '@/components/shared/image-gallery'

const DatingDetail = ({ user, hidden,id }) => {
  const handleHidden = () => {
    hidden((prev) => !prev)
  }
  return (
    <Card className='grid  min-h-[18rem] grid-cols-6 p-4'>
      <CardTitle className='col-span-2  flex flex-col items-center gap-2  p-2 '>
        <SharedAvatar
          className='size-14'
          url={user.profile.avatar}
        />
        <p className='flex items-center gap-x-1'>
          <span>
            {user.profile.gender == '0' ? (
              <IconGenderFemme color='pink' size={14} />
            ) : (
              <IconGenderMale color='blue' size={14} />
            )}
          </span>
          <span className='text-sm'>{user.profile.username}</span>{' '}
          <span className='text-sm'>{user.profile.age}</span>
        </p>
        <section className='grid grid-cols-1 place-content-center gap-2 text-sm'>
          <p className='flex  items-center justify-center gap-1 text-sm'>
            <MapPinIcon size={14} />
            <span className='text-sm'>{user.profile.address.province}</span>
            <span className='text-sm'>{user.profile.address.city}</span>
          </p>
          <p className='flex  items-center justify-center gap-1 text-sm'>
            <SchoolIcon />
            <span className='text-sm'>{user.profile.university}</span>
          </p>
          <p className='flex  items-center justify-center gap-1 text-sm'>
            <span className='text-sm'>学院：</span>
            {user.profile.academy}
          </p>
          <p className='flex  items-center justify-center gap-1 text-sm'>
            <span className='text-sm'>专业：</span>
            {user.profile.major}
          </p>
        </section>
      </CardTitle>
      <CardContent className='col-span-4 flex flex-col gap-2'>
        <main className='grid grid-cols-1 gap-2'>
          <p>照片墙：</p>
          {user.dating.images?.length <= 0 ? (
            <div>用户暂未上传照片</div>
          ) : (
            <ImageHttpGallery
              className='size-24 rounded-lg '
              httpImages={user.dating.images}
            />
          )}

          <span>用户个人介绍：</span>
          <div>{user.profile.bio}</div>
          <p>
            心仪的人：<IconHeart fill='pink'></IconHeart>
          </p>
          <div className='grid grid-cols-2 gap-1'>
            <div className='flex gap-2'>
              <div>最小年龄：{user.dating.preferUsers.minAge}</div>
              <Progress
                value={user.dating.preferUsers.minAge}
                max={60}
              ></Progress>
            </div>
            <div className='flex gap-4'>
              <div className='text-sm'>
                最大年龄：{user.dating.preferUsers.maxAge}
              </div>
              <Progress
                value={user.dating.preferUsers.maxAge}
                max={50}
              ></Progress>
            </div>
            <div className='flex gap-2'>
              <IconSchool />
              <span>{user.dating.preferUsers.school}</span>
            </div>
            <div className='flex gap-2'>
              <span>学院：</span>
              <span>{user.dating.preferUsers.academy}</span>
            </div>
            <div className='flex gap-2'>
              <span>专业：</span>
              <span>{user.dating.preferUsers.major}</span>
            </div>
          </div>
        </main>
        <Button className='ml-auto' onClick={handleHidden}>
          关闭
        </Button>
      </CardContent>
    </Card>
  )
}

export default DatingDetail
