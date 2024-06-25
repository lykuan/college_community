import { Schema, Types, model } from "mongoose"
type TCommunity = {
  name: string
  image: string
  members: string[]
  creator: Object
  description: string
  posts: string[]
  admins: string[]
  rules: Object[]
}
const CommunitySchema = new Schema<TCommunity>({
  name: { type: String, required: true },
  image: { type: String },
  description: { type: String, required: true },
  creator: { type: Types.ObjectId, ref: "User" },
  members: [{ type: Types.ObjectId, ref: "User" }],
  posts: [{ type: Types.ObjectId, ref: "Idea" }],
  admins: [{ type: Types.ObjectId, ref: "User" }],
  rules: [{ name: String, desc: String }],
})

export const CommunityModel = model("Community", CommunitySchema)
