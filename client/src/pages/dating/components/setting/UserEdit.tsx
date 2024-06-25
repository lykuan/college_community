import { Button } from '@/components/ui/button'
import {
  DialogTrigger,
  DialogTitle,
  DialogDescription,
  DialogHeader,
  DialogContent,
  Dialog,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
} from '@/components/ui/select'
import { SettingsIcon } from 'lucide-react'
import SharedMiniUpload from '@/components/shared/shared-mini-upload'
import ImagePreviewGallery, {
  ImageHttpGallery,
} from '@/components/shared/image-gallery'
import { useEffect, useState } from 'react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useUpdateDatingSetting } from '@/lib/react-query/queriesAndMutations'
import { toast } from '@/components/ui/use-toast'

const UserEdit = ({ dating }) => {
  const [uploadImgs, setUploadImgs] = useState([])
  const [httpImgs, setHttpImgs] = useState([])
  const { mutateAsync: updateDatingSetting } = useUpdateDatingSetting()
  const formSchema = z.object({
    minAge: z.number().positive(),
    maxAge: z.number().positive(),
    major: z.string().optional(),
    school: z.string().optional(),
    academy: z.string().optional(),
    gender: z.string().optional(),
    postImage: z.instanceof(File).array().max(4),
  })

  useEffect(() => {
    if (!dating) return
    setHttpImgs(dating.images)
    for (const key of Object.keys(formSchema.shape)) {
      form.setValue(key, dating?.preferUsers?.[key])
    }
  }, [dating])
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      minAge: 18,
      maxAge: 30,
      school: '',
      academy: '',
      major: '',
      postImage: [],
      gender: '0',
    },
  })
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const formData = new FormData()
    for (const [key, value] of Object.entries(data)) {
      if (key === 'postImage') {
        for (const img of value as Array<File>) {
          formData.append('datingImages', img)
        }
      }
      formData.append(key, value as string)
    }
    const result = await updateDatingSetting(formData)
    if (result.success) {
      toast({ title: '更新设置成功' })
      const user = JSON.parse(localStorage.getItem('user'))
      user.dating = result.data
      localStorage.setItem('user', JSON.stringify(user))
    }
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='outline' className='min-w-[8rem]'>
          <SettingsIcon className='mr-2 h-5 w-5' />
          设置
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[600px]'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>查找对的人</DialogTitle>
              <DialogDescription>更新你的配对设置</DialogDescription>
            </DialogHeader>
            <div className='grid gap-6 py-4'>
              <div className='grid grid-cols-2 gap-4'>
                <div className='col-span-2 space-y-2 '>
                  <Label htmlFor='profile-picture'>照片墙</Label>
                  <div className='flex flex-wrap'>
                    {uploadImgs.length > 0 ? (
                      <ImagePreviewGallery
                        images={uploadImgs}
                        className='size-20'
                      />
                    ) : (
                      <ImageHttpGallery
                        httpImages={httpImgs}
                        className='size-20'
                      />
                    )}
                    <SharedMiniUpload
                      fetchUploadImage={setUploadImgs}
                      submitImage={form.setValue}
                      maxFiles={8}
                      size={100}
                    />
                  </div>
                </div>
                <div className='col-span-2 space-y-2'>
                  <FormField
                    name='school'
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor='school'>学校</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder='学校' />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className='col-span-1 space-y-2'>
                  <FormField
                    name='major'
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor='major'>专业</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder='Enter your major' />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className='col-span-1 space-y-2'>
                  <FormField
                    name='minAge'
                    control={form.control}
                    render={({ field: { value, onChange } }) => (
                      <FormItem>
                        <FormLabel htmlFor='age-range'>年龄范围</FormLabel>
                        <div className='flex items-center gap-2'>
                          <span>Min:</span>
                          <FormControl>
                            <Slider
                              defaultValue={[value]}
                              id='min-age'
                              min={18}
                              max={60}
                              step={1}
                              onValueChange={([vals]) => {
                                onChange(vals)
                              }}
                            />
                          </FormControl>
                          <span>{value}</span>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name='maxAge'
                    control={form.control}
                    render={({ field: { value, onChange } }) => (
                      <FormItem>
                        <div className='flex items-center gap-2'>
                          <span>Max:</span>
                          <FormControl>
                            <Slider
                              defaultValue={[value]}
                              id='max-age'
                              step={1}
                              onValueChange={([vals]) => {
                                onChange(vals)
                              }}
                            />
                          </FormControl>
                          <span>{value}</span>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className='grid gap-2'></div>
                </div>
              </div>
            </div>
            <div className='grid grid-cols-2 gap-4'>
              <FormField
                name='academy'
                control={form.control}
                render={({ field }) => (
                  <div className='space-y-2'>
                    <FormItem>
                      <FormLabel htmlFor='academy'>学院</FormLabel>
                      <FormControl>
                        <Input
                          id='academy'
                          {...field}
                          placeholder='Enter your academy'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </div>
                )}
              />

              <FormField
                name='gender'
                control={form.control}
                render={({ field: { value, onChange } }) => (
                  <div className='mb-3 space-y-2'>
                    <FormItem>
                      <FormLabel htmlFor='gender'>性别</FormLabel>
                      <FormControl>
                        <Select
                          defaultValue={value}
                          onValueChange={(vals) => {
                            onChange(vals)
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder='Select gender' />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value='1'>男</SelectItem>
                            <SelectItem value='0'>女</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </div>
                )}
              />
            </div>
            <Button className='w-full' type='submit'>
              保存
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default UserEdit
