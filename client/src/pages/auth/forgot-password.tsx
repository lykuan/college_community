import { Card } from '@/components/ui/card'
import { ForgotForm } from './components/forgot-form'
import { Link } from 'react-router-dom'

export default function ForgotPassword() {
  return (
    <>
      <div className='container grid h-svh flex-col items-center justify-center bg-primary-foreground lg:max-w-none lg:px-0'>
        <div className='mx-auto flex w-full flex-col justify-center space-y-2 sm:w-[480px] lg:p-8'>
          <div className='mb-4 flex items-center justify-center'>
            <h1 className='text-xl font-medium'>大学校园学生社交系统</h1>
          </div>
          <Card className='p-6'>
            <div className='mb-2 flex flex-col space-y-2 text-left'>
              <h1 className='text-md font-semibold tracking-tight'>
                忘记密码
              </h1>
              <p className='text-sm text-muted-foreground'>
                请输入你注册时的邮箱并且我们会向你的邮箱发送二维码请注意查收
              </p>
            </div>
            <ForgotForm />
            <p className='mt-4 px-8 text-center text-sm text-muted-foreground'>
              没有账号？{' '}
              <Link
                to='/sign-up'
                className='underline underline-offset-4 hover:text-primary'
              >
                注册
              </Link>
              .
            </p>
          </Card>
        </div>
      </div>
    </>
  )
}
