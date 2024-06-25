import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import blogPreview from '@/assets/imgs/image_fx_a_anime__2d_image_that_a_younger_man_whose_f.jpg'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const BlogPreviewCard = () => {
  return (
      <Card
        onClick={() => console.log('post card')}
        className='w-full space-y-0 rounded-2xl border border-black p-0 shadow-[0.3rem_0.3rem_0_0_#000] transition-all hover:shadow-[0.5rem_0.5rem_0_0_#000] hover:cursor-pointer
        sm:w-full '
      >
        <CardHeader className='gap-1'>
          <img
            src={blogPreview}
            alt='Preview Image'
            className=' rounded-xl'
            style={{ objectFit: 'cover' }}
          />

          <div className='text-[.7rem] font-[700] text-neutral-600'>
            Published 21 Dec 2023
          </div>

          <CardTitle className=' text-lg font-[800]'>
            HTML &amp; CSS Foundations
          </CardTitle>
          <div className='w-full overflow-hidden text-ellipsis whitespace-nowrap p-0 text-xs font-[600] text-neutral-400'>
            These languages are the backbone of every website, definining
            structure, content, and presentation.
          </div>
          <div className='flex items-center gap-3'>
            <Avatar>
              <AvatarImage src={blogPreview} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>

            <div className='text-sm font-[800]'>Greg Hooper</div>
          </div>
        </CardHeader>
      </Card>
  )
}

export default BlogPreviewCard
