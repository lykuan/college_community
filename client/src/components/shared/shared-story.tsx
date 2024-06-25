import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TUser } from '@/types/User'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Textarea } from '../ui/textarea'
import SharedAvatar from './shared-avatar'
import { IconMapPin } from '@tabler/icons-react'
import SharedMiniUpload from './shared-mini-upload'
import { storySchema } from '@/lib/validations'
import { useCreateStory } from '@/lib/react-query/queriesAndMutations'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from '../ui/use-toast'
import EmojiPicker from './shared-emojiPicker'

type TFilePreview = File & {
  preview: string
}

const SharedShare = () => {
  const [user, setUser] = useState<TUser>(null)
  const [uploadFiles, setUploadFiles] = useState<TFilePreview[]>([])
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { mutateAsync: createPost, isPending: isCreatingPost } =
    useCreateStory()

  const form = useForm<z.infer<typeof storySchema>>({
    resolver: zodResolver(storySchema),
    defaultValues: {
      text: '',
    },
  })
  const handleSelectEmoji = (emoji) => {
    const currentBody = form.getValues('text')
    form.setValue('text', currentBody + emoji)
  }
  const onSubmit = async (data: z.infer<typeof storySchema>) => {
    if (data.text == '')
      form.setError('text', { type: 'required', message: '内容不能为空' })
    const formData = new FormData()
    if (uploadFiles.length > 0)
      for (const file of uploadFiles) {
        formData.append('storyImages', file)
      }
    formData.append('text', data.text)
    const res = await createPost(formData)
    if (res.status == 200) {
      form.reset()
      setUploadFiles([])
      toast({ title: '故事分享成功' })
      queryClient.invalidateQueries({ queryKey: ['stories'] })
    }
  }
  useEffect(() => {
    const user = localStorage.getItem('user')
    if (!user) {
      navigate('sign-in')
    }
    setUser(JSON.parse(user))
  }, [])
  return (
    <div className='flex w-full flex-col gap-y-1 border p-3'>
      <div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='w-full space-y-6'
          >
            <FormField
              control={form.control}
              name='text'
              render={({ field }) => (
                <div>
                  <FormItem className='flex items-center gap-x-3'>
                    <SharedAvatar
                      url={user?.profile?.avatar}
                      className="size-10"
                      username={user?.profile?.username}
                      
                    ></SharedAvatar>
                    <FormControl>
                      <Textarea
                        placeholder='说点什么...'
                        className='resize-none overflow-hidden'
                        {...field}
                      />
                    </FormControl>
                    <Button type='submit'>分享</Button>
                  </FormItem>
                  <FormMessage className='ms-11 mt-1' />
                </div>
              )}
            />
          </form>
        </Form>
      </div>
      <div className='ml-12 flex gap-x-2.5'>
        <EmojiPicker onChange={handleSelectEmoji} />
        <SharedMiniUpload
          fetchUploadImage={setUploadFiles}
          submitImage={form.setValue}
          maxFiles={3}
          size={17}
        ></SharedMiniUpload>
      </div>

      <section className='ml-11 flex gap-x-1'>
        {uploadFiles
          ? uploadFiles.map((file) => {
              return (
                <img
                  key={file.name}
                  src={file.preview}
                  className='size-20'
                  onLoad={() => {
                    URL.revokeObjectURL(file.preview)
                  }}
                  alt=''
                />
              )
            })
          : null}
      </section>
    </div>
  )
}

export default SharedShare
