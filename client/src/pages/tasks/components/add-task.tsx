import { z } from 'zod'
import { TaskType, labels, priorities, statuses } from '../schema'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { label_options, priority_options, status_options } from '../filters'
import { Textarea } from '@/components/ui/textarea'
import { useCreateTask } from '@/lib/react-query/queriesAndMutations'
import { LoadingButton } from '@/components/ui/loading-button'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from '@/components/ui/use-toast'

const addSchema = z.object({
  title: z.string().min(1, { message: 'Title Required' }),
  description: z.string(),
  status: z.enum(statuses),
  label: z.enum(labels),
  priority: z.enum(priorities),
})

type addSchemaType = z.infer<typeof addSchema>

export default function AddTaskDialog() {
  const { mutateAsync: addTask, isPending: isCreatingTask } = useCreateTask()
  const qc = useQueryClient()
  const form = useForm<addSchemaType>({
    resolver: zodResolver(addSchema),
    defaultValues: {
      title: '',
      description: '',
      status: 'todo',
      label: 'study',
      priority: 'medium',
    },
  })

  async function onSubmit(values: addSchemaType) {
    console.log(values)
    const result = await addTask(values)
    if (result.success) {
      qc.invalidateQueries({ queryKey: ['tasks'] })
      toast({ title: '任务添加成功' })
    }
  }
  return (
    <>
      <DialogHeader>
        <DialogTitle>添加新任务</DialogTitle>
      </DialogHeader>
      <div className='py-4'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-4'>
            <FormField
              control={form.control}
              name='title'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>名称</FormLabel>
                  <FormControl>
                    <Input type='text' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>详情</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='status'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>状态</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Select a Status to Update' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        {status_options.map((status, index) => (
                          <SelectItem key={index} value={status.value}>
                            <span className='flex items-center'>
                              <status.icon className='mr-2 h-5 w-5 text-muted-foreground' />
                              {status.label}
                            </span>
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='label'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>标签</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Select a Label to Update' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        {label_options.map((label, index) => (
                          <SelectItem key={index} value={label.value}>
                            <span className='flex items-center'>
                              <label.icon className='mr-2 h-5 w-5 text-muted-foreground' />
                              {label.label}
                            </span>
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='priority'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>优先级</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Select a Priority to Update' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        {priority_options.map((priority, index) => (
                          <SelectItem key={index} value={priority.value}>
                            <span className='flex items-center'>
                              <priority.icon className='mr-2 h-5 w-5 text-muted-foreground' />
                              {priority.label}
                            </span>
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <LoadingButton
              loading={isCreatingTask}
              type='submit'
              className='mt-2 w-full'
            >
              添加
            </LoadingButton>
          </form>
        </Form>
      </div>
    </>
  )
}
