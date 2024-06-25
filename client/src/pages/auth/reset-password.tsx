import ResetForm from './components/reset-form'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
export const ResetPasswrod = () => {
  return (
    <div className='grid h-lvh w-full place-content-center'>
      <Card className='w-full max-w-sm'>
        <CardHeader>
          <CardTitle className='text-2xl'>重置密码</CardTitle>
          <CardDescription>
            我们了解到你似乎忘记了密码，现在请输入下面表单重置密码
          </CardDescription>
        </CardHeader>
        <CardContent className='grid gap-4'>
          <ResetForm></ResetForm>
        </CardContent>
      </Card>
    </div>
  )
}

export default ResetPasswrod
