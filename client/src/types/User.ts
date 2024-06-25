import { newProfileFormSchema } from '@/lib/validations'
import { z } from 'zod'

export type TAddress = {
  province?: string
  city: string
}
enum Gender {
  'female',
  'male',
  'other',
}
export type TProfile = {
  username: string
  age?: number
  bio?: string
  name?: string
  address?: TAddress
  avatar?: string
  gender?: Gender
}
export type TUser = {
  _id: string
  email: string
  password: string
  profile: TProfile
  posts?: String[]
  rooms?: String[]
  roomMessage?: string[]
  is_admin?: string[]
  is_delete?: boolean
  online?: boolean
  last_seen?: Date
}
export type TNewProfile = z.infer<typeof newProfileFormSchema>
