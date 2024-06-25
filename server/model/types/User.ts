import { Types } from "mongoose"

export type TAddress = {
  province: string
  city: string
}
enum Gender {
  "female" = "0",
  "male" = "1",
}
export type TProfile = {
  username: string
  age: number
  bio?: string
  name?: string
  address?: TAddress
  avatar?: string
  gender?: Gender
}
export type TUser = {
  email: string
  password: string
  posts: String[]
  rooms: String[]
  followers: String[]
  followed: String[]
  tasks: String[]
  bookmarks: String[]
  dating: String
  roomMessage: string[]
  is_admin: string[]
  is_delete: boolean
  reputation: number
  last_seen: Date
  profile: TProfile
}
