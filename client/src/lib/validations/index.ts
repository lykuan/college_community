import { z } from 'zod'

export const signInSchema = z.object({
  email: z.string().email({ message: '不合法的邮箱' }),
  password: z.string().min(8, { message: '密码至少8位' }),
})
export const confirmPassSchema = z
  .object({
    password: z
      .string()
      .min(1, {
        message: '请输入你的密码',
      })
      .min(8, {
        message: '密码长度最少8位',
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '密码不匹配.',
    path: ['confirmPassword'],
  })

export const signUpSchema = z
  .object({
    email: z
      .string()
      .min(1, { message: '请输入邮箱' })
      .email({ message: '请输入合法的邮箱' }),
    password: z
      .string()
      .min(1, {
        message: '请输入你的密码',
      })
      .min(8, {
        message: '密码长度最少8位',
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '密码不匹配.',
    path: ['confirmPassword'],
  })

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, { message: '请输入你的邮箱' })
    .email({ message: '不合法的邮箱' }),
})

export const resetPassSchema = z.object({
  code: z.string().min(6, { message: '验证码必须6位' }),
})
export const newProfileFormSchema = z.object({
  email: z
    .string({
      required_error: '邮箱',
    })
    .email(),
  profile: z.object({
    username: z
      .string()
      .min(2, {
        message: '用户名长度不低于2位',
      })
      .max(16, {
        message: '用户名最多16位',
      }),
    age: z.number().positive(),
    bio: z.string().max(160).min(4),
    address: z
      .object({
        province: z.string().optional(),
        city: z.string({ required_error: '请输入所在城市' }),
      })
      .optional(),
  }),
})

export const storySchema = z.object({
  text: z
    .string({
      required_error: '输入不能为空',
    })
    .max(1600, {
      message: '长度不能超出160个字符',
    }),
  postImages: z.instanceof(FormData).optional(),
})
export type TStory = z.infer<typeof storySchema>
