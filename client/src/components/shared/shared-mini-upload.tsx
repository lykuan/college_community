import { IconPhotoUp } from '@tabler/icons-react'
import { Input } from '../ui/input'
import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

const SharedMiniUpload = ({
  fetchUploadImage,
  submitImage,
  maxFiles,
  size,
}) => {
  const onDrop = useCallback((acceptedFiles) => {
    submitImage('postImage', acceptedFiles)
    fetchUploadImage(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    )
  }, [])
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxFiles,
  })
  return (
    <div {...getRootProps()}>
      <Input
        {...getInputProps()}
        name='shareImage'
        id='imgUpload'
        className='hidden'
      ></Input>
      <div className=' w-full '>
        <IconPhotoUp
          size={size}
          className=' cursor-pointer transition text-muted-foreground hover:text-foreground'
        ></IconPhotoUp>
      </div>
    </div>
  )
}

export default SharedMiniUpload
