export type TPost = {
  description?: string
  title: string
  content: string
  cover: string
  upvotedBy: string[]
  author: Object
  downvotedBy: string[]
  community: String
  createAt: Date
  updateAt: Date
  viewCount: number
  rating: number[]
  comments: string[]
  calc_rating: number
}
