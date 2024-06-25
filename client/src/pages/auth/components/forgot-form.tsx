import { HTMLAttributes, useState } from 'react'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { LoadingButton } from '@/components/ui/loading-button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { resetPassSchema, forgotPasswordSchema } from '@/lib/validations/index'
import {
  InputOTPGroup,
  InputOTPSlot,
  InputOTP,
} from '@/components/ui/input-otp'
import { useToast } from '@/components/ui/use-toast'
import { useNavigate } from 'react-router-dom'
import {
  useSendCode,
  useVerifyCode,
} from '@/lib/react-query/queriesAndMutations'

interface ForgotFormProps extends HTMLAttributes<HTMLDivElement> {}

export function ForgotForm({ className, ...props }: ForgotFormProps) {
  const [isEmail, setIsEmail] = useState<any>()
  const { toast } = useToast()
  const navigate = useNavigate()
  const {
    mutateAsync: sendCode,
    isPending: isSendingCode,
    error,
  } = useSendCode()
  const { mutateAsync: verifyCode, isPending: isVerifyingCode } =
    useVerifyCode()
  const resetPassForm = useForm<z.infer<typeof resetPassSchema>>({
    resolver: zodResolver(resetPassSchema),
    defaultValues: { code: '' },
    mode: 'onChange',
  })
  async function onResetSubmit(data: z.infer<typeof resetPassSchema>) {
    const result = await verifyCode(data)
    if (!result.success) {
      toast({ title: result.message })
    } else {
      navigate('/reset-password', { state: isEmail.data })
    }
  }
  async function handleSendCode() {
    if (isEmail?.success) {
      const result = await sendCode(isEmail?.data)
      console.log(result)
      toast({ title: result.message })
    }
  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <div className='grid gap-2'>
        <Form {...resetPassForm}>
          <form onSubmit={resetPassForm.handleSubmit(onResetSubmit)}>
            <div className='grid grid-cols-1'>
              <div>
                <FormField
                  name='email'
                  render={() => (
                    <FormItem className='grid grid-cols-3'>
                      <FormLabel className='col-span-full'>邮箱</FormLabel>
                      <FormControl className='col-span-2'>
                        <Input
                          onChange={(e) => {
                            const email = forgotPasswordSchema.safeParse({
                              email: e.currentTarget.value,
                            })
                            setIsEmail(email)
                          }}
                          placeholder='name@example.com'
                        />
                      </FormControl>

                      <LoadingButton
                        type='button'
                        onClick={handleSendCode}
                        loading={isSendingCode}
                        className=' ms-1 py-1 text-[12px]'
                      >
                        {isSendingCode ? '发送中...' : '发送'}{' '}
                      </LoadingButton>
                      {isEmail?.success ? null : (
                        <div className='col-span-full text-red-600'>
                          {isEmail?.error.errors[0].message}
                        </div>
                      )}
                      <FormMessage className='col-span-full' />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={resetPassForm.control}
                name='code'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>验证码</FormLabel>
                    <FormControl>
                      <InputOTP maxLength={6} {...field}>
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <LoadingButton className='mt-2' loading={isVerifyingCode}>
                {isVerifyingCode ? '验证中...' : '验证'}{' '}
              </LoadingButton>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}
