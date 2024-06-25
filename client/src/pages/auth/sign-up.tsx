import { Link, useNavigate } from 'react-router-dom'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { SignUpForm } from './components/sign-up-form'
const SignUpPage = () => {
  return (
    <section className="grid min-h-screen w-full place-content-center bg-[url('assets/imgs/sign_up.jpg')] bg-cover bg-no-repeat ">
      <Card className='mx-auto max-w-[28rem] md:min-w-[26rem]'>
        <CardHeader>
          <CardTitle className='text-xl'>注册</CardTitle>
          <CardDescription>输入信息创建账号</CardDescription>
        </CardHeader>
        <CardContent>
          <SignUpForm></SignUpForm>
        </CardContent>
      </Card>
    </section>
  )
}
export default SignUpPage
