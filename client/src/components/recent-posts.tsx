import { Link } from 'react-router-dom'
import { Button } from './ui/button'

const RecentPosts = () => {
  return (
    <div>
      <div className='space-y-4'>
        <div className='rounded-lg border  p-4'>
          <div className='mb-4 flex items-center justify-between'>
            <h3 className='text-lg font-semibold'>Today Trending</h3>
          </div>
          <div className='space-y-2'>
            <Link
              className='block text-sm transition-colors hover:text-blue-500'
              to='#'
            >
              Figma maintenance
            </Link>
            <Link
              className='block text-sm transition-colors hover:text-blue-500'
              to='#'
            >
              Blender Update
            </Link>
            <Link
              className='block text-sm transition-colors hover:text-blue-500'
              to='#'
            >
              Stackoverflow server
            </Link>
            <Link
              className='block text-sm transition-colors hover:text-blue-500'
              to='#'
            >
              Javascript new
            </Link>
          </div>
        </div>
        <div className='rounded-lg border p-4'>
          <h3 className='mb-4 text-lg font-semibold'>Suggested Community</h3>
          <div className='mb-4 flex items-center space-x-4'>
            <img
              alt='Community logo'
              className='rounded-full'
              height='48'
              src='/placeholder.svg'
              style={{
                aspectRatio: '48/48',
                objectFit: 'cover',
              }}
              width='48'
            />
            <div>
              <p className='text-sm font-semibold'>Figma Desainer</p>
              <p className='text-xs text-gray-400'>
                1425 members · 125 post/day
              </p>
            </div>
            <Button className='ml-auto' variant='outline'>
              Join community
            </Button>
          </div>
        </div>
        <div className='rounded-lg border  p-4'>
          <div className='mb-4 flex items-center justify-between'>
            <h3 className='text-lg font-semibold'>My friends</h3>
          </div>
          <div className='space-y-2'>
            <Link
              className='block text-sm transition-colors hover:text-blue-500'
              to='#'
            >
              Ridwan Beier
            </Link>
            <Link
              className='block text-sm transition-colors hover:text-blue-500'
              to='#'
            >
              Maria Galau
            </Link>
            <Link
              className='block text-sm transition-colors hover:text-blue-500'
              to='#'
            >
              Christi Bule
            </Link>
            <Link
              className='block text-sm transition-colors hover:text-blue-500'
              to='#'
            >
              Lasri Yuda
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RecentPosts
