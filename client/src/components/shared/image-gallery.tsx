import { cn } from '@/lib/utils'

const ImagePreviewGallery = ({ images, className }) => {
  return (
    <section className='flex flex-wrap gap-x-1'>
      {images.map((image, idx) => (
        <img
          src={image.preview}
          className={cn('object-cover', className)}
          alt=''
          key={idx}
        />
      ))}
    </section>
  )
}

export const ImageHttpGallery = ({ httpImages, className, direction = '' }) => {
  return (
    <section className={cn('flex flex-wrap  gap-4', direction)}>
      {httpImages.map((image, idx) => (
        <img
          src={image}
          className={cn('object-cover', className)}
          alt=''
          key={idx}
        />
      ))}
    </section>
  )
}
export default ImagePreviewGallery
