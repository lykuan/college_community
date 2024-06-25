import { resetPasswordPost } from '@/apis/auth-api'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'
import { confirmPassSchema } from '@/lib/validations/index'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router-dom'
import { z } from 'zod'
const ResetForm = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const form = useForm<z.infer<typeof confirmPassSchema>>({
    resolver: zodResolver(confirmPassSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
    mode:"onChange"
  })
  const { mutateAsync: resetPwd } = useMutation({
    mutationFn: resetPasswordPost,
    onSuccess({ data }) {
      toast({
        description: data,
      })
      navigate('/sign-in')
    },
  })
  const onSubmit = async (data: any) => {
    const email = location.state.email
    await resetPwd({ ...data, email })
  }
  return (
    <div className='w-full'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-2'>
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
          <Button>重置</Button>
        </form>
      </Form>
    </div>
  )
}

export default ResetForm
