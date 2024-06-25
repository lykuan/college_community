import { Schema, Types, model } from "mongoose"
import { TStory } from "./types/Story"

const replySchema = new Schema({
  repliedBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  replyBody: {
    type: String,
    trim: true,
  },
  upvotedBy: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  downvotedBy: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  pointsCount: {
    type: Number,
    default: 1,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})
const commentSchema = new Schema(
  {
    comment: { type: String, required: true },
    commentBy: { type: Types.ObjectId, ref: "User" },
    upvotedBy: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    downvotedBy: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    replies: [replySchema],
  },
  { timestamps: { createdAt: true, updatedAt: false } }
)
export const StorySchema = new Schema<TStory>(
  {
    content: { type: String, required: true },
    media: [String],
    author: { type: Types.ObjectId, ref: "User" },
    location: { type: String, default: "" },
    bookmark: [
      {
        type: Types.ObjectId,
        ref: "User",
      },
    ],
    upvotedBy: [
      {
        type: Types.ObjectId,
        ref: "User",
      },
    ],
    downvotedBy: [
      {
        type: Types.ObjectId,
        ref: "User",
      },
    ],
    comments: [commentSchema],
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
)

const PostModel =  model("Story", StorySchema)
export default PostModel