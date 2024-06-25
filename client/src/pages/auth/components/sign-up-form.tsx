import { HTMLAttributes, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate } from 'react-router-dom'
import { z } from 'zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useMutation } from '@tanstack/react-query'
import { signUpPost } from '@/apis/auth-api'
import { LoadingButton } from '@/components/ui/loading-button'
import { signUpSchema } from '@/lib/validations/index'
import { useToast } from '@/components/ui/use-toast'
interface SignUpFormProps extends HTMLAttributes<HTMLDivElement> {}

export function SignUpForm({ className, ...props }: SignUpFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const { toast } = useToast()

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  const { mutateAsync: signUp,isPending } = useMutation({
    mutationFn: signUpPost,
  })

  const onSubmit = async (values: z.infer<typeof signUpSchema>) => {
    setIsLoading(true)
    const { data } = await signUp(values)
    if (data.status != 200) {
      toast({ title: data.message })
    } else {
      navigate('/sign-in')
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className='grid gap-4'>
          <div className='grid gap-2'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>邮箱</FormLabel>
                  <FormControl>
                    <Input
                      id='email'
                      type='email'
                      placeholder='输入邮箱'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className='grid gap-2'>
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor='password'>密码</FormLabel>
                  <FormControl>
                    <Input
                      id='password'
                      placeholder='输入密码'
                      type='password'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>{' '}
          <div className='grid gap-2 '>
            <div className='grid gap-2'>
              <FormField
                control={form.control}
                name='confirmPassword'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>确认密码</FormLabel>
                    <FormControl>
                      <Input
                        type='password'
                        placeholder='确认密码'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <LoadingButton loading={isPending} type='submit' className='w-full'>
            {isPending ? 'loading...' : '注册'}
          </LoadingButton>
        </div>
        <div className='mt-4 text-center text-sm'>
          已有账号?{' '}
          <Link to='/sign-in' className='underline'>
            登陆
          </Link>
        </div>
      </form>
    </Form>
  )
}
