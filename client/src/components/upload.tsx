import { forwardRef, useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useDropzone } from 'react-dropzone'
import { z } from 'zod'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { ImagePlus } from 'lucide-react'
import { useToast } from './ui/use-toast'
import { LoadingButton } from './ui/loading-button'
import useLocalStorage from '@/hooks/use-local-storage'
import { useUploadAvatar } from '@/lib/react-query/queriesAndMutations'

const ImageUploader = forwardRef((props, ref) => {
  const [preview, setPreview] = useState<string | ArrayBuffer | null>('')
  const [_, setUser] = useLocalStorage({
    key: 'user',
    defaultValue: null,
  })
  const { toast } = useToast()
  const { mutateAsync: uploadAvatar, isPending } = useUploadAvatar()
  const formSchema = z.object({
    image: z
      //Rest of validations done via react dropzone
      .instanceof(File)
      .refine((file) => file.size !== 0, 'Please upload an image'),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: 'onBlur',
    defaultValues: {
      image: new File([''], 'filename'),
    },
  })

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const reader = new FileReader()
      try {
        reader.onload = () => setPreview(reader.result)
        reader.readAsDataURL(acceptedFiles[0])
        form.setValue('image', acceptedFiles[0])
        form.clearErrors('image')
      } catch (error) {
        setPreview(null)
        form.resetField('image')
      }
    },
    [form]
  )

  const { getRootProps, getInputProps, isDragActive, fileRejections } =
    useDropzone({
      onDrop,
      maxFiles: 1,
      maxSize: 1000000,
      accept: { 'image/png': [], 'image/jpg': [], 'image/jpeg': [] },
    })
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const formData = new FormData()
    formData.append('avatar', values.image)
    const { user } = await uploadAvatar({ image: formData })
    console.log(user)
    setUser(user)
    toast({ title: `Image uploaded successfully 🎉` })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        <FormField
          control={form.control}
          name='image'
          render={() => (
            <FormItem className='mx-auto md:w-1/2'>
              <FormLabel
                className={`${
                  fileRejections.length !== 0 && 'text-destructive'
                }`}
              >
                <h2 className='text-center text-xl font-semibold tracking-tight'>
                  上传头像
                  <span
                    className={
                      form.formState.errors.image || fileRejections.length !== 0
                        ? 'text-destructive'
                        : 'text-muted-foreground'
                    }
                  ></span>
                </h2>
              </FormLabel>
              <FormControl>
                <div
                  {...getRootProps()}
                  className='mx-auto flex cursor-pointer flex-col items-center justify-center gap-y-2 rounded-lg border border-foreground p-8 shadow-sm shadow-foreground'
                >
                  {preview && (
                    <img
                      src={preview as string}
                      alt='Uploaded image'
                      className='max-h-[400px] rounded-lg'
                    />
                  )}
                  <ImagePlus
                    className={`size-40 ${preview ? 'hidden' : 'block'}`}
                  />
                  <Input name='avatar' {...getInputProps()} type='file' />
                  {isDragActive ? <p>拖动头像!</p> : <p>点击或拖动图片上传</p>}
                </div>
              </FormControl>
              <FormMessage>
                {fileRejections.length !== 0 && (
                  <p>图片格式必须是png，jpg，jpeg并且大小少于1MB</p>
                )}
              </FormMessage>
            </FormItem>
          )}
        />
        <LoadingButton
          type='submit'
          loading={isPending}
          className='mx-auto block h-auto rounded-lg px-8 py-3 text-xl'
        >
          {isPending ? '上传中...' : '上传'}
        </LoadingButton>
      </form>
    </Form>
  )
})
export default ImageUploader
