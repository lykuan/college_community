import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Input } from '@/components/ui/input'
import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import img from '@/assets/imgs/sign_in.jpg'
import { useAuthContext } from '@/context/AuthContext'
const ProfileBackground = ({ uid }) => {
  const { authUser } = useAuthContext()
  const onDrop = useCallback((acceptedFiles) => {}, [])
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxFiles: 1,
  })
  return (
    <div className='h-32 w-full'>
      <div className='absolute top-0 left-0 right-0' {...getRootProps()}>
        {<Input {...getInputProps()}></Input>}
      </div>
      <img
        src={img}
        alt='Image'
        className='aspect-auto size-full object-cover'
      />
    </div>
  )
}

export default ProfileBackground
