import { LoadingButton } from '@/components/ui/loading-button'
import { Input } from '@/components/ui/input'
import { Link, useNavigate } from 'react-router-dom'
import signinImage from '@/assets/imgs/sign_in.jpg'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { signInSchema } from '@/lib/validations/index'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useToast } from '@/components/ui/use-toast'
import { useSignin } from '@/lib/react-query/queriesAndMutations'
import { useAuthContext } from '@/context/AuthContext'
import { useCookies } from 'react-cookie'
const SignInPage = () => {
  const navigate = useNavigate()
  const { toast } = useToast()
  const { setAuthUser } = useAuthContext()
  const [cookie, setCookies] = useCookies(['jwt'])
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
  })
  const {
    mutateAsync: signIn,
    isPending: isLoggingIn,
    isError,
    error,
  } = useSignin()
  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    const { data: result } = await signIn(data)
    console.log(result)
    if (result.status != 200) {
      toast({ title: result.message })
    } else {
      setCookies('jwt', result?.token, { maxAge: 60 * 60 * 24 * 15 })
      localStorage.setItem('user', JSON.stringify(result?.userBaseInfo))
      setAuthUser(result.userBaseInfo)
      toast({ title: result.message })
      navigate('/')
    }
  }
  if (isError) {
    console.log(error.stack)
  }
  return (
    <div className='w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[svh]'>
      <div className='flex items-center justify-center py-12'>
        <div className='mx-auto grid w-[350px] gap-6'>
          <div className='grid gap-2 text-center'>
            <h1 className='text-3xl font-bold'>登录</h1>
            <p className='text-balance text-muted-foreground'>请输入邮箱登录</p>
          </div>
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
                        <FormLabel>密码</FormLabel>
                        <FormControl>
                          <Input
                            type='password'
                            placeholder='输入密码'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className='flex items-center'>
                    <Link
                      to='/forgot-password'
                      className='ml-auto inline-block text-sm underline'
                    >
                      忘记密码?
                    </Link>
                  </div>
                </div>
                <LoadingButton
                  loading={isLoggingIn}
                  type='submit'
                  className='w-full'
                >
                  {isLoggingIn ? 'loading...' : '登录'}
                </LoadingButton>
              </div>
            </form>
          </Form>
          <div className='mt-4 text-center text-sm'>
            没有账号?{' '}
            <Link to='/sign-up' className='underline'>
              注册
            </Link>
          </div>
        </div>
      </div>
      <div className='hidden bg-muted lg:block'>
        <img
          src={signinImage}
          alt='Image'
          className='block aspect-auto min-h-full'
        />
      </div>
    </div>
  )
}

export default SignInPage
