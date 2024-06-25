import {
  signUpSchema,
  signInSchema,
  forgotPasswordSchema,
} from '@/lib/validations/index'
import { z } from 'zod'
import request from './request'

export const signUpPost = async (values: z.infer<typeof signUpSchema>) => {
  const result = await request.post('/auth/signUp', values)
  return result
}

export const signInPost = async (values: z.infer<typeof signInSchema>) => {
  const result = await request.post('/auth/signIn', values, {})
  return result
}

export const forgotPasswordPost = async (
  values: z.infer<typeof forgotPasswordSchema>
) => {
  const { data: result } = await request.post('/auth/forgotPassword', values)
  return result
}

export const verifyCodePost = async (values: { code?: string }) => {
  const {data:result} = await request.post('/auth/verifyCode', values)
  return result
}

export const resetPasswordPost = async (values: {
  password: string
  confirmPassword: string
}) => {
  const result = await request.post('/auth/resetPassword', values)
  return result
}
