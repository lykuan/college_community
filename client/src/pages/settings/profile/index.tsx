import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { CardContent, Card, CardHeader } from '@/components/ui/card'
import { useEffect, useState } from 'react'
import ImageUploader from '@/components/upload'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import SharedAvatar from '@/components/shared/shared-avatar'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useAuthContext } from '@/context/AuthContext'
import { useUpdateProfile } from '@/lib/react-query/queriesAndMutations'
import { toast } from '@/components/ui/use-toast'
import { LoadingButton } from '@/components/ui/loading-button'
const editSchema = z
  .object({
    email: z.string().email(),
    username: z.string().min(2, { message: '用户名最少2位' }).max(16),
    bio: z.string().max(255).optional(),
    age: z
      .number({ required_error: '请输入合法的数字' })
      .positive({ message: '请输入合法年龄' })
      .optional(),
    university: z.string().optional(),
    academy: z.string().optional(),
    major: z.string().optional(),
    gender: z.enum(['0', '1']).optional(),
    province: z.string().optional(),
    city: z.string().optional(),
    newPassword: z.string().min(8).max(16).optional(),
    confirmNewPassword: z.string().optional(),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: '密码不匹配',
    path: ['confirmNewPassword'],
  })
export default function SettingsProfile() {
  const { authUser } = useAuthContext()
  const form = useForm({
    resolver: zodResolver(editSchema),
    defaultValues: {
      email: authUser.email,
      username: authUser.profile.username,
      bio: authUser.profile.bio,
      age: authUser.profile.age,
      university: authUser.profile.university,
      academy: authUser.profile.academy,
      major: authUser.profile.major,
      gender: authUser.profile.gender,
      province: authUser.profile.address.province,
      city: authUser.profile.address.city,
    },
  })
  const { mutateAsync: updateProfile, isPending: updatingProfile } =
    useUpdateProfile()
  const onSubmit = async (values: z.infer<typeof editSchema>) => {
    const v = editSchema.parse(values)
    const result = await updateProfile(v)
    if (result.success) {
      const profile = JSON.parse(localStorage.getItem('user'))
      const newProfile = { ...result.data, dating: profile.dating }
      localStorage.setItem('user', JSON.stringify(newProfile))
      toast({ title: result.message })
    } else {
      toast({ title: result.message })
    }
  }
  return (
    <div>
      <div className='space-y-6 p-4 sm:px-6'>
        <header className='space-y-2'>
          <div className='flex items-center space-x-3'>
            <SharedAvatar url={authUser?.profile.avatar} className='size-20' />
            <div className='space-y-1'>
              <h1 className='text-2xl font-bold'>
                {authUser?.profile?.username}
              </h1>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>修改头像</Button>
                </DialogTrigger>
                <DialogContent>
                  <ImageUploader />
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </header>
        <div className='space-y-8'>
          <Form {...form}>
            <form
              className='flex flex-col gap-2'
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <Card>
                <CardContent className='space-y-6'>
                  <FormField
                    control={form.control}
                    name='username'
                    render={({ field }) => (
                      <FormItem>
                        <div className='space-y-2'>
                          <FormLabel htmlFor='username'>用户名</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder='输入用户名' />
                          </FormControl>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='email'
                    render={({ field }) => (
                      <FormItem>
                        <div className='space-y-2'>
                          <FormLabel htmlFor='email'>邮箱</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder='E.g. jane@example.com'
                            />
                          </FormControl>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='age'
                    render={({ field }) => (
                      <FormItem>
                        <div className='space-y-2'>
                          <FormLabel htmlFor='age'>年龄</FormLabel>
                          <FormControl>
                            <Input
                              {...form.register('age', { valueAsNumber: true })}
                              placeholder='输入年龄'
                            />
                          </FormControl>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />
                  <FormField
                    name='gender'
                    control={form.control}
                    render={({ field: { value, onChange } }) => (
                      <div className=' space-y-2'>
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
                  <FormField
                    control={form.control}
                    name='province'
                    render={({ field }) => (
                      <FormItem>
                        <div className='space-y-2'>
                          <FormLabel htmlFor='province'>省份</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder='省份' />
                          </FormControl>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='city'
                    render={({ field }) => (
                      <FormItem>
                        <div className='space-y-2'>
                          <FormLabel htmlFor='city'>城市</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder='城市' />
                          </FormControl>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='bio'
                    render={({ field }) => (
                      <FormItem>
                        <div className='space-y-2'>
                          <FormLabel htmlFor='bio'>简介</FormLabel>
                          <FormControl>
                            <Textarea
                              className='mt-1'
                              {...field}
                              placeholder='输入简介'
                              style={{
                                minHeight: '100px',
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <div>教育</div>
                  <div>更新你的教育资料</div>
                </CardHeader>
                <CardContent>
                  <FormField
                    name='university'
                    control={form.control}
                    render={({ field }) => (
                      <div className='space-x-2'>
                        <FormItem>
                          <FormLabel htmlFor='university'>学校</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder='学校' />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      </div>
                    )}
                  />
                  <FormField
                    name='academy'
                    control={form.control}
                    render={({ field }) => (
                      <div className='space-x-2'>
                        <FormItem>
                          <FormLabel htmlFor='academy'>学院</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder='学院' />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      </div>
                    )}
                  />
                  <FormField
                    name='major'
                    control={form.control}
                    render={({ field }) => (
                      <div className='space-x-2'>
                        <FormItem>
                          <FormLabel htmlFor='major'>专业</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder='专业' />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      </div>
                    )}
                  />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <div>修改密码</div>
                  <div>为了你的账户安全，请不要分享你的密码给他人</div>
                </CardHeader>
                <CardContent className='space-y-4'>
                  <FormField
                    name='newPassword'
                    control={form.control}
                    render={({ field }) => (
                      <div className='space-x-2'>
                        <FormItem>
                          <FormLabel htmlFor='newPassword'>新密码</FormLabel>
                          <FormControl>
                            <Input {...field} type='password' placeholder='' />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      </div>
                    )}
                  />
                  <FormField
                    name='confirmNewPassword'
                    control={form.control}
                    render={({ field }) => (
                      <div className='space-x-2'>
                        <FormItem>
                          <FormLabel htmlFor='confirmNewPassword'>
                            确认密码
                          </FormLabel>
                          <FormControl>
                            <Input {...field} type='password' />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      </div>
                    )}
                  />
                </CardContent>
              </Card>
              <div className='pt-6'>
                <LoadingButton loading={updatingProfile}>更新</LoadingButton>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  )
}
