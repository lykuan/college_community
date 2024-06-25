import { Textarea } from '../ui/textarea'
import { Button } from '../ui/button'
import {
  Form,
  FormItem,
  FormField,
  FormMessage,
  FormControl,
  FormLabel,
} from '../ui/form'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import EmojiPicker from './shared-emojiPicker'
import SharedMiniUpload from './shared-mini-upload'
import { useState } from 'react'
import { useCommentForStory } from '@/lib/react-query/queriesAndMutations'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from '../ui/use-toast'
const commentSchema = z.object({
  commentBody: z.string({ required_error: '输入不能为空' }).max(255),
})
const CommentEdit = ({ handleCloseComment, sid }) => {
  const [imgs, setImgs] = useState([])
  const queryClient = useQueryClient()
  const { mutateAsync: commentOnStory } = useCommentForStory()
  const form = useForm<z.infer<typeof commentSchema>>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      commentBody: '',
    },
  })
  const handleSelectEmoji = (emoji) => {
    form.setValue('commentBody', form.getValues('commentBody') + emoji)
  }
  const onSubmit = async (data: z.infer<typeof commentSchema>) => {
    if (data.commentBody == '') {
      form.setError('commentBody', {
        message: '输入不能为空',
      })
      return
    }
    const formData = new FormData()
    formData.append('commentImage', new Blob(imgs))
    formData.append('commentBody', data.commentBody)
    formData.append('sid', sid)
    const result = await commentOnStory(formData)
    if (result.success) {
      form.reset()
      queryClient.invalidateQueries({ queryKey: ['stories'] })
      queryClient.invalidateQueries({ queryKey: ['story'] })
      setImgs([])
      toast({ title: result.message })
    } else toast({ title: '评论失败，请重试·' })
  }
  return (
    <section className='w-full rounded-lg'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            name='commentBody'
            control={form.control}
            render={({ field }) => {
              return (
                <FormItem className='mb-4'>
                  <FormLabel htmlFor='comment' className='sr-only'>
                    Your comment
                  </FormLabel>
                  <FormControl>
                    <div>
                      <Textarea
                        {...field}
                        id='comment'
                        className='mb-1 w-full  px-0.5 text-sm text-gray-900 focus:outline-none focus:ring-0 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400'
                      ></Textarea>
                      <div className='flex gap-1'>
                        {imgs?.map((item, idx) => {
                          return (
                            <img
                              src={item.preview}
                              className='size-12'
                              key={idx}
                              alt=''
                            />
                          )
                        })}
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )
            }}
          />
          <div className=' flex w-full items-center justify-between px-1'>
            <div className='flex gap-x-2'>
              <EmojiPicker onChange={handleSelectEmoji} />

              <SharedMiniUpload
                fetchUploadImage={setImgs}
                submitImage={form.setValue}
                size={16}
                maxFiles={1}
              />
            </div>
            <div className='flex gap-x-2'>
              <Button
                variant='outline'
                onClick={handleCloseComment}
                className='rounded-full px-4'
              >
                取消
              </Button>
              <Button type='submit' className='rounded-full px-4'>
                评论
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </section>
  )
}

export default CommentEdit
