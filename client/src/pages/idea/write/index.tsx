import { Layout, LayoutBody } from '@/components/custom/layout'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import QuillEditor from '../components/TiptapEditor'
import { useRef, useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { Input } from '@/components/ui/input'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCreateIdea, useGetUserCommunities } from '@/lib/react-query/queriesAndMutations'
import { useAuthContext } from '@/context/AuthContext'
import { useToast } from '@/components/ui/use-toast'
import { useNavigate } from 'react-router-dom'
import { LoadingButton } from '@/components/ui/loading-button'
import { Button } from '@/components/ui/button'
import { IconPlus } from '@tabler/icons-react'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import CreateCommunity from '../modal/create-community'

const formSchema = z.object({
  title: z.string().min(1, { message: '标题不能为空' }).max(20),
  content: z.string().min(1, { message: '内容不能为空' }),
  community: z.string().min(1, { message: "选择发布的社区" })
})
const WriteIdea = () => {
  const { authUser } = useAuthContext()
  const { toast } = useToast()
  const navigate = useNavigate()
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      community: "",
      title: '',
      content: ''
    }
  })
  const { mutateAsync: createIdea, isPending } = useCreateIdea()
  const { data, isLoading } = useGetUserCommunities(authUser._id)
  const qe = useRef<ReactQuill>(null)
  const handlePublish = async (data: z.infer<typeof formSchema>) => {
    if (!data.content) {
      toast({ title: "内容不能为空", variant: "destructive" })
      return
    }
    const result = await createIdea(data)
    if (result.success) {
      form.reset()
      toast({ title: "发布成功", variant: "default" })
      navigate('/idea')
    } else {
      toast({ title: result.message, variant: "destructive" })
    }
  }

  return (
    <Layout>
      <LayoutBody>
        <div className='grid grid-cols-1 gap-8'>
          <div>
            <span>知识分享</span>
          </div>
          <div>
          </div>
          <Form {...form}>
            <form
              className='flex flex-col gap-10'
              onSubmit={form.handleSubmit(handlePublish)}
            >
              <div className='flex  gap-1 '>

                <FormField
                  control={form.control}
                  name='community'
                  render={({ field }) => (
                    <FormItem >
                      <FormControl>
                        <Select value={field.value} onValueChange={(vals => { field.onChange(vals) })}>
                          <SelectTrigger className='w-[180px]'>
                            <SelectValue placeholder='社区' />
                          </SelectTrigger>
                          <SelectContent>
                            {data?.map(community =>
                            (<SelectItem
                              key={community._id}
                              value={community.name}
                            >{community.name}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size='icon' type='button' variant='ghost'><IconPlus /></Button>

                  </DialogTrigger>
                  <DialogContent>
                    <CreateCommunity />
                  </DialogContent>
                </Dialog>
              </div>
              <FormField
                control={form.control}
                name='title'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder='标题' {...field}></Input>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <QuillEditor
                setContent={form.setValue}
                value={form.getValues('content')}
                ref={qe}
              />
              <LoadingButton loading={isPending} type='submit'>发布</LoadingButton>
            </form>
          </Form>
        </div>
      </LayoutBody>
    </Layout>
  )
}

export default WriteIdea
