import { IconLoader2 } from '@tabler/icons-react'

export default function Loader() {
  return (
    <div className='w-full h-svh flex justify-center items-center'>
      <IconLoader2 className='animate-spin' size={42} />
      <span className='sr-only'>loading</span>
    </div>
  )
}
