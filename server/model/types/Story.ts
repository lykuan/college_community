export type TStory = {
  content: string
  author: Object
  location: string
  media: string[]
  bookmark: string[]
  isDeleted: boolean
  upvotedBy: string[]
  downvotedBy: string[]
  createAt: Date
  updateAt: Date
  comments: string[]
}
